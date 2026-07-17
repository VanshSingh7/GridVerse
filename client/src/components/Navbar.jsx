import { Link } from "react-router-dom";
import { Zap } from "./Icons.jsx";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-gray-800 tracking-wide"
        >
          <Zap className="w-5 h-5 text-gray-500" />
          GRIDVERSE
        </Link>
        <Link
          to="/"
          className="text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          DASHBOARD
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/signup"
          className="text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          SIGN UP
        </Link>
        <Link
          to="/login"
          className="text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          LOGIN
        </Link>
      </div>
    </nav>
  );
}
