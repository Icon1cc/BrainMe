import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";

import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import ImageViewer from "@/components/image-viewer";

interface RenderItemProps {
  name: string;
  id: Id<"user">;
  onHandlePress: (id: Id<"user">) => void;
}

const RenderItem = ({ name, id, onHandlePress }: RenderItemProps) => {
  return (
    <Pressable style={styles.container} onPress={() => onHandlePress(id)}>
      <ImageViewer size={50} />
      <View style={styles.name}>
        <Text style={{ fontSize: 18, fontFamily: "NiveauGrotesk" }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

export default function NewChat() {
  const { users } = useLocalSearchParams();
  const convex = useConvex();
  const myUser = useQuery(api.user.myUser);
  const createChat = useMutation(api.chats.createChat);
  const router = useRouter();
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

  const onHandlePress = async (id: Id<"user">) => {
    await createChat({
      user_1: myUser?._id as Id<"user">,
      user_2: id,
      last_comment: "",
      timestamp: "",
    });
    router.back();
  };

  useEffect(() => {
    const loadAllUsers = async () => {
      const allUsers = await convex.query(api.user.getUsers);
      if (allUsers) {
        setData(allUsers);
        setFilteredData(allUsers);
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
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search",
            textColor: "black",
            tintColor: "black",
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
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <RenderItem
            name={item.username}
            id={item._id}
            onHandlePress={onHandlePress}
          />
        )}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 15 }} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
  },
  name: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingTop: 10,
  },
});
