import { Challenge, TestResult } from "@/types/challenges";
import { ChevronLeft } from "lucide-react";
import { Card } from "./ui/card";

type ChallengeDetailProps = {
  challenge: Challenge;
  results: TestResult[] | null;
  onBack: () => void;
};

const ChallengeDetail = (props: ChallengeDetailProps) => {
  return (
    <div className="grid grid-rows-2 border-r p-6 pl-12 overflow-y-auto">
      <div className="space-y-8 pt-16">
        <p
          className="text-sm tracking-wide flex hover:underline cursor-pointer"
          onClick={props.onBack}
        >
          <ChevronLeft className="h-5 w-5" />
          戻る
        </p>
        <h2 className="text-4xl font-bold flex items-center">
          <div className="border border-gray-300 text-3xl mr-4 h-16 w-16 rounded-full flex justify-center items-center">
            ⚔️
          </div>
          {props.challenge.title}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {props.challenge.description}
        </p>
        <Card className="mt-4 p-4 bg-blue-50 border-blue-200">
          <details>
            <summary className="text-sm text-blue-800 hover:underline">
              ヒント:
            </summary>
            <ul className="list-disc list-inside text-sm text-blue-700 p-2 pb-0">
              <li>{props.challenge.hint}</li>
            </ul>
          </details>
        </Card>
      </div>
      {/* TestResults */}
    </div>
  );
};

export default ChallengeDetail;
