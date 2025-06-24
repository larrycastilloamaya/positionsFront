import axios from "axios";
import type { Position } from "../features/positions/types";

const API_URL = "https://positionshikru.azurewebsites.net/api/positions";

export const getAllPositions = async (): Promise<Position[]> => {
  const response = await axios.get<Position[]>(API_URL);
  return response.data;
};
