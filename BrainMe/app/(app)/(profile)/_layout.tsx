import { Stack } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerStyle: { backgroundColor: Colors.primary },
      }}
    />
  );
};

export default Layout;
