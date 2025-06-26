import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPositionById } from "../../../api/positions";
import { getAllRecruiters } from "../../../api/recruiters";
import { getAllDepartments } from "../../../api/departments";
import type { Position } from "../types";

export default function PositionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState<Position | null>(null);
  const [recruiterName, setRecruiterName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const pos = await getPositionById(id);
        setPosition(pos);

        const recruiters = await getAllRecruiters();
        const recruiter = recruiters.find(r => r.id === pos.recruiter_Id);
        setRecruiterName(recruiter?.full_Name ?? "");

        const departments = await getAllDepartments();
        const dept = departments.find(d => d.id === pos.department_Id);
        setDepartmentName(dept?.name ?? "");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-sm">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (!position) {
    return <p className="text-center mt-10 text-gray-500">No se encontró la posición.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        
        {/* Botón de regresar */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm mb-4 text-indigo-600 hover:underline flex items-center"
        >
          <span className="mr-1 text-lg">←</span> Regresar
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">{position.title}</h1>

        <div className="space-y-4 text-gray-700 text-base">
          <p><span className="font-semibold">Descripción:</span> {position.description}</p>
          <p><span className="font-semibold">Ubicación:</span> {position.location}</p>
          <p><span className="font-semibold">Estado:</span> {position.status}</p>
          <p><span className="font-semibold">Reclutador:</span> {recruiterName}</p>
          <p><span className="font-semibold">Departamento:</span> {departmentName}</p>
          <p><span className="font-semibold">Presupuesto:</span> ${position.budget}</p>
          <p><span className="font-semibold">Fecha de cierre:</span> {position.closing_Date ?? "N/A"}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center sm:text-left">Historial</h2>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6 border-t pt-4 text-sm text-gray-600">
            <div className="flex-1">
              <div className="text-xs uppercase text-gray-400 mb-1">Creado</div>
              <div>{new Date(position.created_At).toLocaleString()}</div>
            </div>
            <div className="flex-1 sm:border-l border-gray-200 sm:pl-6">
              <div className="text-xs uppercase text-gray-400 mb-1">Modificado</div>
              <div>{new Date(position.updated_At).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
