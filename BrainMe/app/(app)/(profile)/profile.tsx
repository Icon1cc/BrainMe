import React from "react";

// Backend.
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// This is the structure of the profile screen.
import { Structure } from "@/components/profile/structure";

import Grid from "@/components/profile/grid";
import Friends from "@/components/profile/friends";

export default function Profile() {
  const user = useQuery(api.user.retrieve);
  const friends = useQuery(api.user.retrieveUserFriends);
  const statistics = useQuery(api.userstatistics.retrieve);

  return (
    <Structure title={user?.username!} placeholder={user?.file!}>
      <Grid
        ranking={0} // user?.ranking!
        games={statistics?.games!}
        points={statistics?.points!}
        level={statistics?.level!}
        correct={statistics?.correctAnswers! / statistics?.games!}
        incorrect={
          statistics?.games! - statistics?.correctAnswers! / statistics?.games!
        }
      />
      <Friends number={user?.friends?.length!} friends={friends!} />
    </Structure>
  );
}
