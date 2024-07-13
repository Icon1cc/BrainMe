import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { Structure } from "@/components/auth/structure";

import Input from "@/components/auth/input";
import Separator from "@/components/auth/separator";
import SocialAuth from "@/components/auth/auth-social-button";
import LoginButton from "@/components/auth/action-button";

import * as WebBrowser from "expo-web-browser";
import { useOAuth, useUser, useSignIn } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

export default function Welcome() {
  const insets = useSafeAreaInsets();

  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { isSignedIn } = useUser();

  useWarmUpBrowser();

  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      console.log("OAuth start");
      const { createdSessionId } = await selectedAuth();
      if (createdSessionId) {
        console.log("OAuth success", createdSessionId);
        if (setActive) {
          await setActive({ session: createdSessionId });
        } else {
          console.error("OAuth error: setActive is undefined");
        }
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <Structure
      title="BrainMe"
      subtitle="Quizz your knowledge, share your wisdom!"
    >
      <Input
        title="Email"
        placeholder="winner@email.com"
        keyboardType="email-address"
        onChangeText={setEmailAddress}
      />
      <Input
        title="Your password"
        placeholder="Insert password..."
        secureTextEntry
        onChangeText={setPassword}
      />
      <Separator />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SocialAuth onPress={() => onSelectAuth(Strategy.Google)} provider="google" />
        <SocialAuth onPress={() => onSelectAuth(Strategy.Facebook)} provider="facebook" />
        <SocialAuth onPress={() => onSelectAuth(Strategy.Apple)} provider="apple" />
      </View>
      <LoginButton text="LOGIN" onPress={onSignInPress} />
    </Structure>
  );
}
