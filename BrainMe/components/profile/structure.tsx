import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import React, { ReactNode } from "react";

import Colors from "@/constants/Colors";
import ImageViewer from "../image-viewer";

interface StructureProps {
  title: string;
  placeholder: string;
  children: ReactNode;
}

export function Structure({ title, children, placeholder }: StructureProps) {
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
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            top: -50,
          }}
        >
          <ImageViewer size={100} selectedImage={placeholder} />
        </View>
        {children}
      </View>
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
});
