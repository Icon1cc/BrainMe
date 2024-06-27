import { Pressable } from "react-native";
import { Stack, Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="profile" />
      <Stack.Screen
        name="[profile]"
        options={{
          headerLeft() {
            return (
              <Link href="/(app)/(profile)/f/finder" asChild>
                <Pressable>
                  <AntDesign name="arrowleft" size={24} color="white" />
                </Pressable>
              </Link>
            );
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
