export interface Recruiter {
  id: string;
  full_Name: string;
  email: string;
  phone: string | null;
}

export async function getAllRecruiters(): Promise<Recruiter[]> {
  const res = await fetch("https://positionshikru.azurewebsites.net/api/recruiters");
  if (!res.ok) throw new Error("Error al obtener reclutadores");
  return await res.json();
}
