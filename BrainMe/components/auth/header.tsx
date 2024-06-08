import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 51,
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontFamily: "Pacifico",
    color: "white",
    fontSize: 32,
  },
  subtitle: {
    fontFamily: "NiveauGroteskLight",
    color: "white",
    fontSize: 20,
    opacity: 0.75,
  },
});
