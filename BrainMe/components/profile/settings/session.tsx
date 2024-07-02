import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-react";
import React from "react";

import Colors from "@/constants/Colors";

export default function Session() {
  const { signOut } = useAuth();
  return (
    <View style={{ alignItems: "center", gap: 17 }}>
      <Pressable
        style={({ pressed }) => {
          return [
            {
              opacity: pressed ? 0.75 : 1,
            },
            styles.container,
          ];
        }}
        onPress={() => signOut()}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            letterSpacing: 2,
            fontFamily: "NiveauGrotesk",
          }}
        >
          SIGN OUT
        </Text>
      </Pressable>
      <Text style={styles.delete}>Delete the account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 15,
  },
  delete: {
    fontFamily: "NiveauGroteskMedium",
    fontSize: 20,
    color: "#D20000",
  },
});
