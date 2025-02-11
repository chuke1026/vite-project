import React, { useState, useEffect } from "react";

function PomodoroTimer() {
  const [isActive, setIsActive] = useState(false);  // タイマーが動いているかどうか
  const [isBreak, setIsBreak] = useState(false);  // 作業中か休憩中か
  const [minutes, setMinutes] = useState(25);  // 残り時間（分）
  const [seconds, setSeconds] = useState(0);  // 残り時間（秒）

  useEffect(() => {
    let interval;

    // タイマーが動いている場合
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // 作業時間が終わったら休憩モードに切り替え
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 25 : 5);  // 休憩後は25分、作業後は5分
            setSeconds(0);  // 秒をリセット
          } else {
            setMinutes(minutes - 1);  // 分を減らす
            setSeconds(59);  // 秒を59秒にセット
          }
        } else {
          setSeconds(seconds - 1);  // 秒を減らす
        }
      }, 1000);
    } else {
      // タイマーが停止している場合、インターバルをクリア
      clearInterval(interval);
    }

    return () => clearInterval(interval);  // クリーンアップ
  }, [isActive, seconds, minutes, isBreak]);  // 必要な依存関係を指定

  const startStopTimer = () => {
    setIsActive(!isActive);  // タイマーの開始/停止
  };

  const resetTimer = () => {
    setIsActive(false);  // タイマーを停止
    setMinutes(25);  // 作業時間にリセット
    setSeconds(0);  // 秒もリセット
    setIsBreak(false);  // 作業モードにリセット
  };

  return (
    <div>
      <h2>ポモドーロタイマー</h2>
      <div>
        <p>{isBreak ? "休憩中" : "作業中"}</p>
        <p>{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
      </div>
      <div>
        <button onClick={startStopTimer}>
          {isActive ? "停止" : "開始"}
        </button>
        <button onClick={resetTimer}>リセット</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
