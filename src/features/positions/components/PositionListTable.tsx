import type { Position } from "../types";

interface Props {
  positions: Position[];
  onEdit: (pos: Position) => void;
  onDelete: (pos: Position) => void;
}

export default function PositionListTable({ positions, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-collapse text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Ubicación</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Presupuesto</th>
            <th className="px-4 py-3">Cierre</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => (
            <tr key={pos.id} className="border-b hover:bg-gray-50 transition">
              <td className="px-4 py-3 font-medium text-gray-900">{pos.title}</td>
              <td className="px-4 py-3 text-gray-700">{pos.description}</td>
              <td className="px-4 py-3 text-gray-700">{pos.location}</td>
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
              <td className="px-4 py-3 text-center whitespace-nowrap">
                <div className="flex justify-center gap-3 text-lg">
                  <button
                    className="hover:text-blue-600"
                    onClick={() => alert(`Ver: ${pos.title}`)}
                    title="Ver"
                  >
                    🔍
                  </button>
                  <button
                    className="hover:text-yellow-600"
                    onClick={() => onEdit(pos)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="hover:text-red-600"
                    onClick={() => onDelete(pos)}
                    title="Eliminar"
                  >
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {positions.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No se encontraron resultados.
        </div>
      )}
    </div>
  );
}
