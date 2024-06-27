import { useLocalSearchParams } from "expo-router";
import React from "react";

import { Structure } from "@/components/profile/structure";

import Grid from "@/components/profile/grid";
import Options from "@/components/profile/options";

export default function OtherUser() {
  const { profile } = useLocalSearchParams<{ profile: string }>();
  return (
    <Structure>
      <Grid />
      <Options onPressMessage={() => {}} onPressFollow={() => {}} isFriend />
    </Structure>
  );
}
