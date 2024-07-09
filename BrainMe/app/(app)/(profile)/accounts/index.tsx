import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import ProfilePic from "@/components/profile/settings/profile-pic";
import AccountDetails from "@/components/profile/settings/account-details";
import PushNotifications from "@/components/profile/settings/push-notifications";
import SignOut from "@/components/profile/settings/session";

// Backend.
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Settings() {
  const { title, param } = useLocalSearchParams();
  const myUser = useQuery(api.user.myUser);
  // Safe area insets and router.
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // State.
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("alexandre.boving@gmail.com");
  const [password, setPassword] = useState("************");

  // Selected image.
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  // Handle confirm.
  const onHandleConfirm = async () => {
    if (selectedImage) {
      const url = new URL(`${process.env.EXPO_PUBLIC_CONVEX_SITE}/profilepic`);
      url.searchParams.set("user", myUser?._id!);
      url.searchParams.set("username", name + " " + familyName);

      // Convert the image URI to a blob.
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      // Send blob to convex.
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": blob!.type },
        body: blob,
      })
        .then(() => {
          setSelectedImage("");
        })
        .catch((err) => console.log("ERROR: ", err))
        .finally(() => setUploading(false));
    }
    router.back();
  };

  useEffect(() => {
    if (typeof param === "string") {
      if (title === "name") {
        setName(param);
      } else if (title === "familyName") {
        setFamilyName(param);
      } else if (title === "email") {
        setEmail(param);
      } else if (title === "password") {
        setPassword(param);
      }
    }
  }, [title, param]);

  useEffect(() => {
    if (myUser) {
      setName(myUser.username.split(" ")[0]);
      setFamilyName(myUser.username.split(" ")[1] || "");
      setSelectedImage(myUser.file!);
    }
  }, [myUser]);
  return (
    <View style={[styles.container, { paddingTop: insets.top + 17 * 2 }]}>
      <Stack.Screen
        options={{
          headerRight() {
            return (
              <Pressable onPress={() => onHandleConfirm()} hitSlop={25}>
                <Text style={styles.confirm}>Confirm</Text>
              </Pressable>
            );
          },
        }}
      />
      <ProfilePic
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <View style={{ gap: 17 }}>
        <AccountDetails
          name={name}
          familyName={familyName}
          email={email}
          password={password}
        />
        <PushNotifications />
      </View>
      <SignOut />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 34,
    paddingHorizontal: 17,
  },
  confirm: {
    fontSize: 16,
    fontFamily: "NiveauGrotesk",
    textDecorationLine: "underline",
  },
});
