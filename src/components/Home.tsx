import { Card } from "@/components/ui/card";
import { Terminal } from "lucide-react";
import { challenges } from "../data/challenges";

interface HomeSectionProps {
  onChallengeSelect: (id: string) => void;
}

const HomeSection = ({ onChallengeSelect }: HomeSectionProps) => {
  return (
    <div className="grid grid-rows-2 border-r p-6 pl-12 overflow-y-auto">
      <div className="space-y-8 pt-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500 flex">
          <Terminal className="h-5 w-5" />
          Customizable for study
        </p>
        <h1 className="text-5xl font-bold">Coding Challenge App</h1>
        <p className="text-gray-700">
          プログラミング学習のための、コーディングチャレンジアプリです。
          <br />
          JavaScript のコーディング問題に、挑戦しましょう🔥
        </p>
      </div>
      <div className="space-y-4 border-t -mt-8 pt-8">
        <div className="flex items-center space-x-2">
          <div className="border border-gray-300 text-3xl h-16 w-16 rounded-full flex justify-center items-center">
            📃
          </div>
          <h3 className="text-xl">本日のスキルチェック</h3>
        </div>
        <div className="p-4 pl-0 space-y-4">
          {challenges.map((challenge, index) => (
            <Card
              key={challenge.id}
              className="p-6 bg-slate-100 hover:bg-slate-200 cursor-pointer"
              onClick={() => onChallengeSelect(challenge.id)}
            >
              {index + 1}. {challenge.title}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
