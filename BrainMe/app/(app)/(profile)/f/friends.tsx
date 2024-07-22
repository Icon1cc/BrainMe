import { View, Text, FlatList, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack, Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";

import Colors from "@/constants/Colors";
import Profile from "@/components/profile/finder/profiles";

//Backend.
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function Finder() {
  const friends = useQuery(api.user.retrieveUserFriends);
  const boards = useQuery(api.leaderboard.collect, {
    withoutUser: true,
  }); // retrieve all user statistics.

  const [data, setData] = useState<
    {
      _id: Id<"user">;
      file?: string | undefined;
      username: string;
      points: number;
    }[]
  >([]);
  const [filteredData, setFilteredData] = useState(data);

  // Search logic.
  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = data.filter((item: any) => {
        const itemData = item.username.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.startsWith(textData);
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    if (friends && boards) {
      const data = friends.map((friend: any) => {
        const board = boards.find((board: any) => board.user_id === friend._id);
        return {
          _id: friend._id,
          file: friend.file,
          username: friend.username,
          points: board?.points ?? 0,
        };
      });
      setData(data);
      setFilteredData(data);
    }
  }, [friends, boards]);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerLeft() {
            return (
              <Link href="/(app)/(profile)/profile" asChild>
                <Pressable hitSlop={25}>
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={Colors.primary}
                  />
                </Pressable>
              </Link>
            );
          },
          title: "Friends",
          headerTitleStyle: {
            fontFamily: "Pacifico",
            fontSize: 24,
            color: Colors.primary,
          },
          headerBlurEffect: "light",
          headerSearchBarOptions: {
            placeholder: "Search",
            autoFocus: true,
            cancelButtonText: "Cancel",
            tintColor: Colors.primary,
            hideWhenScrolling: true,
            hideNavigationBar: false,
            onChangeText: (event) => {
              searchFilterFunction(event.nativeEvent.text);
            },
          },
        }}
      />
      <FlatList
        data={filteredData}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: 17 }}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
        ListEmptyComponent={() => (
          <Text
            style={{
              marginTop: 17 * 15,
              textAlign: "center",
              fontSize: 28,
              opacity: 0.5,
            }}
          >
            Find a user
          </Text>
        )}
        renderItem={({ item }) => (
          <Profile
            username={item.username}
            points={item.points}
            selectedImage={item.file}
            _id={item._id}
          />
        )}
      />
    </View>
  );
}
