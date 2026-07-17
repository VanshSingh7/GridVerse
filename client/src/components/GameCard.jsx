import { Link } from "react-router-dom";

export default function GameCard({ to, icon, title, description, isNew }) {
  return (
    <Link
      to={to}
      className="relative bg-white rounded-md shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
    >
      {isNew && (
        <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
          New
        </span>
      )}
      <div className="text-sky-400">{icon}</div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}
