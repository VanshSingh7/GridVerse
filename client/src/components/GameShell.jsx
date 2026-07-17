import { useNavigate } from "react-router-dom";

/**
 * Shared shell for board-based games (Tic-Tac-Toe, Connect 4, Chess).
 * Mirrors the dark match layout: top bar with both players + a symbol/score
 * on the right, board in the center, chat panel on the right, and a
 * resign/settings bar at the bottom.
 */
export default function GameShell({
  youLabel = "MasterMind",
  youIcon,
  youMeta,
  oppLabel = "Paper Man",
  oppIcon,
  oppMeta,
  rightIcon,
  rightScore = "1000",
  onResign,
  children,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#14161c]">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold">
            1
          </span>
          {youIcon}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">{youLabel}</span>
            <span className="text-xs text-emerald-400">{youMeta}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
            🦉
          </div>
          <div className="flex flex-col items-center px-1 text-gray-500 text-xs">
            <span>0</span>
            <span>0</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
            🤖
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{oppLabel}</span>
            <span className="text-xs text-gray-400">{oppMeta}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {rightIcon}
          <span className="font-bold text-sm">{rightScore}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        <div className="flex-1 flex items-center justify-center p-6">
          {children}
        </div>

        {/* Chat panel placeholder */}
        <div className="hidden md:flex w-80 border-l border-white/10 bg-[#14161c] flex-col items-center justify-center gap-3 text-gray-600">
          <svg viewBox="0 0 24 24" className="w-16 h-16 opacity-40" fill="currentColor">
            <path d="M4 4h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9l-5 4V4Z" />
          </svg>
          <div className="mt-auto w-full p-4 border-t border-white/10 flex items-center gap-2">
            <input
              disabled
              placeholder="Write a message..."
              className="flex-1 bg-[#1b1e26] rounded-full px-4 py-2 text-sm placeholder-gray-500 outline-none"
            />
            <button className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-white/10 bg-[#14161c]">
        <button
          onClick={onResign ?? (() => navigate("/"))}
          className="px-4 py-1.5 rounded bg-[#1b1e26] hover:bg-[#232733] text-sm font-medium"
        >
          Resign
        </button>
        <button className="w-8 h-8 rounded bg-[#1b1e26] hover:bg-[#232733] flex items-center justify-center">
          ⚙️
        </button>
      </div>
    </div>
  );
}
