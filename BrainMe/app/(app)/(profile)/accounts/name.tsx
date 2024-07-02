import {
  View,
  Text,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { Stack, useLocalSearchParams, Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";

interface EditProps {
  value: string;
  onChangeText: (text: string) => void;
  characterLeft: number;
}

export function Edit(props: EditProps) {
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (props.characterLeft === 0) {
      Alert.alert("Character limit reached", "Please limit to 45 characters", [
        {
          text: "OK",
        },
      ]);
    }
  }, [props.characterLeft]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, padding: 17 }}
      keyboardVerticalOffset={70}
    >
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        <TextInput
          ref={inputRef}
          autoFocus
          placeholder="Insert text here..."
          value={props.value}
          maxLength={45}
          onChangeText={props.onChangeText}
          style={{
            fontFamily: "NiveauGrotesk",
            fontSize: 16,
          }}
        />
      </View>
      <Text style={{ alignSelf: "flex-end" }}>
        {props.characterLeft} Number of characters left
      </Text>
    </KeyboardAvoidingView>
  );
}

export default function EditName() {
  const insets = useSafeAreaInsets();
  const { param } = useLocalSearchParams();

  const [value, setValue] = useState("");
  const [characterLeft, setCharacterLeft] = useState(1);

  const onChangeText = (text: string) => {
    setCharacterLeft(45 - text.length);
    setValue(text);
  };

  useEffect(() => {
    if (typeof param === "string") {
      setValue(param);
      setCharacterLeft(45 - param.length);
    }
  }, []);
  return (
    <View style={{ flex: 1, paddingVertical: insets.top }}>
      <Stack.Screen
        options={{
          headerRight() {
            return (
              <Link
                href={{
                  pathname: "/(app)/(profile)/accounts/",
                  params: { title: "name", param: value },
                }}
                asChild
              >
                <Pressable>
                  <Text style={{ fontFamily: "NiveauGrotesk", fontSize: 20 }}>
                    Confirm
                  </Text>
                </Pressable>
              </Link>
            );
          },
        }}
      />
      <Edit
        value={value}
        onChangeText={onChangeText}
        characterLeft={characterLeft}
      />
    </View>
  );
}
