import React, { useEffect } from "react";

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
  const leaderboard = useQuery(api.leaderboard.collect, {});

  const [ranking, setRanking] = React.useState(0);

  useEffect(() => {
    if (leaderboard) {
      setRanking(
        leaderboard.findIndex((element) => element.user_id === user?._id) + 1
      );
    }
  }, [leaderboard]);

  const correctAnswers = statistics?.correctAnswers ?? 0;
  const games = statistics?.games ?? 0; // Default to 0 if undefined

  const totalQuestions = games * 5; // Each quiz has 5 questions
  const correctPercentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;
  const incorrectPercentage = 100 - correctPercentage;

  return (
    <Structure
      title={user?.username!}
      placeholder={user?.file!}
      ranking={ranking}
    >
      <Grid
        ranking={ranking!}
        games={games}
        points={statistics?.points! ?? 0}
        level={statistics?.level! ?? 0}
        correct={correctPercentage}
        incorrect={incorrectPercentage}
      />
      <Friends number={user?.friends?.length!} friends={friends!} />
    </Structure>
  );
}
