export interface Department {
  id: string;
  name: string;
}

export async function getAllDepartments(): Promise<Department[]> {
  const res = await fetch("https://positionshikru.azurewebsites.net/api/departments");
  if (!res.ok) throw new Error("Error al obtener departamentos");
  return await res.json();
}
