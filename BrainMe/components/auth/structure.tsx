import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

import Colors from "../../constants/Colors";

interface StructureProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function Structure({ children, title, subtitle }: StructureProps) {
  // This hook provides the safe area insets, which allows you to avoid the status bar.
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: Colors.primary,
      }}
      testID="structure-container"
    >
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{ gap: 34 }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 17,
    paddingTop: 51,
  },
  text: {
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
