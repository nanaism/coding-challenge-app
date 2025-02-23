import { TestResult } from "@/types/challenges";
import { Check, X } from "lucide-react";
import { Card } from "./ui/card";

const TestResults = ({ results }: { results: TestResult[] | null }) => {
  return (
    <div className="border-t px-4">
      <h3 className="text-xl py-4">👀 実行結果</h3>
      {results && (
        <div className="space-y-2">
          {results.map((result, index) => (
            <Card
              key={index}
              className={`p-3 ${
                result.error
                  ? "bg-red-50 border border-red-200"
                  : result.passed
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {result.error ? (
                <div className="flex items-center gap-2 text-red-800">
                  <X className="h-5 w-5" />
                  <span>エラー: {result.error}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {result.passed ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p>入力: {JSON.stringify(result.input)}</p>
                    <p>期待値: {JSON.stringify(result.expected)}</p>
                    {!result.passed && (
                      <p className="text-red-600">
                        実際の値: {JSON.stringify(result.actual)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestResults;
