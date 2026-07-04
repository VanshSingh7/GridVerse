import Cell from './Cell'

function Board() {
  // static placeholder board just to see the layout
  const board = ['X', null, 'O', null, 'X', null, null, null, 'O']

  return (
    <div className="grid grid-cols-3 gap-1 bg-gray-700 p-1 rounded">
      {board.map((cell, index) => (
        <Cell key={index} value={cell} />
      ))}
    </div>
  )
}

export default Board