import { View, Text, Pressable, StyleSheet } from "react-native";
import { Stack, Link, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Edit } from "./name";
import React, { useEffect, useState } from "react";

export default function FamilyName() {
  const insets = useSafeAreaInsets();
  const { param } = useLocalSearchParams();

  const [value, setValue] = useState("");
  const [characterLeft, setCharacterLeft] = useState(1);

  const onChangeText = (text: string) => {
    setCharacterLeft(20 - text.length);
    setValue(text);
  };

  useEffect(() => {
    if (typeof param === "string") {
      setValue(param);
      setCharacterLeft(20 - param.length);
    }
  }, []);

  return (
    <View style={{ flex: 1, paddingVertical: insets.top }}>
      <Edit
        value={value}
        onChangeText={onChangeText}
        characterLeft={characterLeft}
      />
      <UpdateButton value={value} />
    </View>
  );
}

const UpdateButton = ({ value }: { value: string }) => {
  return (
    <Link
      href={{
        pathname: "/(app)/(profile)/accounts/",
        params: { title: "familyName", param: value },
      }}
      asChild
    >
      <Pressable hitSlop={25} testID="update-button">
        <Text style={styles.confirm}>Update</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  confirm: {
    fontSize: 16,
    fontFamily: "NiveauGrotesk",
    textDecorationLine: "underline",
  },
});