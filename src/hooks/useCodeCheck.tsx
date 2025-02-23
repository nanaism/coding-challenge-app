import { Challenge, TestResult } from "@/types/challenges";
import { useEffect, useState } from "react";

const useCodeCheck = (currentChallenge: Challenge | undefined) => {
  // テスト結果を状態管理
  const [results, setResults] = useState<TestResult[] | null>(null);

  // エディタ内のコードを受け取り、関数として実行
  const runCode = (code: string) => {
    if (!currentChallenge) return;

    try {
      const userFunction = new Function(`
            ${code}
            return ${currentChallenge.id};
          `)();

      const testResults = currentChallenge.testCases.map((testCase) => {
        const result = userFunction(...testCase.input);
        return {
          input: testCase.input,
          expected: testCase.expected,
          actual: result,
          passed: JSON.stringify(result) === JSON.stringify(testCase.expected),
        };
      });

      setResults(testResults);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setResults([
        {
          error: message,
          passed: false,
        },
      ]);
    }
  };

  // チャレンジを切り替えた場合、結果をリセット
  useEffect(() => {
    if (currentChallenge) {
      setResults(null);
    }
  }, [currentChallenge]);

  return {
    results,
    runCode,
  };
};

export default useCodeCheck;
