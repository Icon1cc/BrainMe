import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useAuth } from "@clerk/clerk-react";
import React from "react";

import Colors from "@/constants/Colors";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Session() {
  const { signOut } = useAuth();

  // Backend.
  const removeUser = useMutation(api.user.remove);

  const onHandleDelete = async () => {
    Alert.alert("Are you sure you want to delete your account?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          const deleteAccount = async () => {
            await removeUser();
            signOut();
          };
          deleteAccount();
        },
      },
    ]);
  };

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
      <Pressable
        style={({ pressed }) => {
          return [
            {
              opacity: pressed ? 0.5 : 1,
            },
          ];
        }}
        onPress={() => onHandleDelete()}
      >
        <Text
          style={{ color: "red", fontSize: 20, fontFamily: "NiveauGrotesk" }}
        >
          Delete the account
        </Text>
      </Pressable>
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
});
