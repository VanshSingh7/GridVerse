import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TicTacToe from "./pages/TicTacToe.jsx";
import ConnectFour from "./pages/ConnectFour.jsx";
import SequenceMemory from "./pages/SequenceMemory.jsx";
import VisualMemory from "./pages/VisualMemory.jsx";
import Chess from "./pages/Chess.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/games/connect-four" element={<ConnectFour />} />
        <Route path="/games/sequence-memory" element={<SequenceMemory />} />
        <Route path="/games/visual-memory" element={<VisualMemory />} />
        <Route path="/games/chess" element={<Chess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}