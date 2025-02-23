import { challenges } from "@/data/challenges";
import { useState } from "react";

const useChallengeSelection = () => {
  const [currentChallengeId, setCurrentChallengeId] = useState<string | null>(
    null
  );

  const currentChallenge = challenges.find((c) => c.id === currentChallengeId);

  return {
    currentChallenge,
    setCurrentChallengeId,
  };
};

export default useChallengeSelection;
