import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar.jsx";

const GRID_SIZE = 9; // 3x3

function randomTile(exclude) {
  let tile;
  do {
    tile = Math.floor(Math.random() * GRID_SIZE);
  } while (tile === exclude);
  return tile;
}

export default function SequenceMemory() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [litTile, setLitTile] = useState(null);
  const [userStep, setUserStep] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | showing | input | lost
  const timeouts = useRef([]);

  const clearTimers = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const playSequence = useCallback((seq) => {
    setStatus("showing");
    setUserStep(0);
    seq.forEach((tile, idx) => {
      const t1 = setTimeout(() => setLitTile(tile), idx * 700);
      const t2 = setTimeout(() => setLitTile(null), idx * 700 + 400);
      timeouts.current.push(t1, t2);
    });
    const t3 = setTimeout(() => {
      setStatus("input");
    }, seq.length * 700);
    timeouts.current.push(t3);
  }, []);

  const startLevel = useCallback(
    (lvl, prevSeq) => {
      const base = prevSeq ?? [];
      const nextSeq = [...base, randomTile(base[base.length - 1])];
      setSequence(nextSeq);
      playSequence(nextSeq);
    },
    [playSequence]
  );

  useEffect(() => {
    startLevel(1);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTileClick(i) {
    if (status !== "input") return;
    if (sequence[userStep] === i) {
      if (userStep + 1 === sequence.length) {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        setTimeout(() => startLevel(nextLevel, sequence), 500);
      } else {
        setUserStep(userStep + 1);
      }
    } else {
      clearTimers();
      setStatus("lost");
    }
  }

  function reset() {
    clearTimers();
    setLevel(1);
    startLevel(1);
  }

  return (
    <div className="min-h-screen bg-sky-500 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
        <p className="text-white/90 text-xl">
          Level: <span className="font-semibold">{level}</span>
        </p>

        {status === "lost" && (
          <p className="text-white font-semibold">
            Game over — you reached level {level}
          </p>
        )}

        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: GRID_SIZE }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleTileClick(i)}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-lg transition-colors duration-150 ${
                litTile === i ? "bg-white" : "bg-sky-600 hover:bg-sky-600/80"
              }`}
            />
          ))}
        </div>

        {status === "lost" && (
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
