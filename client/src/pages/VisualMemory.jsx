import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

const START_LIVES = 3;

// grid size and number of tiles to reveal per level
function gridSizeForLevel(level) {
  if (level <= 2) return 3; // 3x3
  if (level <= 6) return 4; // 4x4
  if (level <= 11) return 5; // 5x5
  return 6; // 6x6
}

function tilesToRevealForLevel(level) {
  return Math.min(2 + level, gridSizeForLevel(level) ** 2 - 1);
}

function pickTiles(total, count) {
  const all = Array.from({ length: total }, (_, i) => i);
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return new Set(all.slice(0, count));
}

export default function VisualMemory() {
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(START_LIVES);
  const [target, setTarget] = useState(new Set());
  const [picked, setPicked] = useState(new Set());
  const [phase, setPhase] = useState("show"); // show | input | gameover
  const size = gridSizeForLevel(level);
  const total = size * size;

  const startLevel = useCallback((lvl) => {
    const s = gridSizeForLevel(lvl);
    const count = tilesToRevealForLevel(lvl);
    setTarget(pickTiles(s * s, count));
    setPicked(new Set());
    setPhase("show");
  }, []);

  useEffect(() => {
    startLevel(1);
  }, [startLevel]);

  useEffect(() => {
    if (phase !== "show") return;
    const timeout = setTimeout(() => setPhase("input"), 1500);
    return () => clearTimeout(timeout);
  }, [phase, target]);

  function handleTileClick(i) {
    if (phase !== "input") return;
    if (picked.has(i)) return;

    if (target.has(i)) {
      const nextPicked = new Set(picked).add(i);
      setPicked(nextPicked);
      if (nextPicked.size === target.size) {
        const nextLevel = level + 1;
        setTimeout(() => {
          setLevel(nextLevel);
          startLevel(nextLevel);
        }, 400);
        setPhase("cleared");
      }
    } else {
      const remainingLives = lives - 1;
      setLives(remainingLives);
      const nextPicked = new Set(picked).add(i);
      setPicked(nextPicked);
      if (remainingLives <= 0) {
        setPhase("gameover");
      }
    }
  }

  function reset() {
    setLevel(1);
    setLives(START_LIVES);
    startLevel(1);
  }

  return (
    <div className="min-h-screen bg-sky-500 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
        <div className="flex items-center gap-4 text-white text-xl">
          <span>
            Level <span className="font-semibold">{level}</span>
          </span>
          <span className="flex items-center gap-1">
            Lives{" "}
            {Array.from({ length: START_LIVES }).map((_, i) => (
              <span key={i} className={i < lives ? "" : "opacity-30"}>
                ♥
              </span>
            ))}
          </span>
        </div>

        {phase === "gameover" && (
          <p className="text-white font-semibold">
            Game over — you reached level {level}
          </p>
        )}

        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0,1fr))` }}
        >
          {Array.from({ length: total }).map((_, i) => {
            const isTarget = target.has(i);
            const isPicked = picked.has(i);
            let bg = "bg-sky-600";
            if (phase === "show" && isTarget) bg = "bg-white/90";
            else if (phase === "input" && isPicked)
              bg = isTarget ? "bg-white/90" : "bg-rose-500";
            else if (phase === "cleared" && isTarget) bg = "bg-white/90";

            return (
              <button
                key={i}
                onClick={() => handleTileClick(i)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-md transition-colors duration-150 ${bg} hover:brightness-110`}
              />
            );
          })}
        </div>

        {phase === "gameover" && (
          <button
            onClick={reset}
            className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold px-6 py-2.5 rounded shadow"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
