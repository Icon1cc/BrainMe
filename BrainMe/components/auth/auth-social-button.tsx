import { Pressable, Image, StyleSheet } from "react-native";
import React from "react";

enum ProviderImage {
  google = require("@/assets/images/auth/google.png"),
  apple = require("@/assets/images/auth/apple.png"),
  facebook = require("@/assets/images/auth/facebook.png"),
}

interface AuthSocialButtonProps {
  onPress: () => void;
  provider: string;
}

export default function AuthSocialButton(props: AuthSocialButtonProps) {
  const image = ProviderImage[props.provider as keyof typeof ProviderImage];
  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      <Image source={image} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 17,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  image: {
    resizeMode: "contain",
    width: 24,
    height: 24,
  },
});
