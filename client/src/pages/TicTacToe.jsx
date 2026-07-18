import { useEffect, useState } from "react";
import GameShell from "../components/GameShell.jsx";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every((cell) => cell)) return "draw";
  return null;
}

function botMove(board) {
  const empty = board
    .map((v, i) => (v ? null : i))
    .filter((v) => v !== null);
  if (empty.length === 0) return null;
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X"); // player is X, bot is O
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const result = getWinner(board);
    if (result) {
      setWinner(result);
      return;
    }
    if (turn === "O") {
      const timeout = setTimeout(() => {
        const move = botMove(board);
        if (move === null) return;
        const next = [...board];
        next[move] = "O";
        setBoard(next);
        setTurn("X");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [board, turn]);

  function handleClick(i) {
    if (board[i] || winner || turn !== "X") return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setTurn("O");
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinner(null);
  }

  const statusText =
    winner === "draw"
      ? "It's a draw"
      : winner
      ? winner === "X"
        ? "You win!"
        : "Paper Man wins"
      : turn === "X"
      ? "Your move"
      : "Paper Man is thinking...";

  return (
    <GameShell
      youMeta={turn === "X" && !winner ? "your turn" : ""}
      oppMeta={turn === "O" && !winner ? "thinking" : ""}
      rightIcon={<span className="text-rose-400 text-lg leading-none">●</span>}
    >
      <div className="flex flex-col items-center gap-6">
        <p className="text-gray-300 text-sm">{statusText}</p>
        <div className="grid grid-cols-3 gap-1 bg-white/10 p-1 rounded">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className="w-24 h-24 sm:w-28 sm:h-28 bg-[#171a21] flex items-center justify-center hover:bg-[#1d212a] transition-colors"
            >
              {cell === "X" && (
                <span className="text-emerald-400 text-5xl font-bold">✕</span>
              )}
              {cell === "O" && (
                <span className="text-rose-400 text-5xl">
                  <span className="inline-block border-4 border-rose-400 rounded-full w-12 h-12" />
                </span>
              )}
            </button>
          ))}
        </div>
        {winner && (
          <button
            onClick={reset}
            className="px-5 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-white font-medium"
          >
            Play again
          </button>
        )}
      </div>
    </GameShell>
  );
}
