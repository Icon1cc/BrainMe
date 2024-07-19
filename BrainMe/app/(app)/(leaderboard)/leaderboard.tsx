import { View, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import TopPodium from "@/components/leaderboard/top-podium";
import Podium from "@/components/leaderboard/ranks";

// Backend.
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

export default function LeaderBoard() {
  const leaderboard = useQuery(api.leaderboard.collect, {});
  const users = useQuery(api.user.collect);
  const searchParameter = ["ranking", "games played"];
  const [searchIndex, setSearchIndex] = useState(0);

  useEffect(() => {
    if (leaderboard && users) {
    }
  }, [leaderboard, users]);

  useEffect(() => {
    if (all) {
      if (searchParameter[searchIndex] === "games played") {
        const users = all.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
        setUsers(
          users.map((user) => ({
            _id: user._id,
            file: user.file,
            username: user.username,
            points: user.gamesPlayed,
          }))
        );
      } else {
        const users = all.sort((a, b) => b.points - a.points);
        setUsers(
          users.map((user) => ({
            _id: user._id,
            file: user.file,
            username: user.username,
            points: user.points,
          }))
        );
      }
    }
  }, [all, searchIndex]);
  return (
    <View style={styles.container}>
      <View style={{ gap: 17, flex: 1 }}>
        <TopPodium top3users={users.slice(0, 3)} />
        <FlatList
          style={{ flex: 1 }}
          data={users.slice(3)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
          renderItem={({ item, index }) => (
            <Podium
              placeholder={item.file}
              userId={item._id}
              position={index + 4}
              username={item.username}
              rank={item.points}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 17 * 7,
    paddingBottom: 10,
    paddingHorizontal: 17 * 1,
    gap: 17,
  },
});
