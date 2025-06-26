import { useEffect, useState } from "react";
import { getAllPositions, createPosition, updatePosition, deletePosition } from "../../../api/positions";
import { getAllRecruiters, type Recruiter } from "../../../api/recruiters";
import { getAllDepartments, type Department } from "../../../api/departments";
import type { Position, PositionStatus } from "../types";
import Swal from "sweetalert2";
import PositionFilters from "../components/PositionFilters";
import PositionFormModal from "../components/PositionFormModal";
import PositionListTable from "../components/PositionListTable";
import { useNavigate } from "react-router-dom";

export default function PositionTablePage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const navigate = useNavigate();
  const statusOptions: PositionStatus[] = ["draft", "open", "closed", "archived"];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage] = useState("");
  const [errorMessage] = useState("");
  useEffect(() => {
    getAllPositions().then(setPositions).finally(() => setLoading(false));
    getAllRecruiters().then(setRecruiters);
    getAllDepartments().then(setDepartments);
  }, []);

  const filteredPositions = positions.filter((pos) => {
    const matchesText = `${pos.title} ${pos.description} ${pos.location}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "all" || pos.status === status;
    const matchesBudget = (!minBudget || pos.budget >= parseFloat(minBudget)) && (!maxBudget || pos.budget <= parseFloat(maxBudget));
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

        <PositionFilters
          search={search}
          status={status}
          minBudget={minBudget}
          maxBudget={maxBudget}
          statusOptions={statusOptions}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onMinBudgetChange={setMinBudget}
          onMaxBudgetChange={setMaxBudget}
        />
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            + Agregar posición
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Cargando recursos...</div>
        ) : (
          <PositionListTable
            positions={filteredPositions}
            onNavigate={navigate}
            onEdit={(pos) => {
              setForm({
                title: pos.title,
                description: pos.description,
                location: pos.location,
                status: pos.status as PositionStatus,
                budget: String(pos.budget),
                recruiterId: pos.recruiter_Id,
                departmentId: pos.department_Id,
                closing_Date: pos.closing_Date?.split("T")[0] ?? "",
              });
              setEditId(pos.id);
              setShowModal(true);
            }}
            onDelete={async (pos) => {
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
          />
        )}
      </div>

        {showModal && (
          <PositionFormModal
            form={form}
            statusOptions={statusOptions}
            recruiters={recruiters}
            departments={departments}
            submitting={submitting}
            successMessage={successMessage}
            errorMessage={errorMessage}
            editId={editId}
            onChange={(field, value) =>
              setForm((prev) => ({ ...prev, [field]: value }))
            }
            onClose={() => {
              setShowModal(false);
              setEditId(null);
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
            }}
            onSubmit={async () => {
              setSubmitting(true);
              try {
                const payload = {
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
                };

                if (editId) {
                  await updatePosition(editId, payload);
                } else {
                  await createPosition(payload);
                }

                await getAllPositions().then(setPositions);
              } finally {
                setSubmitting(false);
              }
            }}
          />
        )}

    </div>
  );
}
