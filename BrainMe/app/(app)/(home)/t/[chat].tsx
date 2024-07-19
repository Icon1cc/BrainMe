import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
  TextInput,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import React, { useEffect, useState, useRef } from "react";

import Colors from "@/constants/Colors";

import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { Feather } from "@expo/vector-icons";
import ImageViewer from "@/components/image-viewer";

export default function Chat() {
  // Back-end + Navigation
  const convex = useConvex();
  const router = useRouter();
  const { chat } = useLocalSearchParams();
  const [user, setUser] = useState<string | null>();
  const [username, setUsername] = useState("");
  const addMessage = useMutation(api.messages.sendMessage);
  const conversation = useMutation(api.chats.updateChat);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messages = useQuery(api.messages.getMessages, {
    chat_id: chat as Id<"chats">,
  });
  const [OtherUri, setOtherUri] = useState<string>("");

  const isTablet = useWindowDimensions().width >= 768;

  // Front-end.
  const [newMessage, setNewMessage] = useState("");
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    const loadUser = async () => {
      // Load our user.
      const user = await convex.query(api.user.retrieve);
      setUser(user?.username);

      // Load the chat group.
      const chatGroup = await convex.query(api.chats.retrieveById, {
        chatId: chat as Id<"chats">,
      });

      // Retrieves the other's id in the chat group.
      const otherUserId =
        chatGroup?.user_1 === user?._id ? chatGroup?.user_2 : chatGroup?.user_1;

      // Load the other user from its id.
      const otherUser = await convex.query(api.user.retrieveById, {
        _id: otherUserId as Id<"user">,
      });

      if (otherUser?.file) {
        setOtherUri(otherUser.file);
      }

      // Set the other user's username.
      setUsername(otherUser!.username);
    };

    if (chat) loadUser();
  }, [chat]);

  // Scrolls to bottom when a new message is added.
  useEffect(() => {
    setTimeout(() => {
      listRef.current!.scrollToEnd({ animated: true });
    }, 300);
  }, [messages]);

  // Open image picker and set selected image
  const captureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
    }
  };

  // Send message to Convex.
  const handleMessage = async () => {
    Keyboard.dismiss();
    // Regular mutation to add a message
    await addMessage({
      chat_id: chat as Id<"chats">,
      content: newMessage,
      user: user!,
    });
    // Regular mutation to update the chat group.
    await conversation({
      chatId: chat as Id<"chats">,
      last_comment: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    });
    setNewMessage("");
  };

  const renderMessage: ListRenderItem<Doc<"messages">> = ({ item }) => {
    const isUserMessage = item.user === user;

    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage
            ? styles.userMessageContainer
            : [styles.otherMessageContainer],
        ]}
      >
        {item.content !== "" && (
          <Text style={[styles.messageText, { color: "white" }]}>
            {item.content}
          </Text>
        )}
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 200, height: 200, margin: 10 }}
          />
        )}
        <Text style={{ color: "white" }}>
          {new Date(item._creationTime).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={[{ flex: 1 }]}>
      <Stack.Screen
        options={{
          headerTitle() {
            return (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <ImageViewer size={20} selectedImage={OtherUri} />
                <Text
                  style={{
                    fontFamily: "NiveauGrotesk",
                    color: Colors.primary,
                    fontSize: 20,
                  }}
                >
                  `${username}`
                </Text>
              </View>
            );
          },
          //headerTitle: `${username}`,
          /*headerTitleStyle: {
            fontFamily: "NiveauGrotesk",
            color: Colors.primary,
            fontSize: 20,
          },*/
          headerLeft: () => (
            <Pressable
              hitSlop={25}
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.primary} />
            </Pressable>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <FlatList
          style={{ padding: isTablet ? 10 : 0 }}
          ref={listRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id.toString()}
          ListFooterComponent={<View style={{ padding: 5 }} />}
          contentInsetAdjustmentBehavior="automatic"
        />
        {/* For the Inputbar. */}
        <View
          style={[
            styles.inputContainer,
            { paddingHorizontal: isTablet ? 30 : 17 },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <TextInput
              style={styles.textInput}
              value={newMessage}
              placeholder="Send a message..."
              placeholderTextColor={"lightgrey"}
              multiline={true}
              selectionColor={"white"}
              autoCorrect={false}
              onChangeText={setNewMessage}
            />
            <Pressable onPress={captureImage}>
              <Feather name="file-plus" size={24} color={"white"} />
            </Pressable>
            <Pressable onPress={handleMessage} disabled={newMessage === ""}>
              <Feather name="send" size={24} color={"white"} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    maxWidth: "80%",
  },
  userMessageContainer: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-end",
  },
  otherMessageContainer: {
    backgroundColor: Colors.secondary,
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "wrap",
  },
  inputContainer: {
    padding: 17,
    paddingBottom: 34,
    backgroundColor: Colors.primary,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 12,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: Colors.primary,
    paddingTop: 10,
    color: "white",
  },
});
