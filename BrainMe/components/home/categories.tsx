import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import Colors from "@/constants/Colors";

export default function Categories() {
  const router = useRouter();
  return (
    <View style={{ gap: 17 }}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => {
            router.push("/Math");
          }}
        >
          <Image
            source={require("@/assets/images/icons/coin.png")}
            style={{ width: 60, height: 60 }}
          />
          <Text style={styles.category}>Math</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Image
            source={require("@/assets/images/icons/coin.png")}
            style={{ width: 60, height: 60 }}
          />
          <Text style={styles.category}>Math</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.button}>
          <Image
            source={require("@/assets/images/icons/coin.png")}
            style={{ width: 60, height: 60 }}
          />
          <Text style={styles.category}>Math</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Image
            source={require("@/assets/images/icons/coin.png")}
            style={{ width: 60, height: 60 }}
          />
          <Text style={styles.category}>Math</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.button}>
          <Image
            source={require("@/assets/images/icons/coin.png")}
            style={{ width: 60, height: 60 }}
          />
          <Text style={styles.category}>Math</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Image
            source={require("@/assets/images/icons/coin.png")}
            style={{ width: 60, height: 60 }}
          />
          <Text style={styles.category}>Math</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontFamily: "NiveauGroteskBold",
  },
  button: {
    flex: 1,
    paddingVertical: 17,
    borderWidth: 1,
    borderRadius: 12,
    gap: 12,
    borderColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    fontFamily: "NiveauGroteskBold",
    color: Colors.primary,
    fontSize: 16,
  },
});
