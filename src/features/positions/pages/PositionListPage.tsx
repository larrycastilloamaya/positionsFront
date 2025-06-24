import { useEffect, useState } from "react";
import { getAllPositions } from "../../../api/positions";
import type { Position } from "../types";


export default function PositionTablePage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPositions()
      .then(setPositions)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Listado de posiciones</h1>

        {loading ? (
          <div className="text-center text-gray-600">Cargando...</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full border-collapse text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Título</th>
                  <th className="px-4 py-3">Descripción</th>
                  <th className="px-4 py-3">Ubicación</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Presupuesto</th>
                  <th className="px-4 py-3">Cierre</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos) => (
                  <tr key={pos.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-900">{pos.title}</td>
                    <td className="px-4 py-3 text-gray-700">{pos.description}</td>
                    <td className="px-4 py-3">{pos.location}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pos.status === "open"
                            ? "bg-green-100 text-green-800"
                            : pos.status === "closed"
                            ? "bg-red-100 text-red-800"
                            : pos.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {pos.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">${pos.budget}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {pos.closing_Date
                        ? new Date(pos.closing_Date).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}