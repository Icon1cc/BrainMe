import { View, StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import ImageViewer from "@/components/image-viewer";

interface ProfilePicProps {
  selectedImage: string;
  setSelectedImage: (image: string) => void;
}

export default function ProfilePic({
  selectedImage,
  setSelectedImage,
}: ProfilePicProps) {
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
      <ImageViewer size={90} selectedImage={selectedImage} />
      <View style={styles.icon}>
        <Pressable onPress={pickImageAsync}>
          <Ionicons name="camera-reverse-outline" size={20} color="black" />
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
