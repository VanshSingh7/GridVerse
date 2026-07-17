import Navbar from "../components/Navbar.jsx";
import GameCard from "../components/GameCard.jsx";
import {
  Zap,
  Grid,
  Target,
  Hash,
  ChessKnight,
  FourCircles,
} from "../components/Icons.jsx";

const games = [
  {
    to: "/games/tic-tac-toe",
    icon: <Hash className="w-10 h-10" />,
    title: "Tic-Tac-Toe",
    description: "Classic 3x3 grid battle against a friend or the bot.",
  },
  {
    to: "/games/connect-four",
    icon: <FourCircles className="w-10 h-10" />,
    title: "Connect Four",
    description: "Drop discs and connect four in a row before your opponent.",
    isNew: true,
  },
  {
    to: "/games/sequence-memory",
    icon: <Grid className="w-10 h-10" />,
    title: "Sequence Memory",
    description: "Remember an increasingly long pattern of button presses.",
  },
  {
    to: "/games/visual-memory",
    icon: <Grid className="w-10 h-10" />,
    title: "Visual Memory",
    description: "Memorize the tiles before they disappear, level by level.",
    isNew: true,
  },
  {
    to: "/games/chess",
    icon: <ChessKnight className="w-10 h-10" />,
    title: "Chess",
    description: "Full 8x8 chess with legal move validation.",
  },
  {
    to: "/games/tic-tac-toe",
    icon: <Target className="w-10 h-10" />,
    title: "Aim Trainer",
    description: "How quickly can you hit all the targets?",
    isNew: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <section className="bg-sky-500 flex flex-col items-center text-center py-20 px-6">
        <Zap className="w-16 h-16 text-white mb-4" />
        <h1 className="text-5xl font-bold text-white mb-4">GridVerse</h1>
        <p className="text-lg text-sky-50 mb-8 max-w-xl">
          Play classic grid games, test your memory, and challenge the AI —
          all in one place.
        </p>
        <a
          href="#games"
          className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold px-6 py-3 rounded shadow"
        >
          Get Started
        </a>
      </section>

      <section
        id="games"
        className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {games.map((g, i) => (
          <GameCard key={i} {...g} />
        ))}
      </section>
    </div>
  );
}
