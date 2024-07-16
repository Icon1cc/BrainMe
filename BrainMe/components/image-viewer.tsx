import { Image } from "react-native";
import React from "react";

interface ImageViewerProps {
  selectedImage?: string;
  size: number;
}

export default function ImageViewer({ selectedImage, size }: ImageViewerProps) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : require("@/assets/images/user/user.png");

  return (
    <Image
      source={imageSource}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: "white",
      }}
    />
  );
}
