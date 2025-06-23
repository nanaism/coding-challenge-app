import { Challenge } from "../types/challenges";

// 今回使用する3種類のコーディング問題
export const challenges: Challenge[] = [
  {
    id: "sum",
    title: "合計値を求める",
    description: "与えられた2つの数値を合計する関数 sum を実装してください。",
    template: `function sum(a, b) {
  // ここにコードを書いてください
}`,
    testCases: [
      { input: [1, 2], expected: 3 },
      { input: [5, 3], expected: 8 },
      { input: [-1, 1], expected: 0 },
    ],
    hint: "return 文を使って結果を返すことを忘れずに！",
    difficulty: "Easy", // 追加
  },
  {
    id: "arraySum",
    title: "配列の総和を求める",
    description: "配列の要素の合計を計算する関数 arraySum を実装してください。",
    template: `function arraySum(arr) {
  // ここにコードを書いてください
}`,
    testCases: [
      { input: [[1, 2, 3]], expected: 6 },
      { input: [[5, -3, 2]], expected: 4 },
      { input: [[]], expected: 0 },
    ],
    hint: "reduce メソッドを使うと簡単に実装できます！",
    difficulty: "Easy", // 追加
  },
  {
    id: "fizzBuzz",
    title: "FizzBuzz 問題",
    description:
      "1 から指定された数までの FizzBuzz 配列を返す関数 fizzBuzz を実装してください。\nFizzBuzz 配列とは、3 の倍数で「Fizz」、5 の倍数で「Buzz」、両方の倍数で「FizzBuzz」、それ以外はそのまま数値を出力します。",
    template: `function fizzBuzz(num) {
  // ここにコードを書いてください
}`,
    testCases: [
      { input: [5], expected: [1, 2, "Fizz", 4, "Buzz"] },
      { input: [3], expected: [1, 2, "Fizz"] },
      {
        input: [15],
        expected: [
          1,
          2,
          "Fizz",
          4,
          "Buzz",
          "Fizz",
          7,
          8,
          "Fizz",
          "Buzz",
          11,
          "Fizz",
          13,
          14,
          "FizzBuzz",
        ],
      },
    ],
    hint: "3の倍数でFizz、5の倍数でBuzz、両方の倍数でFizzBuzzを出力します。",
    difficulty: "Medium", // 追加
  },
];
