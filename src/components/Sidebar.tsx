import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4 font-bold text-xl border-b">Hikru</div>
      <nav className="p-4 space-y-2">
        <Link to="/" className="block text-gray-700 hover:text-blue-600">
          📋 Posiciones
        </Link>
        {/* Agrega más enlaces aquí */}
      </nav>
    </aside>
  );
}
