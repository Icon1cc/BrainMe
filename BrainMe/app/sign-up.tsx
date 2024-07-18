import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUser, useSignUp } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";

import { Structure } from "@/components/auth/structure";

import Input from "@/components/auth/input";
import Button from "@/components/auth/action-button";

export default function Welcome() {
  const insets = useSafeAreaInsets();

  const { isLoaded, signUp, setActive } = useSignUp();
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const { isSignedIn } = useUser();

  const router = useRouter();

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

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

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

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <Structure title="Sign up now" subtitle="Join BrainMe and invite friends">
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
          <Button text="SIGN UP" onPress={onSignUpPress} activity={false} />
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
          <Button text="VERIFY" onPress={onPressVerify} activity={false} />
        </>
      )}
    </Structure>
  );
}