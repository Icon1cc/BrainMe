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
  activity: boolean;
}

export default function AuthSocialButton(props: AuthSocialButtonProps) {
  return (
    <Pressable
      disabled={props.activity}
      onPress={props.onPress}
      style={({ pressed }) => {
        return [
          styles.container,
          {
            backgroundColor: pressed ? "lightgrey" : "transparent",
          },
        ];
      }}
      testID="auth-social-button"
    >
      <Image
        source={ProviderImage[props.provider as keyof typeof ProviderImage]}
        style={styles.image}
        testID={`${props.provider}-image`}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 17,
    paddingHorizontal: 17 * 2,
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
