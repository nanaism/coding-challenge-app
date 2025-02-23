import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useCodeEditor from "@/hooks/useCodeEditor";
import { Challenge } from "@/types/challenges";
import { RotateCcw } from "lucide-react";

interface CodeEditorProps {
  currentChallenge: Challenge | undefined;
  onRun: (code: string) => void;
}

export const CodeEditor = ({ currentChallenge, onRun }: CodeEditorProps) => {
  const { code, setCode, handleReset } = useCodeEditor(currentChallenge);

  return (
    <div className="flex flex-col">
      <div className="bg-[#1e1e1e] flex-1">
        <div className="flex items-center space-x-2 p-4 border-b border-gray-700 bg-[#252526]">
          <span className="h-3 w-3 rounded-full bg-[#FF6B2C]" />
          <span className="h-3 w-3 rounded-full bg-[#FFD600]" />
          <span className="h-3 w-3 rounded-full bg-[#6CD076]" />
        </div>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-[calc(100%-40px)] resize-none bg-[#1e1e1e] text-gray-100 font-mono border-0 focus-visible:ring-0 rounded-none p-4"
          spellCheck={false}
        />
      </div>
      <div className="bg-[#252526] p-3 border-t border-gray-700 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleReset}
          className="text-gray-400 hover:text-gray-200 hover:bg-gray-700 flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">Reset</span>
        </Button>
        <Button
          onClick={() => onRun(code)}
          className="bg-indigo-500 hover:bg-indigo-400 text-white px-6"
          disabled={!currentChallenge}
        >
          Run Code
        </Button>
      </div>
    </div>
  );
};
