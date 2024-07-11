import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";

interface AccountDetailsProps {
  name: string;
  familyName: string;
}

export default function AccountDetails(props: AccountDetailsProps) {
  return (
    <View style={{ gap: 17 }}>
      <Text style={{ fontFamily: "NiveauGroteskMedium", fontSize: 24 }}>
        Account Details
      </Text>
      <View style={styles.container}>
        <Link
          href={{
            pathname: "/(app)/(profile)/accounts/name",
            params: { param: props.name },
          }}
          asChild
        >
          <Pressable style={styles.row}>
            <Text style={{ flex: 1, fontSize: 16 }}>Name</Text>
            <Text style={{ fontSize: 16 }}>{props.name}</Text>
            <Ionicons name="chevron-forward" size={16} color="black" />
          </Pressable>
        </Link>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }} />
        <Link
          href={{
            pathname: "/(app)/(profile)/accounts/family-name",
            params: { param: props.familyName },
          }}
          asChild
        >
          <Pressable style={styles.row}>
            <Text style={{ flex: 1, fontSize: 16 }}>Family Name</Text>
            <Text style={{ fontSize: 16 }}>{props.familyName}</Text>
            <Ionicons name="chevron-forward" size={16} color="black" />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 17,
    borderRadius: 12,
  },
  row: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
