import { useEffect, useState } from "react";
import { getAllPositions, createPosition } from "../../../api/positions";
import { getAllRecruiters, type Recruiter } from "../../../api/recruiters";
import { getAllDepartments, type Department } from "../../../api/departments";
import type { Position, PositionStatus } from "../types";
import Swal from "sweetalert2";
import { deletePosition } from "../../../api/positions";

export default function PositionTablePage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const statusOptions: PositionStatus[] = ["draft", "open", "closed", "archived"];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [submitting, setSubmitting] = useState(false);
const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    getAllPositions().then(setPositions).finally(() => setLoading(false));
    getAllRecruiters().then(setRecruiters);
    getAllDepartments().then(setDepartments);
  }, []);

  const filteredPositions = positions.filter((pos) => {
    const matchesText = `${pos.title} ${pos.description} ${pos.location}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = status === "all" || pos.status === status;
    const matchesBudget =
      (!minBudget || pos.budget >= parseFloat(minBudget)) &&
      (!maxBudget || pos.budget <= parseFloat(maxBudget));
    return matchesText && matchesStatus && matchesBudget;
  });

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    status: "draft" as PositionStatus,
    budget: "",
    recruiterId: "",
    departmentId: "",
    closing_Date: "",
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Listado de posiciones</h1>

        {/* Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por título, descripción o ubicación..."
            className="col-span-1 sm:col-span-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Presupuesto min"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
            />
            <input
              type="number"
              placeholder="Presupuesto max"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            + Agregar posición
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Cargando...</div>
        ) : (
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
                {filteredPositions.map((pos) => (
                  <tr key={pos.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-900">{pos.title}</td>
                    <td className="px-4 py-3 text-gray-700">{pos.description}</td>
                    <td className="px-4 py-3 text-gray-700">{pos.location}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pos.status === "open"
                          ? "bg-green-100 text-green-800"
                          : pos.status === "closed"
                          ? "bg-red-100 text-red-800"
                          : pos.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-200 text-gray-800"
                      }`}>
                        {pos.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">${pos.budget}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {pos.closing_Date ? new Date(pos.closing_Date).toLocaleDateString() : "N/A"}
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
                            onClick={() => alert(`Editar: ${pos.title}`)}
                            title="Editar"
                          >
                            ✏️
                          </button>
                            <button
                              className="hover:text-red-600"
                              onClick={async () => {
                                const confirm = await Swal.fire({
                                  title: "¿Estás seguro?",
                                  text: `Esta acción eliminará la posición: ${pos.title}`,
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#d33",
                                  cancelButtonColor: "#aaa",
                                  confirmButtonText: "Sí, eliminar",
                                  cancelButtonText: "Cancelar",
                                });

                                if (confirm.isConfirmed) {
                                  try {
                                    const message = await deletePosition(pos.id);
                                    Swal.fire({
                                      icon: "success",
                                      title: "Eliminado",
                                      text: message,
                                      timer: 3000,
                                      showConfirmButton: false,
                                    });

                                    setTimeout(() => {
                                      getAllPositions().then(setPositions);
                                    }, 3000);
                                  } catch (err) {
                                    Swal.fire({
                                      icon: "error",
                                      title: "Error",
                                      text: "No se pudo eliminar la posición.",
                                      timer: 3000,
                                      showConfirmButton: false,
                                    });
                                  }
                                }
                              }}
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
            {filteredPositions.length === 0 && (
              <div className="text-center text-gray-500 mt-4">No se encontraron resultados.</div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start sm:items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative mt-8 sm:mt-0 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-500">Agregar nueva posición</h2>

            <div className="grid gap-4">
              <input type="text" placeholder="Título" className="border rounded-md px-3 py-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <textarea placeholder="Descripción" className="border rounded-md px-3 py-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <input type="text" placeholder="Ubicación" className="border rounded-md px-3 py-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <select className="border rounded-md px-3 py-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PositionStatus })}>
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                ))}
              </select>
              <input type="number" placeholder="Presupuesto" className="border rounded-md px-3 py-2" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
              <select className="w-full px-3 py-2 border rounded-md" value={form.recruiterId} onChange={(e) => setForm({ ...form, recruiterId: e.target.value })}>
                <option value="">Seleccione un reclutador</option>
                {recruiters.map((r) => (
                  <option key={r.id} value={r.id}>{r.full_Name}</option>
                ))}
              </select>
              <select className="w-full px-3 py-2 border rounded-md" value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })}>
                <option value="">Seleccione un departamento</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <input type="date" placeholder="Fecha de cierre" className="border rounded-md px-3 py-2" value={form.closing_Date} onChange={(e) => setForm({ ...form, closing_Date: e.target.value })} />
            </div>

            <div className="mt-6 flex justify-end gap-2">
          {successMessage && (
            <div className="mt-4 text-green-600 font-medium text-sm">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 text-red-600 font-medium text-sm">
              {errorMessage}
            </div>
          )}

              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancelar</button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60"
                disabled={submitting}
                onClick={async () => {
                  setSubmitting(true);
                  setSuccessMessage("");
                  setErrorMessage("");

                  try {
                    await createPosition({
                      title: form.title,
                      description: form.description,
                      location: form.location,
                      status: form.status,
                      budget: parseFloat(form.budget),
                      recruiterId: form.recruiterId,
                      departmentId: form.departmentId,
                      closing_Date: form.closing_Date
                        ? new Date(form.closing_Date).toISOString()
                        : null,
                    });

                    setSuccessMessage("✅ Posición agregada correctamente.");
                    setForm({
                      title: "",
                      description: "",
                      location: "",
                      status: "draft",
                      budget: "",
                      recruiterId: "",
                      departmentId: "",
                      closing_Date: "",
                    });
                    // Espera 3 segundos antes de cerrar el modal
                      setTimeout(() => {
                        setShowModal(false);
                        setSuccessMessage("");
                      }, 2000);
                    await getAllPositions().then(setPositions);
     
                  } catch (err) {
                    setErrorMessage("❌ Error al agregar la posición.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? "Agregando..." : "Agregar"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
