import { Challenge, TestResult } from "@/types/challenges";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import TestResults from "./TestResults";
import { Badge } from "./ui/badge"; // shadcn/uiのBadgeコンポーネントを想定

type ChallengeDetailProps = {
  challenge: Challenge;
  results: TestResult[] | null;
  consoleOutput: string[];
  formattedTime: string;
  isAllPassed: boolean;
  onBack: () => void;
};

const ChallengeDetail = ({
  challenge,
  results,
  consoleOutput,
  formattedTime,
  isAllPassed,
  onBack,
}: ChallengeDetailProps) => {
  return (
    // チャレンジが切り替わる際にアニメーションが実行されるように、keyとmotion.divを設定
    <motion.div
      key={challenge.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      // 画面全体を使い、レイアウトを2つの行（問題詳細、実行結果）に分割
      className="flex flex-col h-screen"
    >
      {/* --- 問題詳細エリア --- */}
      {/* このエリアがコンテンツ量に応じてスクロールするように設定 */}
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* 戻るボタン */}
          <button
            className="text-sm tracking-wide flex items-center text-muted-foreground hover:text-foreground transition-colors"
            onClick={onBack}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            チャレンジ一覧に戻る
          </button>

          {/* タイトルと難易度バッジ */}
          <div className="flex justify-between items-start">
            <h2 className="text-4xl font-bold tracking-tight">
              {challenge.title}
            </h2>
            <Badge
              variant={
                challenge.difficulty === "Easy"
                  ? "default"
                  : challenge.difficulty === "Medium"
                  ? "secondary"
                  : "destructive"
              }
              className="mt-1"
            >
              {challenge.difficulty}
            </Badge>
          </div>

          {/* 問題説明 */}
          {/* proseクラスで見やすい文章スタイルを適用 */}
          <div className="prose max-w-none text-muted-foreground leading-relaxed">
            <p>{challenge.description}</p>
          </div>

          {/* ヒント */}
          <details className="bg-accent/30 rounded-lg p-3 cursor-pointer">
            <summary className="text-sm font-semibold hover:text-foreground transition-colors">
              ヒントを見る
            </summary>
            <div className="mt-2 pt-3 border-t border-border/50 text-sm text-foreground">
              {challenge.hint}
            </div>
          </details>
        </div>
      </div>

      {/* --- 実行結果エリア --- */}
      {/* 高さを固定し、このコンポーネントが伸縮しないようにする */}
      <div className="flex-shrink-0 h-[45vh] border-t">
        <TestResults
          results={results}
          consoleOutput={consoleOutput}
          formattedTime={formattedTime}
          isAllPassed={isAllPassed}
        />
      </div>
    </motion.div>
  );
};

export default ChallengeDetail;
