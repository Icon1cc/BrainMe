import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
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
  const isTablet = useWindowDimensions().width > 763;
  const { title, param } = useLocalSearchParams();
  const myUser = useQuery(api.user.myUser);
  // Safe area insets and router.
  const router = useRouter();

  // State.
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");

  // Selected image.
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  // Handle confirm.
  const onHandleConfirm = async () => {
    if (selectedImage) {
      setUploading(true);
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
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: isTablet ? 17 * 3 : 17,
          gap: isTablet ? 17 * 6 : 17 * 3,
        },
      ]}
    >
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
      <ActivityIndicator
        animating={uploading}
        size="large"
        color="blue"
        style={styles.activityIndicator}
      />
      <ProfilePic
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <View style={{ gap: 17 }}>
        <AccountDetails name={name} familyName={familyName} />
        <PushNotifications />
      </View>
      <SignOut />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 17 * 3,
    paddingVertical: 17 * 5,
    position: "relative",
  },
  confirm: {
    fontSize: 16,
    fontFamily: "NiveauGrotesk",
    textDecorationLine: "underline",
  },
  activityIndicator: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
