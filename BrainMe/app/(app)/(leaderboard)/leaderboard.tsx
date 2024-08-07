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
  const users = useQuery(api.user.collect, {});
  console.log(users);
  const [data, setData] = useState<
    {
      _id: Id<"user">;
      file?: string | undefined;
      username: string;
      points: number;
    }[]
  >([]);

  useEffect(() => {
    if (leaderboard && users) {
      const board = users.map((user) => {
        const board = leaderboard.find((board) => board.user_id === user._id);
        return {
          _id: user._id,
          file: user.file,
          username: user.username,
          points: board?.points ?? 0,
        };
      });
      setData(board.sort((a, b) => b.points - a.points));
    }
  }, [leaderboard, users]);

  return (
    <View style={styles.container}>
      <TopPodium top3users={data.slice(0, 3)} />
      <FlatList
        style={{ flex: 1 }}
        data={data.slice(3)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 17,
  },
});
