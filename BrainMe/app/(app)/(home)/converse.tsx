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

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface RenderItemProps {
  item: {
    _id: Id<"chats">;
    username: string;
    _creationTime: number;
    last_comment?: string | undefined;
    user_1: Id<"user">;
    user_2: Id<"user">;
    timestamp: string;
    file?: string;
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
        <ImageViewer size={50} selectedImage={item.file} />
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
  const chats = useQuery(api.chats.retrieve);
  const isTablet = useWindowDimensions().width >= 768;

  const [data, setData] = useState<
    {
      username: string;
      file?: string;
      _id: Id<"chats">;
      _creationTime: number;
      last_comment?: string | undefined;
      user_1: Id<"user">;
      user_2: Id<"user">;
      timestamp: string;
    }[]
  >([]);
  const [filteredChats, setFilteredChats] = useState(data);
  console.log(filteredChats);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newChats = data.filter((chat: any) => {
        const itemData = chat.username.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredChats(newChats);
    } else {
      setFilteredChats(data);
    }
  };

  useEffect(() => {
    if (chats) {
      setData(chats);
      setFilteredChats(chats);
    }
  }, [chats]);

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
