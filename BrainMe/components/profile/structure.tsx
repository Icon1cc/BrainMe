import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Stack } from "expo-router";
import React, { ReactNode } from "react";

import Colors from "@/constants/Colors";
import ImageViewer from "../image-viewer";
import { FontAwesome6 } from "@expo/vector-icons";

interface StructureProps {
  title: string;
  placeholder: string;
  children: ReactNode;
}

export function Structure({ title, children, placeholder }: StructureProps) {
  const isTablet = useWindowDimensions().width > 763;
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
      <View
        style={[
          styles.container,
          {
            paddingHorizontal: isTablet ? 17 * 3 : 17,
            paddingBottom: isTablet ? 17 * 5 : 17 * 2,
          },
        ]}
      >
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            alignItems: "center",
            top: isTablet ? -60 : -45,
          }}
        >
          <ImageViewer size={isTablet ? 120 : 90} selectedImage={placeholder} />
          <FontAwesome6 name="medal" size={30} color="#CE7431" />
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
    paddingTop: 17 * 2,
  },
});

// Bronze: #CE7431
// Silver: #BDBDBD
// Gold: #FFD700
