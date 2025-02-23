import ChallengeDetail from "./components/ChallengeDetail";
import { CodeEditor } from "./components/CodeEditor";
import HomeSection from "./components/Home";
import useChallengeSelection from "./hooks/useChallengeSelection";
import useCodeCheck from "./hooks/useCodeCheck";

export default function App() {
  const { setCurrentChallengeId, currentChallenge } = useChallengeSelection();
  const { results, runCode } = useCodeCheck(currentChallenge);

  return (
    <div className="min-h-screen grid grid-cols-2">
      {currentChallenge ? (
        <ChallengeDetail
          challenge={currentChallenge}
          results={results}
          onBack={() => setCurrentChallengeId(null)}
        />
      ) : (
        <HomeSection onChallengeSelect={setCurrentChallengeId} />
      )}
      <CodeEditor currentChallenge={currentChallenge} onRun={runCode} />
    </div>
  );
}
