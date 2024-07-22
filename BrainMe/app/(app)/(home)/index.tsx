import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";

import Level from "@/components/home/level";
import Categories from "@/components/home/categories";

import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const insets = useSafeAreaInsets();
  const convex = useConvex();
  const userstatistics = useQuery(api.userstatistics.retrieve);
  const [nextLevelPoints, setNextLevelPoints] = useState(0);

  useEffect(() => {
    async function checkUser() {
      const user = await convex.query(api.user.retrieve);
      console.log("How many times does this run?");
      if (!user) {
        await convex.mutation(api.user.insert);
        await convex.mutation(api.leaderboard.insert);
        await convex.mutation(api.userstatistics.insert);
      }
    }
    setTimeout(() => checkUser(), 1000);
  }, []);

  useEffect(() => {
    if (userstatistics) {
      setNextLevelPoints(
        Math.ceil(
          Math.pow(2, userstatistics.level - 1) * 10 - userstatistics.points
        )
      );
    }
  }, [userstatistics]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 17 * 7 }]}>
      <Level
        level={userstatistics?.level!}
        points={userstatistics?.points!}
        nextLevelPoints={nextLevelPoints}
      />
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
