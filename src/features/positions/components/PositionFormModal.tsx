import { PositionStatus } from "../types";
import type { Department } from "../../../api/departments";
import type { Recruiter } from "../../../api/recruiters";
import Swal from "sweetalert2";

interface Props {
  form: {
    title: string;
    description: string;
    location: string;
    status: PositionStatus;
    budget: string;
    recruiterId: string;
    departmentId: string;
    closing_Date: string;
  };
  statusOptions: PositionStatus[];
  recruiters: Recruiter[];
  departments: Department[];
  submitting: boolean;
  successMessage: string;
  errorMessage: string;
  editId: string | null;
  onChange: (field: string, value: string) => void;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

export default function PositionFormModal({
  form,
  statusOptions,
  recruiters,
  departments,
  submitting,
  successMessage,
  errorMessage,
  editId,
  onChange,
  onClose,
  onSubmit,
}: Props) {
  const handleSubmit = async () => {
    try {
      await onSubmit();
      await Swal.fire({
        icon: "success",
        title: editId ? "Posición actualizada" : "Posición creada",
        text: editId ? "La posición se actualizó correctamente." : "La posición se creó correctamente.",
        timer: 3000,
        showConfirmButton: false,
      });
      onClose();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al guardar la posición.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start sm:items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative mt-8 sm:mt-0 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-500">
          {editId ? "Editar posición" : "Agregar nueva posición"}
        </h2>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Título"
            className="border rounded-md px-3 py-2"
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            className="border rounded-md px-3 py-2"
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
          <input
            type="text"
            placeholder="Ubicación"
            className="border rounded-md px-3 py-2"
            value={form.location}
            onChange={(e) => onChange("location", e.target.value)}
          />
          <select
            className="border rounded-md px-3 py-2"
            value={form.status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Presupuesto"
            className="border rounded-md px-3 py-2"
            value={form.budget}
            onChange={(e) => onChange("budget", e.target.value)}
          />
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={form.recruiterId}
            onChange={(e) => onChange("recruiterId", e.target.value)}
          >
            <option value="">Seleccione un reclutador</option>
            {recruiters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.full_Name}
              </option>
            ))}
          </select>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={form.departmentId}
            onChange={(e) => onChange("departmentId", e.target.value)}
          >
            <option value="">Seleccione un departamento</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            placeholder="Fecha de cierre"
            className="border rounded-md px-3 py-2"
            value={form.closing_Date}
            onChange={(e) => onChange("closing_Date", e.target.value)}
          />
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

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Guardando..." : editId ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
