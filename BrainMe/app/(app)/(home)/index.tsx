import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect } from "react";

import Level from "@/components/home/level";
import Categories from "@/components/home/categories";

// Backend.
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const insets = useSafeAreaInsets();
  // This hook provides information about the user's authentication state.
  const convex = useConvex();

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
    <View style={[styles.container, { paddingTop: insets.top + 17 * 7 }]}>
      <Level />
      <Categories />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 17,
    paddingBottom: 5,
    paddingHorizontal: 17,
  },
});
