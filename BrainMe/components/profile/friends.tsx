import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

const DATA = [
  {
    id: "1",
    name: "John",
  },
  {
    id: "2",
    name: "Jane",
  },
  {
    id: "3",
    name: "Alice",
  },
  {
    id: "4",
    name: "Bob",
  },
  {
    id: "5",
    name: "Charlie",
  },
];

interface FriendsProps {
  number: number;
}

export default function Friends({ number }: FriendsProps) {
  // For the navigation.
  const router = useRouter();
  return (
    <View style={{ gap: 5 }}>
      <Text style={styles.text}>Friends ({number})</Text>
      <View style={styles.container}>
        <FlatList
          data={DATA}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image
              source={require("@/assets/images/user/smiling-woman.jpeg")}
              style={styles.image}
            />
          )}
        />
        <Pressable
          onPress={() => {
            router.push("/(app)/(profile)/f/finder");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Find friends</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "NiveauGroteskBold",
    color: Colors.primary,
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 2,
    marginRight: -10,
  },
  button: {
    height: 40,
    width: 125,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006989",
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: "NiveauGroteskBold",
    color: "white",
    fontSize: 16,
  },
});
