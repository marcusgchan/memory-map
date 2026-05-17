import { StyleSheet } from "react-native";
import { Redirect, Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Foundation from "@expo/vector-icons/Foundation";

import { useLocalUser } from "~/lib/auth/LocalUserContextProvider";

export default function TabsLayout() {
  const localUser = useLocalUser();
  console.log("tabs");
  if (!localUser.isLoading && !localUser.isError && localUser.id === null) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: {},
        sceneStyle: {},
        tabBarActiveTintColor: "teal",
      }}
    >
      <Tabs.Screen
        name="memories"
        options={{
          title: "Memories",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="photos"
        options={{
          title: "Photos",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Foundation name="photo" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ask"
        options={{
          title: "Ask",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
