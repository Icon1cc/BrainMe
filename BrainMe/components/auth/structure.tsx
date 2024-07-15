import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
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
  const isTablet = useWindowDimensions().width >= 768;
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: Colors.primary,
      }}
    >
      <View
        style={[
          styles.text,
          {
            paddingVertical: isTablet ? 51 * 2 : 51,
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        style={[styles.container, { paddingTop: isTablet ? 51 * 2 : 51 }]}
        contentContainerStyle={{
          gap: isTablet ? 17 * 3 : 17 * 2,
          maxWidth: isTablet ? "85%" : "100%",
          width: isTablet ? 768 : "100%",
          alignSelf: "center",
        }}
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
  },
  text: {
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
