import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

import ActionButton from "@/components/auth/action-button";

export default function Category() {
  const { category } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, padding: 17, gap: 17 * 2 }}>
      <Stack.Screen
        options={{
          title: `${category}`,
          headerTitleStyle: {
            fontFamily: "NiveauGrotesk",
            color: Colors.primary,
            fontSize: 24,
          },
        }}
      />
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/icons/coin.png")}
          style={{ width: 60, height: 60 }}
        />
      </View>
      <Text style={{ fontFamily: "NiveauGroteskBold", fontSize: 24 }}>
        Select your difficulty
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 17,
        }}
      >
        <Pressable></Pressable>
      </View>
      <ActionButton text="Start Challenge" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 17 * 3,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
