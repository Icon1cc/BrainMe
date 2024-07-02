import { View, Image, StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

export default function ProfilePic() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const placeholder = require("@/assets/images/user/smiling-woman.jpeg");
  const image = selectedImage ? { uri: selectedImage } : placeholder;

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image");
    }
  };
  return (
    <View style={{ alignSelf: "center", position: "relative" }}>
      <Image source={image} style={styles.image} />
      <View style={styles.icon}>
        <Pressable onPress={pickImageAsync}>
          <Ionicons name="camera-reverse-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  icon: {
    position: "absolute",
    bottom: -6,
    right: -6,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    padding: 5,
  },
});
