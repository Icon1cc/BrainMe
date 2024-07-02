import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import ProfilePic from "@/components/profile/settings/profile-pic";
import AccountDetails from "@/components/profile/settings/account-details";
import PushNotifications from "@/components/profile/settings/push-notifications";
import SignOut from "@/components/profile/settings/session";

export default function Settings() {
  const { title, param } = useLocalSearchParams();
  // Safe area insets and router.
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // State.
  const [name, setName] = useState("Alexandre");
  const [familyName, setFamilyName] = useState("Boving");
  const [email, setEmail] = useState("alexandre.boving@gmail.com");
  const [password, setPassword] = useState("************");

  // Handle confirm.
  const onHandleConfirm = () => {
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
  return (
    <View style={[styles.container, { paddingTop: insets.top + 17 * 2 }]}>
      <Stack.Screen
        options={{
          headerRight() {
            return (
              <Pressable onPress={() => onHandleConfirm()}>
                <Text style={{ fontSize: 16, fontFamily: "NiveauGrotesk" }}>
                  Confirm
                </Text>
              </Pressable>
            );
          },
        }}
      />
      <ProfilePic />
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
});
