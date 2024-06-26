import { Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

import Colors from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // This hook provides information about the user's authentication state.
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    SplashScreen.hideAsync();
  }

  /* Redirect to the welcome screen if the user is not signed in
  if (!isSignedIn) {
    return <Redirect href={"/welcome"} />;
  }*/

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="log-out" options={{ headerShown: false }} />
    </Tabs>
  );
}
