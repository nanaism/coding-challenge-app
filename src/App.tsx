import ChallengeDetail from "./components/ChallengeDetail";
import { CodeEditor } from "./components/CodeEditor";
import HomeSection from "./components/Home";
import useChallengeSelection from "./hooks/useChallengeSelection";

export default function App() {
  const { setCurrentChallengeId, currentChallenge } = useChallengeSelection();

  return (
    <div className="min-h-screen grid grid-cols-2">
      {currentChallenge ? (
        <ChallengeDetail
          challenge={currentChallenge}
          results={null}
          onBack={() => setCurrentChallengeId(null)}
        />
      ) : (
        <HomeSection onChallengeSelect={setCurrentChallengeId} />
      )}
      <CodeEditor
        currentChallenge={currentChallenge}
        onRun={(code) => console.log(code)}
      />
    </div>
  );
}
