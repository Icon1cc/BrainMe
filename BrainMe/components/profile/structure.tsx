import { View, Text, Image, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React from "react";

import Colors from "@/constants/Colors";

interface StructureProps {
  title: string;
  placeholder?: string;
  children: React.ReactNode;
}

export function Structure({ title, children, placeholder }: StructureProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 17 * 11,
        backgroundColor: Colors.primary,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle() {
            return (
              <Text
                style={{ fontFamily: "Pacifico", color: "white", fontSize: 24 }}
              >
                {title}
              </Text>
            );
          },
        }}
      />
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/user/smiling-woman.jpeg")}
          style={styles.image}
        />
        {children}
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 17 * 5,
    paddingBottom: 17 * 3,
    paddingHorizontal: 17,
  },
  image: {
    position: "absolute",
    alignSelf: "center",
    top: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 3,
  },
});
