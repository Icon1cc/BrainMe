import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import ImageViewer from "@/components/image-viewer";

interface RenderItemProps {
  name: string;
  placeholder?: string;
  id: Id<"user">;
  onHandlePress: (id: Id<"user">) => void;
}

const RenderItem = ({
  name,
  id,
  onHandlePress,
  placeholder,
}: RenderItemProps) => {
  return (
    <Pressable style={styles.container} onPress={() => onHandlePress(id)}>
      <ImageViewer selectedImage={placeholder} size={50} />
      <View style={styles.name}>
        <Text style={{ fontSize: 18, fontFamily: "NiveauGrotesk" }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

export default function NewChat() {
  const isTablet = useWindowDimensions().width >= 768;
  const user = useQuery(api.user.retrieve);
  const friends = useQuery(api.user.retrieveUserFriends);
  const insertChat = useMutation(api.chats.insert);
  const router = useRouter();
  const [data, setData] = useState<
    {
      _id: Id<"user">;
      username: string;
      file?: string;
    }[]
  >([]);
  const [filteredData, setFilteredData] = useState(data);

  const onHandlePress = async (id: Id<"user">) => {
    await insertChat({
      user_1: user?._id as Id<"user">,
      user_2: id,
      last_comment: "",
      timestamp: "",
    });
    router.back();
  };

  useEffect(() => {
    const loadAllUsers = async () => {
      if (friends) {
        setData(friends);
        setFilteredData(friends);
      }
    };
    loadAllUsers();
  }, [friends]);

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
        style={{ flex: 1 }}
        data={filteredData}
        keyExtractor={(item) => item.username}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 17 }}
        renderItem={({ item }) => (
          <RenderItem
            placeholder={item.file}
            name={item.username}
            id={item._id}
            onHandlePress={onHandlePress}
          />
        )}
        ItemSeparatorComponent={() => {
          return <View style={{ height: isTablet ? 20 : 17 }} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  name: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingTop: 10,
  },
});
