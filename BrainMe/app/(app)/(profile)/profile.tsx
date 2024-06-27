import React from "react";

// Backend.
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// This is the structure of the profile screen.
import { Structure } from "@/components/profile/structure";

import Grid from "@/components/profile/grid";
import Friends from "@/components/profile/friends";

export default function Profile() {
  const myUser = useQuery(api.user.myUser);

  return (
    <Structure title={myUser?.username!}>
      <Grid
        ranking={myUser!.ranking}
        gamesPlayed={myUser!.gamesPlayed}
        points={myUser!.points}
        completionRate={myUser!.completionRate}
        correctAnswers={myUser!.correctAnswers}
        wrongAnswers={myUser!.wrongAnswers}
      />
      <Friends number={3} />
    </Structure>
  );
}
