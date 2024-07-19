import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

interface FooterProps {
  text: string;
  link: "/sign-up" | "/welcome";
}

export default function Footer({ text, link }: FooterProps) {
  const linkText = link === "/sign-up" ? "Sign up" : "Sign in";
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Link href={link} asChild>
        <Pressable hitSlop={25}>
          <Text style={styles.text}>{linkText}</Text>
        </Pressable>
      </Link>
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
