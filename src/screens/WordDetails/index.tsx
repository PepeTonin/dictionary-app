import { Ionicons } from "@expo/vector-icons";
import { AxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/common/Button";
import { ScreenError } from "@/components/common/ScreenError";
import { ScreenLoader } from "@/components/common/ScreenLoader";
import { NotFound } from "@/components/wordDetails/NotFound";

import { useFavoriteWord } from "@/hooks/favorites/useFavoriteWord";
import { useIsWordFavorite } from "@/hooks/favorites/useIsWordFavorite";
import { useMutationHistory } from "@/hooks/history/useMutationHistory";
import { useWordDetail } from "@/hooks/useWordDetail";

import { capitalizeFirstLetter } from "@/utils/string";

import { styles } from "./style";

export function WordDetailsScreen() {
  const { bottom } = useSafeAreaInsets();
  const { word } = useLocalSearchParams<{ word: string }>();

  const { addToHistory } = useMutationHistory();

  useEffect(() => {
    if (word) {
      addToHistory(word);
    }
  }, [word, addToHistory]);

  const {
    data,
    isLoading: isLoadingWordDetails,
    error: wordDetailsError,
    refetch,
    isRefetching,
    canRefetch,
  } = useWordDetail(word);

  const {
    addToFavorites,
    removeFromFavorites,
    isLoading: isMutatingFavorite,
  } = useFavoriteWord();

  const { isFavorite, isLoading: isCheckingFavorite } = useIsWordFavorite(word);

  function handleFavorite() {
    if (isFavorite) {
      removeFromFavorites(word);
      return;
    }
    addToFavorites(word);
  }

  function handleRefetch() {
    if (canRefetch) {
      refetch();
      return;
    }
    router.back();
  }

  const isFavoriteLoading = isMutatingFavorite || isCheckingFavorite;

  if (isLoadingWordDetails) {
    return <ScreenLoader />;
  }

  if (
    wordDetailsError &&
    wordDetailsError instanceof AxiosError &&
    wordDetailsError.response &&
    wordDetailsError.response.status === 404
  ) {
    return <NotFound word={word} response={wordDetailsError.response} />;
  }

  if (!data || data.length === 0 || wordDetailsError) {
    return (
      <ScreenError
        hasTabBar={false}
        title="No data found for this word"
        description="Try looking for another word."
        buttonLabel={canRefetch ? "Try again" : "Back"}
        onButtonPress={handleRefetch}
        isLoading={isRefetching}
      />
    );
  }

  return (
    <View style={[styles.outerContainer, { paddingBottom: bottom + 16 }]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.wordContainer}>
            <View style={styles.wordHeaderContainer}>
              <Text style={styles.h1}>{item.word}</Text>

              {item.phonetic && (
                <Text style={styles.large}>{item.phonetic}</Text>
              )}
            </View>

            {index === 0 && (
              <TouchableOpacity
                onPress={handleFavorite}
                style={styles.favoriteButtonContainer}
                disabled={isFavoriteLoading}
              >
                {isFavoriteLoading ? (
                  <ActivityIndicator size="small" color="red" />
                ) : (
                  <>
                    <Ionicons
                      name={isFavorite ? "heart" : "heart-outline"}
                      size={24}
                      color="red"
                    />
                    <Text style={styles.regular}>
                      {isFavorite ? "Remover" : "Favoritar"}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}

            {item.phonetics?.map((phonetic, pIndex) => {
              if (!phonetic.text || !phonetic.audio) return null;
              return (
                <View key={pIndex}>
                  <Text style={styles.regular}>{phonetic.text}</Text>
                  <Text style={styles.regular}>
                    TODO: implement MP3 Player with the link: {phonetic.audio}
                  </Text>
                </View>
              );
            })}

            <Text style={styles.h2}>Meanings:</Text>

            {item.meanings?.map((meaning, mIndex) => (
              <View key={mIndex} style={styles.sectionContainer}>
                <Text style={styles.bold}>
                  {capitalizeFirstLetter(meaning.partOfSpeech)}
                </Text>

                {meaning.definitions.map((definition, dIndex) => (
                  <View key={dIndex} style={styles.sectionItemContainer}>
                    <Text style={styles.regular}>
                      • {definition.definition}
                    </Text>
                    {definition.example && (
                      <Text style={styles.italic}>
                        e.g.: {definition.example}
                      </Text>
                    )}
                  </View>
                ))}

                {meaning.synonyms?.length > 0 && (
                  <Text style={styles.regular}>
                    <Text style={styles.bold}>Synonyms:</Text>{" "}
                    {meaning.synonyms.join(", ")}
                  </Text>
                )}

                {meaning.antonyms?.length > 0 && (
                  <Text style={styles.regular}>
                    <Text style={styles.bold}>Antonyms:</Text>{" "}
                    {meaning.antonyms.join(", ")}
                  </Text>
                )}
              </View>
            ))}

            {item.sourceUrls?.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.bold}>Sources:</Text>

                {item.sourceUrls.map((source, sIndex) => (
                  <TouchableOpacity
                    key={sIndex}
                    onPress={() => {
                      Linking.openURL(source);
                    }}
                  >
                    <Text key={sIndex} style={styles.link}>
                      {source}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 4,
          gap: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="outline"
          label="Back"
          onPress={router.back}
          fullWidth={false}
        />
        <Button
          type="primary"
          label="Next Word"
          onPress={() => {}}
          fullWidth={false}
        />
      </View>
    </View>
  );
}
