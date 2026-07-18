import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-gray-500">This page doesn't exist.</p>
      <Link
        to="/"
        className="text-sky-500 font-medium hover:underline"
      >
        Back to home
      </Link>
    </div>
  );
}
