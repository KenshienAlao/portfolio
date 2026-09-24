import api from "@/lib/api";
import { ApiResponse } from "@/lib/ApiResponse";

export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  github: string;
  demo: string | null;
  addedAt?: string;
}

export const projectService = {
  getPublic: async (): Promise<ApiResponse<Project[]>> => {
    const res = await api.get("/api/project");
    return res.data;
  },
  getAdmin: async (): Promise<ApiResponse<Project[]>> => {
    const res = await api.get("/api/project/admin");
    return res.data;
  },
  addProject: async (data: FormData): Promise<ApiResponse<Project>> => {
    const res = await api.post("/api/project/admin/add-project", data);
    return res.data;
  },
  editProject: async (
    id: number,
    data: FormData,
  ): Promise<ApiResponse<Project>> => {
    const res = await api.patch(`/api/project/admin/edit-project/${id}`, data);
    return res.data;
  },
  deleteProjectById: async (id: number): Promise<ApiResponse> => {
    const res = await api.delete(`/api/project/admin/delete-project/${id}`);
    return res.data;
  },
};
