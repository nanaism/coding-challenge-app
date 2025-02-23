import { Challenge } from "@/types/challenges";
import { useEffect, useState } from "react";

const INITIAL_CODE = `
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app ;)</h1>
      <CodingChallenge />
    </div>
  );
}
`;

const useCodeEditor = (currentChallenge: Challenge | undefined) => {
  const [code, setCode] = useState(INITIAL_CODE);

  useEffect(() => {
    if (currentChallenge) {
      setCode(currentChallenge.template);
    } else {
      setCode(INITIAL_CODE);
    }
  }, [currentChallenge]);

  const handleReset = () => {
    if (currentChallenge) {
      setCode(currentChallenge.template);
    }
  };

  return {
    code,
    setCode,
    handleReset,
  };
};

export default useCodeEditor;
