import { Button } from "@/components/ui/button";
import useCodeEditor from "@/hooks/useCodeEditor";
import { Challenge } from "@/types/challenges";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw } from "lucide-react";
import { useEffect } from "react";

interface CodeEditorProps {
  currentChallenge: Challenge | undefined;
  onRun: (code: string) => void;
}

export const CodeEditor = ({ currentChallenge, onRun }: CodeEditorProps) => {
  const { code, setCode, handleReset } = useCodeEditor(currentChallenge);

  // Ctrl+Enterで実行するショートカット
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (currentChallenge) onRun(code);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code, onRun, currentChallenge]);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
      <Editor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
      <div className="bg-background p-2 border-t border-border flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleReset}
          className="flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </Button>
        <Button
          onClick={() => onRun(code)}
          className="bg-green-600 hover:bg-green-500 text-white px-6 flex items-center space-x-2"
          disabled={!currentChallenge}
        >
          <Play className="w-4 h-4" />
          <span>Run</span>
        </Button>
      </div>
    </div>
  );
};
