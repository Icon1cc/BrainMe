import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

interface FooterProps {
  text: string;
  link?: "Sign up";
}

export default function Footer({ text, link }: FooterProps) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      {link === "Sign up" ? (
        <Link href="/sign-up" asChild>
          <Pressable>
            <Text style={styles.text}>Sign up</Text>
          </Pressable>
        </Link>
      ) : (
        <Link href="/welcome" asChild>
          <Pressable>
            <Text style={styles.text}>Sign in</Text>
          </Pressable>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.secondary,
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});
