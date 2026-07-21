import { useEffect, useMemo, useRef, useState } from "react";
import { Chess as ChessJs } from "chess.js";
import GameShell from "../components/GameShell.jsx";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

const PIECE_UNICODE = {
  p: "♟",
  n: "♞",
  b: "♝",
  r: "♜",
  q: "♛",
  k: "♚",
  P: "♙",
  N: "♘",
  B: "♗",
  R: "♖",
  Q: "♕",
  K: "♔",
};

function squareName(row, col) {
  // row 0 = rank 8 (top), col 0 = file a
  return `${FILES[col]}${8 - row}`;
}

export default function Chess() {
  const gameRef = useRef(new ChessJs());
  const [, forceRender] = useState(0);
  const [selected, setSelected] = useState(null); // square string, e.g. "e2"
  const [legalTargets, setLegalTargets] = useState([]);
  const [status, setStatus] = useState("");

  const game = gameRef.current;

  const board = useMemo(() => game.board(), [game, selected]);

  function refresh() {
    forceRender((n) => n + 1);
  }

  function updateStatus() {
    if (game.isCheckmate()) {
      setStatus(game.turn() === "w" ? "Black wins by checkmate" : "White wins by checkmate");
    } else if (game.isDraw()) {
      setStatus("Draw");
    } else if (game.isCheck()) {
      setStatus("Check!");
    } else {
      setStatus("");
    }
  }

  function botMove() {
    const moves = game.moves();
    if (moves.length === 0) return;
    const move = moves[Math.floor(Math.random() * moves.length)];
    game.move(move);
    refresh();
    updateStatus();
  }

  useEffect(() => {
    if (game.turn() === "b" && !game.isGameOver()) {
      const timeout = setTimeout(botMove, 600);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  function handleSquareClick(row, col) {
    if (game.turn() !== "w" || game.isGameOver()) return;
    const sq = squareName(row, col);

    if (selected) {
      if (legalTargets.includes(sq)) {
        game.move({ from: selected, to: sq, promotion: "q" });
        setSelected(null);
        setLegalTargets([]);
        refresh();
        updateStatus();
        return;
      }
      // clicking another own piece re-selects
      const piece = game.get(sq);
      if (piece && piece.color === "w") {
        const moves = game.moves({ square: sq, verbose: true });
        setSelected(sq);
        setLegalTargets(moves.map((m) => m.to));
      } else {
        setSelected(null);
        setLegalTargets([]);
      }
      return;
    }

    const piece = game.get(sq);
    if (piece && piece.color === "w") {
      const moves = game.moves({ square: sq, verbose: true });
      setSelected(sq);
      setLegalTargets(moves.map((m) => m.to));
    }
  }

  function reset() {
    gameRef.current = new ChessJs();
    setSelected(null);
    setLegalTargets([]);
    setStatus("");
    refresh();
  }

  const statusText =
    status ||
    (game.turn() === "w" ? "Your move" : "Paper Man is thinking...");

  return (
    <GameShell
      youMeta={game.turn() === "w" && !game.isGameOver() ? statusText : ""}
      oppMeta={game.turn() === "b" && !game.isGameOver() ? "thinking" : ""}
      rightIcon={<span className="text-lg leading-none">♞</span>}
    >
      <div className="flex flex-col items-center gap-4">
        <p className="text-gray-300 text-sm">{statusText}</p>
        <div className="inline-block border border-white/10">
          {board.map((rowArr, row) => (
            <div key={row} className="flex">
              {rowArr.map((cell, col) => {
                const sq = squareName(row, col);
                const isDark = (row + col) % 2 === 1;
                const isSelected = selected === sq;
                const isTarget = legalTargets.includes(sq);
                return (
                  <button
                    key={sq}
                    onClick={() => handleSquareClick(row, col)}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-3xl select-none
                      ${isDark ? "bg-[#5c6b82]" : "bg-[#c8d0dc]"}
                      ${isSelected ? "outline outline-2 outline-emerald-400" : ""}
                    `}
                  >
                    {isTarget && (
                      <span className="absolute w-3 h-3 rounded-full bg-emerald-500/70" />
                    )}
                    {cell && (
                      <span
                        className={
                          cell.color === "w" ? "text-white" : "text-gray-900"
                        }
                        style={{
                          textShadow:
                            cell.color === "w"
                              ? "0 0 2px rgba(0,0,0,0.6)"
                              : "none",
                        }}
                      >
                        {PIECE_UNICODE[cell.type.toUpperCase()] &&
                          (cell.color === "w"
                            ? PIECE_UNICODE[cell.type.toUpperCase()]
                            : PIECE_UNICODE[cell.type])}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {game.isGameOver() && (
          <button
            onClick={reset}
            className="px-5 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-white font-medium"
          >
            New game
          </button>
        )}
      </div>
    </GameShell>
  );
}
