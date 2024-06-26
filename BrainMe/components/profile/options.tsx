import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

interface OptionsProps {
  isFriend: boolean;
  onPressMessage: () => void;
  onPressFollow: () => void;
}

export default function Options(props: OptionsProps) {
  const [isFriend, setIsFriend] = useState(props.isFriend);
  return (
    <View style={styles.container}>
      <Pressable
        onPress={props.onPressMessage}
        style={[
          styles.button,
          { backgroundColor: "white", borderColor: "#006989", borderWidth: 1 },
        ]}
      >
        <Text style={styles.text}>Send Message</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setIsFriend(!isFriend);
          props.onPressFollow();
        }}
        style={({ pressed }) => {
          return [
            { opacity: pressed ? 0.7 : 1 },
            styles.button,
            { backgroundColor: "#E88D67", flexDirection: "row", gap: 10 },
          ];
        }}
      >
        {isFriend ? (
          <>
            <Text style={[styles.text, { color: "white" }]}>Unfriend</Text>
            <Ionicons name="checkmark" size={20} color="white" />
          </>
        ) : (
          <>
            <Text style={[styles.text, { color: "white" }]}>Add friend</Text>
            <Ionicons name="person-add" size={20} color="white" />
          </>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  text: {
    fontFamily: "NiveauGroteskBold",
    fontSize: 20,
  },
});
