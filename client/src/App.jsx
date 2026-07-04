import Board from './components/board/Board'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-cyan-400">Gridverse — Tic Tac Toe</h1>
      <Board />
    </div>
  )
}

export default App