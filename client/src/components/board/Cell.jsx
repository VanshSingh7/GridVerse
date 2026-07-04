function Cell({ value }) {
  return (
    <button
      className="w-24 h-24 border border-gray-600 flex items-center justify-center
                 text-4xl font-bold text-white hover:bg-gray-800 transition"
    >
      {value}
    </button>
  )
}

export default Cell