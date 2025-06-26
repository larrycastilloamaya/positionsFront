import axios from "axios";
import type { Position } from "../features/positions/types";
import type { PositionCreateDto } from "../features/positions/types";

const API_URL = "https://positionshikru.azurewebsites.net/api/positions";

export const getAllPositions = async (): Promise<Position[]> => {
  const response = await axios.get<Position[]>(API_URL);
  return response.data;
};

export const createPosition = async (position: PositionCreateDto): Promise<void> => {
  await axios.post(API_URL, position);
};

export const deletePosition = async (id: string): Promise<string> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data?.message || "Posición eliminada correctamente.";
};