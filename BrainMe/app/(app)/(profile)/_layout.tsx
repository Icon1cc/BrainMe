import { Pressable } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Stack, Link, useRouter } from "expo-router";
import React from "react";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="profile"
        options={{
          headerRight() {
            return <Header navigation="accounts" />;
          },
        }}
      />
      <Stack.Screen
        name="[profile]"
        options={{
          headerLeft() {
            return (
              <Pressable
                hitSlop={25}
                onPress={() => {
                  router.back();
                }}
              >
                <AntDesign name="arrowleft" size={24} color="white" />
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="accounts"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

interface HeaderProps {
  navigation: "profile" | "accounts" | "[profile]";
}

function Header(props: HeaderProps) {
  return (
    <Link href={`/${props.navigation}`} asChild>
      <Pressable hitSlop={25}>
        {props.navigation === "accounts" ? (
          <Ionicons name="settings-outline" size={24} color="white" />
        ) : (
          <AntDesign name="arrowleft" size={24} color="white" />
        )}
      </Pressable>
    </Link>
  );
}
