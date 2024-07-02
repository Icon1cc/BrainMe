import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";

import Colors from "@/constants/Colors";

export default function PushNotifications() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={{ gap: 17 }}>
      <Text style={{ fontFamily: "NiveauGroteskMedium", fontSize: 24 }}>
        Preferences
      </Text>
      <View style={styles.container}>
        <Pressable style={styles.row}>
          <Text style={{ flex: 1, fontSize: 16 }}>Push notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#34C759" }}
            thumbColor={isEnabled ? "white" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
