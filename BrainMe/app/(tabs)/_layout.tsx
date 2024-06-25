import { Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
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
    <Tabs screenOptions={{ headerShadowVisible: false }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle() {
            return (
              <Text
                style={{ fontFamily: "Pacifico", color: "white", fontSize: 32 }}
              >
                Jessica Richman
              </Text>
            );
          },
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
      <Tabs.Screen name="log-out" options={{ headerShown: false }} />
    </Tabs>
  );
}
