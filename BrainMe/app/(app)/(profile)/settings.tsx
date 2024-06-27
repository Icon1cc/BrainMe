import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";

export default function Settings() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24 }}>Settings</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
