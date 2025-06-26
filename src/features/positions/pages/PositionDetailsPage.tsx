import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPositionById } from "../../../api/positions";
import { getAllRecruiters } from "../../../api/recruiters";
import { getAllDepartments } from "../../../api/departments";
import type { Position } from "../types";

export default function PositionDetailsPage() {
  const { id } = useParams();
  const [position, setPosition] = useState<Position | null>(null);
  const [recruiterName, setRecruiterName] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const pos = await getPositionById(id);
      setPosition(pos);

      const recruiters = await getAllRecruiters();
      const recruiter = recruiters.find(r => r.id === pos.recruiter_Id);
      setRecruiterName(recruiter?.full_Name ?? "");

      const departments = await getAllDepartments();
      const dept = departments.find(d => d.id === pos.department_Id);
      setDepartmentName(dept?.name ?? "");
    };

    fetchData();
  }, [id]);

  if (!position) return <p>Cargando datos...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{position.title}</h1>
      <p><strong>Descripción:</strong> {position.description}</p>
      <p><strong>Ubicación:</strong> {position.location}</p>
      <p><strong>Status:</strong> {position.status}</p>
      <p><strong>Reclutador:</strong> {recruiterName}</p>
      <p><strong>Departamento:</strong> {departmentName}</p>
      <p><strong>Presupuesto:</strong> ${position.budget}</p>
      <p><strong>Fecha de cierre:</strong> {position.closing_Date ?? "N/A"}</p>

      <hr className="my-4" />

      <h2 className="text-xl font-semibold">Historial</h2>
      <p><strong>Creado:</strong> {new Date(position.created_At).toLocaleString()}</p>
      <p><strong>Última modificación:</strong> {new Date(position.updated_At).toLocaleString()}</p>
    </div>
  );
}
