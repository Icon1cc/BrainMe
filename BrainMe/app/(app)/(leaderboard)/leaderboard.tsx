import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import Colors from "@/constants/Colors";

import Header from "@/components/leaderboard/header";
import TopPodium from "@/components/leaderboard/podium/top-podium";
import Podium from "@/components/leaderboard/podium/ranks";

import Swipeable from "@/components/swipeable-row";

// Backend.
import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function LeaderBoard() {
  const convex = useConvex();

  const [filteredUsers, setFilteredUsers] = useState([]);
  return (
    <View style={styles.container}>
      <Header title="ranking" onPress={() => {}} />
      <View style={{ gap: 17 }}>
        <TopPodium users={[]} />
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
