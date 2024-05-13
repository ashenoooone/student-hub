import { cn } from "@/shared/utils";
import React from "react";
import { Compliment } from "./compliment";
import { UserRatingMapper, UserType } from "@/entities/user/model/types";

type ProfileComplimentsProps = {
  className?: string;
  profile: UserType;
};

export const ProfileCompliments = React.memo(
  (props: ProfileComplimentsProps) => {
    const { className, profile } = props;
    return (
      <div className={cn("grid grid-cols-2 grid-rows-2 gap-2", className)}>
        <Compliment
          icon={"🤝"}
          text={UserRatingMapper.politeness}
          count={profile.ratings.politeness}
        />
        <Compliment
          icon={"✨"}
          text={UserRatingMapper.creativity}
          count={profile.ratings.creativity}
        />
        <Compliment
          icon={"📚"}
          text={UserRatingMapper.learningAbility}
          count={profile.ratings.learningAbility}
        />
        <Compliment
          icon={"🌷"}
          text={UserRatingMapper.responsibility}
          count={profile.ratings.responsibility}
        />
      </div>
    );
  }
);

ProfileCompliments.displayName = "ProfileCompliments";
