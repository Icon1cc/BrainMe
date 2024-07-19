import { Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useUser, useSignUp } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";

// This imports the structure component, which contains the main container for the screen with the header.
import { Structure } from "@/components/auth/structure";

// These imports are required to use the components in this file.
import Input from "@/components/auth/input";
import Footer from "@/components/auth/footer-text";
import SignUpButton from "@/components/auth/action-button";

export default function Welcome() {
  // This hook provides functions and state for signing up.
  const { isLoaded, signUp, setActive } = useSignUp();
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [activity, setActivity] = useState(false);

  // This hook provides information about the user's authentication state.
  const { isSignedIn } = useUser();

  // This hook provides the router object, which allows you to navigate between screens.
  const router = useRouter();

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    setActivity(true);

    try {
      await signUp.create({
        username,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setActivity(false);
      setPendingVerification(true);
    } catch (err: any) {
      setActivity(false);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    setActivity(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      setActivity(false);
    } catch (err: any) {
      setActivity(false);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This effect redirects the user to the home screen if they are already signed in.
  // It runs when the user's authentication state changes.
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <Structure title="Sign up now" subtitle="Join BrainMe and invite friends">
      {!pendingVerification ? (
        <>
          <ActivityIndicator
            animating={activity}
            size="large"
            color="black"
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
            title="Your username"
            placeholder="Rookie"
            onChangeText={setUsername}
          />
          <Input
            title="Password"
            placeholder="Insert password..."
            secureTextEntry
            onChangeText={setPassword}
          />
          <SignUpButton
            activity={activity}
            text="SIGN UP"
            onPress={onSignUpPress}
          />
          <Footer text="Already have an account?" link="/welcome" />
        </>
      ) : (
        <>
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
          <Text>
            Please, insert the verification code we provided on your email
            address.
          </Text>
          <Input
            title="Verification code"
            placeholder="Insert code..."
            keyboardType="numeric"
            textAlign="center"
            maxlength={6}
            onChangeText={setCode}
          />
          <SignUpButton
            activity={activity}
            text="VERIFY"
            onPress={onPressVerify}
          />
          <Footer text="Already have an account?" link="/welcome" />
        </>
      )}
    </Structure>
  );
}
