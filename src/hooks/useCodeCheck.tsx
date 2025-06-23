import { Challenge, TestResult } from "@/types/challenges";
import { useEffect, useState } from "react";

// 指定されたミリ秒だけ処理を待機させるヘルパー関数
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useCodeCheck = (
  currentChallenge: Challenge | undefined,
  stopTimer: () => void
) => {
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isAllPassed, setIsAllPassed] = useState(false);
  const [isRunning, setIsRunning] = useState(false); // 実行中フラグを追加

  // [変更点] runCodeを非同期関数に変更
  const runCode = async (code: string) => {
    if (!currentChallenge || isRunning) return;

    setIsRunning(true);
    setResults([]); // 結果を空の配列で初期化（nullではなく）
    setConsoleOutput([]);
    setIsAllPassed(false);

    const tempConsole: string[] = [];
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      const formattedArgs = args.map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
      );
      tempConsole.push(formattedArgs.join(" "));
    };

    try {
      const userFunction = new Function(`
        ${code}
        return ${currentChallenge.id};
      `)();

      let allPassedInLoop = true;

      // [変更点] for...ofループで1つずつテストを実行
      for (const testCase of currentChallenge.testCases) {
        let resultData: TestResult;
        try {
          const result = userFunction(...testCase.input);
          resultData = {
            input: testCase.input,
            expected: testCase.expected,
            actual: result,
            passed:
              JSON.stringify(result) === JSON.stringify(testCase.expected),
          };
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          resultData = {
            input: testCase.input,
            expected: testCase.expected,
            error: `実行時エラー: ${message}`,
            passed: false,
          };
        }

        if (!resultData.passed) {
          allPassedInLoop = false;
        }

        // [変更点] 1つ結果が出たら、状態を更新してUIに反映させる
        setResults((prevResults) => [...(prevResults || []), resultData]);

        // [演出] 0.5秒待機する
        await sleep(500);
      }

      // 全てのループが終わった後で最終結果を判定
      setIsAllPassed(allPassedInLoop);
      if (allPassedInLoop) {
        stopTimer();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setResults([{ error: `コンパイルエラー: ${message}`, passed: false }]);
    } finally {
      console.log = originalConsoleLog;
      setConsoleOutput(tempConsole);
      setIsRunning(false); // 実行完了
    }
  };

  useEffect(() => {
    if (currentChallenge) {
      setResults(null);
      setConsoleOutput([]);
      setIsAllPassed(false);
      setIsRunning(false);
    }
  }, [currentChallenge]);

  return {
    results,
    consoleOutput,
    isAllPassed,
    isRunning, // ボタンの二重クリック防止などに利用可能
    runCode,
  };
};

export default useCodeCheck;
