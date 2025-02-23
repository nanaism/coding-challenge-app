type ChallengeId = "sum" | "arraySum" | "fizzBuzz";

// 各チャレンジの引数・戻り値の型を定義
interface ChallengeFunctions {
  sum: (a: number, b: number) => number;
  arraySum: (arr: number[]) => number;
  fizzBuzz: (num: number) => (string | number)[];
}

// TestCaseの型を各チャレンジごとに定義
type ChallengeTestCase<T extends ChallengeId> = {
  input: Parameters<ChallengeFunctions[T]>;
  expected: ReturnType<ChallengeFunctions[T]>;
};

// Challengeの型
interface ChallengeBase<T extends ChallengeId> {
  id: T;
  title: string;
  description: string;
  template: string;
  testCases: ChallengeTestCase<T>[];
  hint: string;
}

// テスト結果の型
type TestResultBase<T extends ChallengeId> = {
  input?: Parameters<ChallengeFunctions[T]>;
  expected?: ReturnType<ChallengeFunctions[T]>;
  actual?: ReturnType<ChallengeFunctions[T]>;
  passed: boolean;
  error?: string;
};

// 利用しやすい形で型をエクスポート
export type Challenge = ChallengeBase<ChallengeId>;
export type TestResult = TestResultBase<ChallengeId>;
