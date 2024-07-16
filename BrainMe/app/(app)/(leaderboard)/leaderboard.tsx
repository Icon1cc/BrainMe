import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import Header from "@/components/leaderboard/header";
import TopPodium from "@/components/leaderboard/podium/top-podium";
import Podium from "@/components/leaderboard/podium/ranks";

// Backend.
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function LeaderBoard() {
  const convex = useConvex();

  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    const loadUsers = async () => {
      const users = await convex.query(api.user.collect);
    };
    loadUsers();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header title="ranking" onPress={() => {}} />
      <View style={{ gap: 17 }}>
        <TopPodium />
        <Podium position={2} username="Alexandre" rank={400} />
        <Podium position={2} username="Alexandre" rank={400} />
        <Podium position={2} username="Alexandre" rank={400} />
        <Podium position={2} username="Alexandre" rank={400} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 17 * 7,
    paddingHorizontal: 17 * 1,
    gap: 17 * 2,
  },
});
