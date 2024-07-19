import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect } from "react";

import Level from "@/components/home/level";
import Categories from "@/components/home/categories";

import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const insets = useSafeAreaInsets();
  const convex = useConvex();

  useEffect(() => {
    async function checkUser() {
      const user = await convex.query(api.user.retrieve);
      if (!user) {
        await convex.mutation(api.user.insert);
        await convex.mutation(api.leaderboard.insert);
        await convex.mutation(api.userstatistics.insert);
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
