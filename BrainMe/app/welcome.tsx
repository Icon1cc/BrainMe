import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { Structure } from "@/components/auth/structure";
import Input from "@/components/auth/input";
import Separator from "@/components/auth/separator";
import AuthSocialButton from "@/components/auth/auth-social-button";
import LoginButton from "@/components/auth/action-button";
import Footer from "@/components/auth/footer-text"; // Ensure this import is correct

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
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [activity, setActivity] = useState(false);

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

    setActivity(true);

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
      setActivity(false);
    } catch (err) {
      console.error("OAuth error", err);
      setActivity(false);
    }
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    setActivity(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      setActivity(false);
    } catch (err: any) {
      console.log(err);
      setActivity(false);
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
      <ActivityIndicator
        animating={activity}
        size="large"
        color="blue"
        style={{
          position: "absolute",
          top: -200,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AuthSocialButton
          activity={activity}
          onPress={() => onSelectAuth(Strategy.Google)}
          provider="google"
        />
        <AuthSocialButton
          activity={activity}
          onPress={() => onSelectAuth(Strategy.Facebook)}
          provider="facebook"
        />
        <AuthSocialButton
          activity={activity}
          onPress={() => onSelectAuth(Strategy.Apple)}
          provider="apple"
        />
      </View>
      <LoginButton activity={activity} text="LOGIN" onPress={onSignInPress} />
      <Footer text="Don't have an account yet?" link="Sign up" />
    </Structure>
  );
}
