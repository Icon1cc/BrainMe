import { View, Text, Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";

const Home = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        style={{ padding: 20, backgroundColor: "red" }}
        onPress={() => signOut()}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default Home;
