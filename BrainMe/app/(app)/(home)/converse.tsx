import {
  View,
  Pressable,
  FlatList,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Stack, Link } from "expo-router";
import React, { useEffect, useState } from "react";

import ImageViewer from "@/components/image-viewer";
import Colors from "@/constants/Colors";

import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface RenderItemProps {
  item: {
    _id: Id<"chats">;
    username: string;
    last_comment: string;
    timestamp: string;
    selectedImage: string;
  };
}

function RenderItem({ item }: RenderItemProps) {
  return (
    <Link
      href={{
        pathname: "/t/[chat]",
        params: { chat: item._id },
      }}
      asChild
    >
      <Pressable style={{ flexDirection: "row", gap: 10 }}>
        <ImageViewer size={50} selectedImage={item.selectedImage} />
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 17 }}>
            <Text style={styles.name}>{item.username}</Text>
            <Text
              style={{ color: Colors.primary, fontFamily: "NiveauGrotesk" }}
            >
              {item.timestamp}
            </Text>
          </View>
          <Text
            style={{ color: Colors.primary, fontFamily: "NiveauGroteskLight" }}
          >
            {item.last_comment}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

export default function Converse() {
  const convex = useConvex();
  const user = useQuery(api.user.retrieve);
  const chats = useQuery(api.chats.retrieve);
  const isTablet = useWindowDimensions().width >= 768;

  const [data, setData] = useState<
    {
      _id: Id<"chats">;
      username: string;
      last_comment: string;
      timestamp: string;
      selectedImage: string;
      file: string;
    }[]
  >([]);
  const [filteredChats, setFilteredChats] = useState(data);

  useEffect(() => {
    if (chats) setData(chats);
  }, [chats]);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newChats = chats.filter((chat) => {
        const itemData = chat.username.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredChats(newChats);
    } else {
      setFilteredChats(chats);
    }
  };

  /*useEffect(() => {
    const loadChats = async () => {
      // Retrieves the other user id in all of the chat groups.
      if (user && chatGroups) {
        const otherUsersId = chatGroups.map((chat) => {
          const otherUser =
            chat.user_1 === user?._id ? chat.user_2 : chat.user_1;
          return otherUser;
        });
        // Retrieves the username of the other users.
        const otherUsers = await convex.query(api.user.getUserByIds, {
          userIds: otherUsersId,
        });
        // Prepares the chat data to be displayed.
        const chats = otherUsers.map((otherName) => {
          const chatId = chatGroups.find(
            (chat) =>
              chat.user_1 === otherName?._id || chat.user_2 === otherName?._id
          )?._id;
          const last_comment = chatGroups.find(
            (chat) =>
              chat.user_1 === otherName?._id || chat.user_2 === otherName?._id
          )?.last_comment;
          const timestamp = chatGroups.find(
            (chat) =>
              chat.user_1 === otherName?._id || chat.user_2 === otherName?._id
          )?.timestamp;
          return {
            _id: chatId as Id<"chats">,
            username: otherName?.username!,
            last_comment: last_comment as string,
            timestamp: timestamp as string,
            selectedImage: otherName?.file!,
          };
        });
        setChats(chats);
        setFilteredChats(chats);
      }
    };
    loadChats();
  }, [user, chatGroups]);*/

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Find your chat",
            textColor: "black",
            tintColor: "black",
            hintTextColor: "white",
            hideWhenScrolling: false,
            hideNavigationBar: false,
            onChangeText: (event: any) => {
              searchFilterFunction(event.nativeEvent.text);
            },
          },
        }}
      />
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item._id.toString()}
        contentInsetAdjustmentBehavior="automatic"
        ItemSeparatorComponent={() => {
          return <View style={{ height: isTablet ? 20 : 17 }} />;
        }}
        contentContainerStyle={{ paddingHorizontal: 17 }}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontFamily: "NiveauGrotesk",
    color: Colors.primary,
  },
});
