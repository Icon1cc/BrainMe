import React from "react";

// Backend.
//import { useQuery } from "convex/react";
//import { api } from "@/convex/_generated/api";

// This is the structure of the profile screen.
import { Structure } from "@/components/profile/structure";

import Grid from "@/components/profile/grid";
import Friends from "@/components/profile/friends";
import Options from "@/components/profile/options";

export default function Profile() {
  //const myUser = useQuery(api.user.myUser);
  return (
    <Structure>
      <Grid />
      <Options onPressMessage={() => {}} onPressFollow={() => {}} isFriend />
    </Structure>
  );
}
