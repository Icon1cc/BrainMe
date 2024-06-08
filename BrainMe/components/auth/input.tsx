import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

interface InputProps {
  title: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  textAlign?: "center";
  maxlength?: number;
  onChangeText: (text: string) => void;
}

export default function Input({
  title,
  placeholder,
  keyboardType,
  onChangeText,
  textAlign,
  maxlength,
  secureTextEntry,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#A0A0A0"}
        keyboardType={keyboardType}
        style={styles.input}
        onChangeText={(text) => onChangeText(text)}
        textAlign={textAlign}
        maxLength={maxlength}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  title: {
    fontFamily: "NiveauGroteskMedium",
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
});
