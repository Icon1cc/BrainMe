import {
  View,
  Text,
  FlatList,
  useColorScheme,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Stack, Link, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import React, { useState, useEffect } from "react";

import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import ImageViewer from "@/components/image-viewer";

interface RenderItemProps {
  name: string;
}

const RenderItem = ({ name }: RenderItemProps) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const border = colorScheme === "dark" ? "grey" : "darkgrey";
  return (
    <Link href={`/chats/${name}`} asChild>
      <Pressable style={styles.container}>
        <ImageViewer size={50} />
        <View style={[styles.nameContainer, { borderBottomColor: border }]}>
          <Text style={[styles.text, { color: themeColors.text }]}>{name}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default function NewChat() {
  const { users } = useLocalSearchParams();
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

  useEffect(() => {
    const loadAllUsers = async () => {
      const allUsers = await convex.query(api.user.getUsers);
      if (allUsers) {
        setData(allUsers);
        setFilteredData(allUsers.filter((user) => user.username !== users));
      }
    };
    loadAllUsers();
  }, [users]);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.username.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search",
            textColor: "black",
            hideWhenScrolling: false,
            hideNavigationBar: false,
            onChangeText: (event: any) => {
              searchFilterFunction(event.nativeEvent.text);
            },
          },
        }}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.username}
        contentInsetAdjustmentBehavior="automatic"
        ItemSeparatorComponent={() => {
          return <View style={{ height: 15 }} />;
        }}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => <RenderItem name={item.username} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
  },
  nameContainer: {
    flex: 1,
    borderBottomWidth: 1,
    paddingTop: 10,
  },
  text: {
    fontSize: 18,
  },
});
