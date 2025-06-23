import { Challenge } from "@/types/challenges";
import { useEffect, useState } from "react";

const INITIAL_CODE = `
// 左のリストからチャレンジを選択してください
// Welcome to the Coding Challenge App!
`;

const useCodeEditor = (currentChallenge: Challenge | undefined) => {
  const [code, setCode] = useState(INITIAL_CODE);

  // チャレンジが変更されたら、localStorageからコードを読み込むか、テンプレートをセットする
  useEffect(() => {
    if (currentChallenge) {
      const savedCode = localStorage.getItem(`code-${currentChallenge.id}`);
      setCode(savedCode || currentChallenge.template);
    } else {
      setCode(INITIAL_CODE);
    }
  }, [currentChallenge]);

  // コードが変更されるたびにlocalStorageに保存する
  useEffect(() => {
    if (currentChallenge && code !== currentChallenge.template) {
      localStorage.setItem(`code-${currentChallenge.id}`, code);
    }
  }, [code, currentChallenge]);

  const handleReset = () => {
    if (currentChallenge) {
      setCode(currentChallenge.template);
      // リセット時に保存したコードも削除
      localStorage.removeItem(`code-${currentChallenge.id}`);
    }
  };

  return {
    code,
    setCode,
    handleReset,
  };
};

export default useCodeEditor;
