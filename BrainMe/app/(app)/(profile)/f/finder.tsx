import { View, Text, FlatList, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack, Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";

import Colors from "@/constants/Colors";
import Profile from "@/components/profile/finder/profiles";

//Backend.
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function Finder() {
  const convex = useConvex();

  const [data, setData] = useState<
    {
      _id: Id<"user">;
      _creationTime: number;
      friends?: Id<"user">[] | undefined;
      file?: string | undefined;
      user_id: string;
      username: string;
      ranking: number;
      gamesPlayed: number;
      points: number;
      completionRate: number;
      correctAnswers: number;
      wrongAnswers: number;
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
      setFilteredData([]);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      const users = await convex.query(api.user.getUsers);
      if (users) {
        setData(users);
        setFilteredData([]);
      }
    };
    loadUsers();
  }, []);
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
          title: "Find friends",
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
          <Link
            href={{
              pathname: "/(app)/(profile)/[profile]",
              params: { profile: item._id },
            }}
            asChild
          >
            <Pressable>
              <Profile
                username={item.username}
                points={item.points}
                selectedImage={item.file}
              />
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
