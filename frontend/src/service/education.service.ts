import api from "@/lib/api";
import { ApiResponse } from "@/lib/ApiResponse";

export interface Education {
  id: number;
  school: string;
  degree: string;
  yearStart: string;
  yearEnd: string;
  description: string;
  location: string;
}

export const educationService = {
  getPublic: async (): Promise<ApiResponse<Education[]>> => {
    const res = await api.get("/api/education");
    return res.data;
  },
  getAdmin: async (): Promise<ApiResponse<Education[]>> => {
    const res = await api.get("/api/education/admin");
    return res.data;
  },

  addEducation: async (data: FormData): Promise<ApiResponse<Education>> => {
    const payload = Object.fromEntries(data.entries());
    const res = await api.post("/api/education/admin/add-education", payload);
    return res.data;
  },

  deleteEducationById: async (educationId: number): Promise<ApiResponse> => {
    const res = await api.delete(
      `/api/education/admin/delete-education/${educationId}`,
    );
    return res.data;
  },

  editEducationById: async (
    educationId: number,
    data: FormData,
  ): Promise<ApiResponse<Education>> => {
    data.delete("id");
    const payload = Object.fromEntries(data.entries());
    const res = await api.patch(
      `/api/education/admin/edit-education/${educationId}`,
      payload,
    );
    return res.data;
  },
};
