import { useWordDetail } from "@/hooks/useWordDetail";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function Word() {
  const { word } = useLocalSearchParams<{ word: string }>();

  const { data, isLoading, error } = useWordDetail(word);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Erro ao carregar: {String(error)}</Text>;
  }

  if (!data || data.length === 0) {
    return <Text>Nenhum resultado encontrado para &quot;{word}&quot;</Text>;
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      {data.map((item, index) => (
        <View key={index}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
            {item.word}
          </Text>

          {item.phonetics?.map((p, i) => {
            if (!p.text && !p.audio) return null;
            return (
              <View key={i} style={{ marginBottom: 8 }}>
                {p.text && <Text> Pronúncia: {p.text}</Text>}
                {p.audio && <Text> Áudio: {p.audio}</Text>}
              </View>
            );
          })}

          {item.meanings?.map((meaning, i) => (
            <View key={i} style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "600", marginBottom: 4 }}>
                {meaning.partOfSpeech}
              </Text>
              {meaning.definitions.map((def, j) => (
                <View key={j} style={{ marginBottom: 8, marginLeft: 8 }}>
                  <Text>• {def.definition}</Text>
                  {def.example && (
                    <Text style={{ fontStyle: "italic", marginTop: 2 }}>
                      Ex: {def.example}
                    </Text>
                  )}
                </View>
              ))}
              {meaning.synonyms?.length > 0 && (
                <Text style={{ marginTop: 4 }}>
                  Sinônimos: {meaning.synonyms.join(", ")}
                </Text>
              )}
              {meaning.antonyms?.length > 0 && (
                <Text style={{ marginTop: 2 }}>
                  Antônimos: {meaning.antonyms.join(", ")}
                </Text>
              )}
            </View>
          ))}

          {item.sourceUrls?.length > 0 && (
            <Text style={{ marginTop: 8 }}>
              Fontes: {item.sourceUrls.join(", ")}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
