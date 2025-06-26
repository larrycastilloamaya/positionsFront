import axios from "axios";
import type { Position } from "../features/positions/types";
const API_URL = "https://positionshikru.azurewebsites.net/api/positions";

export interface PositionCreateDto {
  title: string;
  description: string;
  location: string;
  status: "draft" | "open" | "closed" | "archived";
  recruiterId: string;
  departmentId: string;
  budget: number;
  closing_Date: string | null;
}


export const getAllPositions = async (): Promise<Position[]> => {
  const response = await axios.get<Position[]>(API_URL);
  return response.data;
};

export const createPosition = async (position: PositionCreateDto) => {
  const backendDto = {
    Title: position.title,
    Description: position.description,
    Location: position.location,
    Status: position.status,
    RecruiterId: position.recruiterId,
    DepartmentId: position.departmentId,
    Budget: position.budget,
    ClosingDate: position.closing_Date,
  };

  await axios.post(API_URL, backendDto);
};

export const deletePosition = async (id: string): Promise<string> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data?.message || "Posición eliminada correctamente.";
};

export const updatePosition = async (id: string, data: any) => {
  const backendDto = {
    Title: data.title,
    Description: data.description,
    Location: data.location,
    Status: data.status,
    RecruiterId: data.recruiterId,
    DepartmentId: data.departmentId,
    Budget: data.budget,
    ClosingDate: data.closing_Date,
  };

  await axios.put(`${API_URL}/${id}`, backendDto);
};

export const getPositionById = async (id: string): Promise<Position> => {
  const response = await axios.get<Position>(`${API_URL}/${id}`);
  return response.data;
};