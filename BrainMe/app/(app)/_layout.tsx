import { useWindowDimensions } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Tabs, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import Colors from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const isTablet = useWindowDimensions().width >= 768;
  const segments = useSegments();
  // This hook provides information about the user's authentication state.
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    SplashScreen.hideAsync();
  }

  // Redirect to the welcome screen if the user is not signed in
  if (!isSignedIn) {
    return <Redirect href={"/welcome"} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarStyle: {
            marginBottom: isTablet ? 15 : 0,
            display:
              segments[3] === "[chat]" || segments[2] === "q" ? "none" : "flex",
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="game-controller" color={color} size={26} />
            ),
          }}
        />
        <Tabs.Screen
          name="(leaderboard)"
          options={{
            title: "Leaderboard",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="leaderboard" color={color} size={26} />
            ),
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-alt" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
