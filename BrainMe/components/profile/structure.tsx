import { View, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import Colors from "@/constants/Colors";

interface StructureProps {
  children: React.ReactNode;
  placeholder?: string;
}

export function Structure({ children, placeholder }: StructureProps) {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 17 * 5,
        backgroundColor: Colors.primary,
      }}
    >
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
