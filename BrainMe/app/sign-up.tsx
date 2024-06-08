import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUser, useSignUp } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";

// These imports are required to use the components in this file.
import Header from "@/components/auth/header";
import Input from "@/components/auth/input";
import Footer from "@/components/auth/footer";
import Button from "@/components/button";

export default function Welcome() {
  // This hook provides the safe area insets, which allows you to avoid the status bar.
  const insets = useSafeAreaInsets();

  // This hook provides functions and state for signing up.
  const { isLoaded, signUp, setActive } = useSignUp();
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // This hook provides information about the user's authentication state.
  const { isSignedIn } = useUser();

  // This hook provides the router object, which allows you to navigate between screens.
  const router = useRouter();

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        username,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
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
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Header title="Sign up now" subtitle="Join BrainMe and invite friends" />
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{ gap: 34 }}
      >
        {!pendingVerification ? (
          <>
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
            <Button text="SIGN UP" onPress={onSignUpPress} />
            <Footer text="Already have an account?" />
          </>
        ) : (
          <>
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
            <Button text="VERIFY" onPress={onPressVerify} />
            <Footer text="Already have an account?" />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 17,
    paddingTop: 51,
  },
});
