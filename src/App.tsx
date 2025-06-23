import { useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import ChallengeDetail from "./components/ChallengeDetail";
import { CodeEditor } from "./components/CodeEditor";
import HomeSection from "./components/Home";
import useChallengeSelection from "./hooks/useChallengeSelection";
import { useChallengeTimer } from "./hooks/useChallengeTimer";
import useCodeCheck from "./hooks/useCodeCheck";

export default function App() {
  const { setCurrentChallengeId, currentChallenge } = useChallengeSelection();
  const { formattedTime, startTimer, stopTimer, resetTimer } =
    useChallengeTimer();
  const { results, consoleOutput, isAllPassed, runCode } = useCodeCheck(
    currentChallenge,
    stopTimer
  );
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (currentChallenge) {
      startTimer();
    } else {
      resetTimer();
    }
  }, [currentChallenge]);

  const handleBack = () => {
    setCurrentChallengeId(null);
    resetTimer();
  };

  const handleRunCode = (code: string) => {
    if (!isAllPassed) {
      startTimer();
    }
    runCode(code);
  };

  return (
    // [変更点] ここにあった `dark` クラスを削除
    <div className="min-h-screen grid grid-cols-2 bg-background text-foreground">
      {isAllPassed && (
        <Confetti width={width} height={height} recycle={false} />
      )}
      {currentChallenge ? (
        <ChallengeDetail
          challenge={currentChallenge}
          results={results}
          consoleOutput={consoleOutput}
          formattedTime={formattedTime}
          isAllPassed={isAllPassed}
          onBack={handleBack}
        />
      ) : (
        <HomeSection onChallengeSelect={setCurrentChallengeId} />
      )}
      <CodeEditor currentChallenge={currentChallenge} onRun={handleRunCode} />
    </div>
  );
}
