export interface Position {
  id: string;
  title: string;
  description: string;
  location: string;
  status: "draft" | "open" | "closed" | "archived";
  recruiter_Id: string;
  department_Id: string;
  budget: number;
  closing_Date: string | null;
  created_At: string;
  updated_At: string;
}

export interface PositionCreateDto {
  title: string;
  description: string;
  location: string;
  status: "draft" | "open" | "closed" | "archived";
  recruiter_Id: string;
  department_Id: string;
  budget: number;
  closing_Date: string | null;
}

export type PositionStatus = "draft" | "open" | "closed" | "archived";
