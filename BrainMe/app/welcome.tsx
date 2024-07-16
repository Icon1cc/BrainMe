import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

// This imports the structure component, which contains the main container for the screen with the header.
import { Structure } from "@/components/auth/structure";

// These imports are required to use the components in this file.
import Input from "@/components/auth/input";
import Separator from "@/components/auth/separator";
import SocialAuth from "@/components/auth/auth-social-button";
import LoginButton from "@/components/auth/action-button";
import Footer from "@/components/auth/footer-text";

// This import is required to use the OAuth flow.
import * as WebBrowser from "expo-web-browser";
import { useOAuth, useUser, useSignIn } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

// This function clears the authentication session when the component is unmounted.
WebBrowser.maybeCompleteAuthSession();
// This enum defines the available authentication providers.
enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

export default function Welcome() {
  // This hook provides the signIn function, which allows you to sign in the user.
  // It also provides the setActive function, which allows you to set the active session.
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [activity, setActivity] = useState(false);

  // This hook provides information about the user's authentication state.
  const { isSignedIn } = useUser();

  // This hook warms up the browser to make the OAuth flow faster.
  useWarmUpBrowser();

  // This hook provides the router object, which allows you to navigate between screens.
  const router = useRouter();

  // This hook initializes the OAuth flow for each provider.
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  // This function is called when the user selects an authentication provider.
  // It starts the OAuth flow for the selected provider.
  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    setActivity(true);

    try {
      console.log("OAuth start");
      const { createdSessionId, setActive, signIn, signUp } =
        await selectedAuth();
      if (createdSessionId) {
        console.log("OAuth success", createdSessionId);
        setActive!({ session: createdSessionId });
      }
      setActivity(false);
    } catch (err) {
      console.error("OAuth error", err);
      setActivity(false);
    }
  };

  // This function is called when the user presses the sign in button.
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
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      setActivity(false);
    } catch (err: any) {
      console.log(err);
      setActivity(false);
    }
  };

  // This effect redirects the user to the home screen if they are already signed in.
  // It runs when the user's authentication state changes.
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
        <SocialAuth
          activity={activity}
          onPress={() => onSelectAuth(Strategy.Google)}
          provider="google"
        />
        <SocialAuth
          activity={activity}
          onPress={() => onSelectAuth(Strategy.Facebook)}
          provider="facebook"
        />
        <SocialAuth
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
