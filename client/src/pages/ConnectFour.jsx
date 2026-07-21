import { useEffect, useState } from "react";
import GameShell from "../components/GameShell.jsx";

const ROWS = 6;
const COLS = 7;

function emptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function dropDisc(board, col, player) {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) {
      const next = cloneBoard(board);
      next[r][col] = player;
      return { board: next, row: r };
    }
  }
  return null;
}

function checkWinner(board) {
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c];
      if (!cell) continue;
      for (const [dr, dc] of dirs) {
        let count = 1;
        for (let k = 1; k < 4; k++) {
          const nr = r + dr * k;
          const nc = c + dc * k;
          if (
            nr >= 0 &&
            nr < ROWS &&
            nc >= 0 &&
            nc < COLS &&
            board[nr][nc] === cell
          ) {
            count++;
          } else break;
        }
        if (count >= 4) return cell;
      }
    }
  }
  if (board.every((row) => row.every((cell) => cell))) return "draw";
  return null;
}

function botColumn(board) {
  const valid = [];
  for (let c = 0; c < COLS; c++) if (!board[0][c]) valid.push(c);
  if (valid.length === 0) return null;
  return valid[Math.floor(Math.random() * valid.length)];
}

export default function ConnectFour() {
  const [board, setBoard] = useState(emptyBoard());
  const [turn, setTurn] = useState("R"); // player is Red, bot is Green
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      return;
    }
    if (turn === "G") {
      const timeout = setTimeout(() => {
        const col = botColumn(board);
        if (col === null) return;
        const res = dropDisc(board, col, "G");
        if (res) {
          setBoard(res.board);
          setTurn("R");
        }
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [board, turn]);

  function handleColClick(col) {
    if (winner || turn !== "R") return;
    const res = dropDisc(board, col, "R");
    if (res) {
      setBoard(res.board);
      setTurn("G");
    }
  }

  function reset() {
    setBoard(emptyBoard());
    setTurn("R");
    setWinner(null);
  }

  const statusText =
    winner === "draw"
      ? "It's a draw"
      : winner === "R"
      ? "You win!"
      : winner === "G"
      ? "Paper Man wins"
      : turn === "R"
      ? "Your move"
      : "Paper Man is thinking...";

  return (
    <GameShell
      youMeta={turn === "R" && !winner ? "your turn" : ""}
      oppMeta={turn === "G" && !winner ? "thinking" : ""}
      rightIcon={<span className="text-rose-400 text-lg leading-none">●</span>}
    >
      <div className="flex flex-col items-center gap-6">
        <p className="text-gray-300 text-sm">{statusText}</p>
        <div className="bg-[#1b1e26] rounded-xl p-3 inline-block">
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0,1fr))` }}
          >
            {board.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleColClick(c)}
                  disabled={!!winner}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0f1115] flex items-center justify-center"
                >
                  {cell && (
                    <span
                      className={`w-full h-full rounded-full ${
                        cell === "R" ? "bg-rose-400" : "bg-emerald-400"
                      }`}
                    />
                  )}
                </button>
              ))
            )}
          </div>
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
