import { cn } from "@/lib/utils"; // shadcn/ui のユーティリティを想定
import { Terminal } from "lucide-react";
import { challenges } from "../data/challenges";

interface ChallengeListProps {
  onChallengeSelect: (id: string) => void;
  selectedChallengeId: string | undefined;
}

const ChallengeList = ({
  onChallengeSelect,
  selectedChallengeId,
}: ChallengeListProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <Terminal className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">Challenge List</h1>
      </div>
      <nav className="space-y-2 flex-1 overflow-y-auto">
        {challenges.map((challenge) => (
          <button
            key={challenge.id}
            className={cn(
              "w-full text-left p-3 rounded-lg transition-colors flex justify-between items-center",
              "hover:bg-accent hover:text-accent-foreground",
              selectedChallengeId === challenge.id &&
                "bg-primary text-primary-foreground"
            )}
            onClick={() => onChallengeSelect(challenge.id)}
          >
            <span>{challenge.title}</span>
            {/* ここで localStorage などでクリア済みか判定してアイコンを表示 */}
            {/* <CheckCircle className="h-4 w-4 text-green-400" /> */}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ChallengeList;
