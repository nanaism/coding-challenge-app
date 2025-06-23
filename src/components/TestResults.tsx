import { cn } from "@/lib/utils"; // shadcn/uiのutils。なければclsxなどでも可
import { TestResult } from "@/types/challenges";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, Clock, X } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/card";

interface TestResultsProps {
  results: TestResult[] | null;
  consoleOutput: string[];
  formattedTime: string;
  isAllPassed: boolean;
}

const TestResults = ({
  results,
  consoleOutput,
  formattedTime,
  isAllPassed,
}: TestResultsProps) => {
  const [activeTab, setActiveTab] = useState<"results" | "console">("results");

  const totalTests = results?.length || 0;
  const passedTests = results?.filter((r) => r && r.passed).length || 0;

  return (
    <div className="flex flex-col h-full bg-background p-4 pt-0">
      {/* ヘッダー: タブ切り替えとタイマー */}
      <div className="flex justify-between items-center py-4 border-b flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab("results")}
            className={cn(
              "text-lg transition-colors",
              activeTab === "results"
                ? "font-bold text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            実行結果
          </button>
          <button
            onClick={() => setActiveTab("console")}
            className={cn(
              "text-lg transition-colors",
              activeTab === "console"
                ? "font-bold text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            コンソール
          </button>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span className="font-mono text-lg">{formattedTime}</span>
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="flex-grow overflow-y-auto pt-4">
        {/* 「実行結果」タブ */}
        {activeTab === "results" && (
          <AnimatePresence>
            {!results && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center text-muted-foreground"
              >
                コードを実行して結果を確認しましょう。
              </motion.div>
            )}
            {results && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {/* 合格状況サマリー */}
                <div
                  className={`p-3 mb-2 text-center rounded-lg font-medium text-sm ${
                    isAllPassed
                      ? "bg-green-100 text-green-800"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {isAllPassed
                    ? "🎉 全てのテストに合格しました！ 🎉"
                    : `テスト結果: ${passedTests} / ${totalTests} 合格`}
                </div>

                {/* 各テストケースの結果 */}
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`p-3 text-sm ${
                        result.error
                          ? "bg-red-50 border-red-200 text-red-900"
                          : result.passed
                          ? "bg-green-50 border-green-200 text-green-900"
                          : "bg-red-50 border-red-200 text-red-900"
                      }`}
                    >
                      {result.error ? (
                        <div className="flex items-center gap-2 font-medium">
                          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                          <span>{result.error}</span>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3 font-mono">
                          <div className="mt-0.5">
                            {result.passed ? (
                              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="overflow-x-auto">
                            <p>
                              <span className="font-semibold text-gray-500">
                                入力:
                              </span>{" "}
                              {JSON.stringify(result.input)}
                            </p>
                            <p>
                              <span className="font-semibold text-gray-500">
                                期待値:
                              </span>{" "}
                              {JSON.stringify(result.expected)}
                            </p>
                            {!result.passed && (
                              <p className="font-semibold">
                                <span className="text-gray-500">実際の値:</span>{" "}
                                {JSON.stringify(result.actual)}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* 「コンソール」タブ */}
        {activeTab === "console" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-900 text-gray-200 rounded-lg h-full"
          >
            <pre className="p-4 text-sm font-mono h-full overflow-y-auto">
              {consoleOutput.length > 0 ? (
                consoleOutput.join("\n")
              ) : (
                <span className="text-gray-500">
                  コンソール出力はありません。コード内で console.log()
                  を使用してください。
                </span>
              )}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TestResults;
