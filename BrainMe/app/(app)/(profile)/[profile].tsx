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
  const myUser = useQuery(api.user.myUser);
  const otherUser = useQuery(api.user.get, { _id: profile as Id<"user"> });
  const updateFriends = useMutation(api.user.update);

  // Check if the user is a friend.
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    if (myUser && otherUser)
      setIsFriend(myUser?.friends?.includes(profile as Id<"user">) || false);
  }, [otherUser, myUser]);

  const handleOnMessage = async () => {
    if (myUser) {
      const chat = await convex.query(api.chats.getChatByUsers, {
        user_1: myUser._id,
        user_2: profile as Id<"user">,
      });
      if (chat) {
      } else {
        const createdChat = await convex.mutation(api.chats.createChat, {
          user_1: myUser._id,
          user_2: profile as Id<"user">,
          last_comment: "",
          timestamp: "",
        });
      }
    }
  };
  const handleOnFollow = async () => {
    if (isFriend) {
      await updateFriends({
        _id: myUser?._id!,
        friends: myUser?.friends?.filter((id) => id !== profile) || [],
      });
      setIsFriend(false);
    } else {
      await updateFriends({
        _id: myUser?._id!,
        friends: [...(myUser?.friends || []), profile as Id<"user">],
      });
      setIsFriend(true);
    }
    //friends.push(profile as Id<"user">);
  };
  return (
    <Structure title={otherUser?.username!} placeholder={otherUser?.file!}>
      <Grid
        ranking={otherUser?.ranking!}
        gamesPlayed={otherUser?.gamesPlayed!}
        points={otherUser?.points!}
        completionRate={otherUser?.completionRate!}
        correctAnswers={otherUser?.correctAnswers!}
        wrongAnswers={otherUser?.wrongAnswers!}
      />
      <Options
        onPressMessage={handleOnMessage}
        onPressFollow={handleOnFollow}
        isFriend={isFriend}
      />
    </Structure>
  );
}
