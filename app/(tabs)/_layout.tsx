import { Header } from "@/components/common/Header";
import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const titles = {
    index: "Words List",
    history: "History",
    favorites: "Favorites",
  };

  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: bottom + 60, paddingTop: 6 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: titles.index,
          header: () => <Header type="showAuth" title={titles.index} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "black" : "gray" }}>
              {titles.index}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="table"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: titles.history,
          header: () => <Header type="showAuth" title={titles.history} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "black" : "gray" }}>
              {titles.history}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="history"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: titles.favorites,
          header: () => <Header type="showAuth" title={titles.favorites} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "black" : "gray" }}>
              {titles.favorites}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="heart"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
