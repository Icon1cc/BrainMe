import { ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { Structure } from "@/components/profile/structure";

import Grid from "@/components/profile/grid";
import Options from "@/components/profile/options";

// Backend.
import { useQuery, useMutation, useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function OtherUser() {
  // Get the user's profile.
  const { profile } = useLocalSearchParams<{ profile: string }>();
  const convex = useConvex();
  const router = useRouter();

  // Get the user's and our data.
  const user = useQuery(api.user.retrieve);
  const otherUser = useQuery(api.user.retrieveById, {
    _id: profile as Id<"user">,
  });
  const updateUser = useMutation(api.user.update);
  const otherUserBoard = useQuery(api.userstatistics.retrieveByUserId, {
    user_id: profile as Id<"user">,
  });
  const [uploading, setUploading] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  // Check if the user is a friend.
  useEffect(() => {
    if (user && otherUser)
      setIsFriend(user.friends?.includes(profile as Id<"user">) || false);
  }, [otherUser, user]);

  const handleOnMessage = async () => {
    setUploading(true);
    if (user) {
      const chat = await convex.query(api.chats.retrieveByUserIds, {
        user_1: user._id,
        user_2: profile as Id<"user">,
      });
      if (chat) {
        setUploading(false);
        router.push({
          pathname: "/(profile)/t/[chat]",
          params: { chat: chat._id },
        });
      } else {
        await convex.mutation(api.chats.insert, {
          user_1: user._id,
          user_2: profile as Id<"user">,
          last_comment: "Start a new conversation!",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });
        const newChat = await convex.query(api.chats.retrieveByUserIds, {
          user_1: user._id,
          user_2: profile as Id<"user">,
        });
        if (newChat) {
          router.push({
            pathname: "/(profile)/t/[chat]",
            params: { chat: newChat._id },
          });
          setUploading(false);
        } else {
          setUploading(false);
        }
      }
    }
  };

  const handleOnFollow = async () => {
    if (isFriend) {
      await updateUser({
        _id: user?._id!,
        friends: user?.friends?.filter((id) => id !== profile) || [],
      });
      setIsFriend(false);
    } else {
      await updateUser({
        _id: user?._id!,
        friends: [...(user?.friends || []), profile as Id<"user">],
      });
      setIsFriend(true);
    }
  };
  return (
    <Structure
      title={otherUser?.username!}
      placeholder={otherUser?.file!}
      ranking={0}
    >
      <ActivityIndicator
        animating={uploading}
        size="large"
        color="blue"
        style={styles.activityIndicator}
      />
      <Grid
        ranking={0}
        games={otherUserBoard?.games!}
        points={otherUserBoard?.points!}
        level={otherUserBoard?.level!}
        correct={
          otherUserBoard?.games! > 0
            ? otherUserBoard?.correctAnswers! / otherUserBoard?.games!
            : 0
        }
        incorrect={otherUserBoard?.correctAnswers!}
      />
      <Options
        disabled={uploading}
        onPressMessage={handleOnMessage}
        onPressFollow={handleOnFollow}
        isFriend={isFriend}
      />
    </Structure>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
