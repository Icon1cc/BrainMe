import React, { useEffect, useState } from "react";

// Backend.
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// This is the structure of the profile screen.
import { Structure } from "@/components/profile/structure";

import Grid from "@/components/profile/grid";
import Friends from "@/components/profile/friends";

export default function Profile() {
  const myUser = useQuery(api.user.myUser);
  console.log('myUser:', myUser);
  const myFriends = useQuery(api.user.getUserByIds, {
    userIds: myUser?.friends?.map((friend) => friend),
  });

  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    if (myFriends) {
      setFriends(myFriends.map((friend) => friend?.file!));
    }
  }, [myFriends]);
  return (
    <Structure title={myUser?.username!} placeholder={myUser?.file!}>
      <Grid
        ranking={myUser?.ranking!}
        gamesPlayed={myUser?.gamesPlayed!}
        points={myUser?.points!}
        completionRate={myUser?.completionRate!}
        correctAnswers={myUser?.correctAnswers!}
        wrongAnswers={myUser?.wrongAnswers!}
      />
      <Friends number={myUser?.friends?.length!} friends={friends} />
    </Structure>
  );
}
