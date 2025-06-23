import { Card } from "@/components/ui/card";
import { BookText, Terminal } from "lucide-react"; // アイコンを変更して視認性を向上
import { challenges } from "../data/challenges";

interface HomeSectionProps {
  onChallengeSelect: (id: string) => void;
}

const HomeSection = ({ onChallengeSelect }: HomeSectionProps) => {
  return (
    // レイアウトを上下に分割し、下のリストだけがスクロールするように変更
    <div className="grid grid-rows-[auto_1fr] border-r overflow-hidden h-screen">
      {/* --- ヘッダーセクション --- */}
      <div className="p-6 pl-12 space-y-8 flex-shrink-0">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary flex items-center">
          <Terminal className="h-5 w-5 mr-2" />
          Customizable for study
        </p>
        <h1 className="text-6xl font-sans font-bold tracking-tighter">
          Coding Challenge
        </h1>
        <p className="text-muted-foreground max-w-lg">
          プログラミング学習のための、コーディングチャレンジアプリです。
          <br />
          JavaScript のコーディング問題に、挑戦しましょう🔥
        </p>
      </div>

      {/* --- チャレンジリストセクション --- */}
      <div className="space-y-4 border-t pt-8 p-6 pl-12 overflow-y-auto">
        <div className="flex items-center space-x-3 mb-4">
          <div className="border bg-card p-3 rounded-full flex justify-center items-center">
            <BookText className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">本日のスキルチェック</h3>
        </div>
        <div className="space-y-3">
          {challenges.map((challenge, index) => (
            <Card
              key={challenge.id}
              // [修正点] bg-slate-100 を削除し、テーマに追従するデフォルトのCardスタイルを適用
              // hover時のスタイルもテーマ変数を利用するaccentカラーに変更し、操作のフィードバックを明確化
              className="p-4 cursor-pointer hover:bg-accent hover:border-primary transition-all duration-200"
              onClick={() => onChallengeSelect(challenge.id)}
            >
              {/* テキストの色がCardのデフォルト(text-card-foreground)になり、背景とのコントラストが確保される */}
              <span className="font-medium text-base">
                {index + 1}. {challenge.title}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
