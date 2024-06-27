import { View, Text } from "react-native";
import React, { useEffect } from "react";

// Backend.
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  // This hook provides information about the user's authentication state.
  const convex = useConvex();

  // Check if the user exists in the database. Otherwise, add the user.
  useEffect(() => {
    async function checkUser() {
      const myUser = await convex.query(api.user.myUser);
      if (!myUser) {
        await convex.mutation(api.user.add);
      }
    }
    checkUser();
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
