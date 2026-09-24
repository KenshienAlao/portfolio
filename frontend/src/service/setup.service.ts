import api from "@/lib/api";
import { ApiResponse } from "@/lib/ApiResponse";

export interface SetupItem {
  id: number;
  categoryId?: number;
  value: string;
  download: string;
  imageLight: string;
  imageDark?: string;
  subValue?: string;
  subDownload?: string;
}

export interface SetupCategory {
  id: number;
  category: string;
  description: string;
  items: SetupItem[];
}

export type Setup = SetupCategory;

export const setupService = {
  getPublic: async (): Promise<ApiResponse<SetupCategory[]>> => {
    const res = await api.get("/api/setup");
    return res.data;
  },

  getAdmin: async (): Promise<ApiResponse<SetupCategory[]>> => {
    const res = await api.get("/api/setup/admin");
    return res.data;
  },

  addCategory: async (data: { category: string; description: string }): Promise<ApiResponse<SetupCategory>> => {
    const res = await api.post("/api/setup/admin/category", data);
    return res.data;
  },

  editCategory: async (
    categoryId: number,
    data: { category: string; description: string },
  ): Promise<ApiResponse<SetupCategory>> => {
    const res = await api.patch(`/api/setup/admin/category/${categoryId}`, data);
    return res.data;
  },

  deleteCategory: async (categoryId: number): Promise<ApiResponse<void>> => {
    const res = await api.delete(`/api/setup/admin/category/${categoryId}`);
    return res.data;
  },

  addItem: async (data: FormData): Promise<ApiResponse<SetupItem>> => {
    const res = await api.post("/api/setup/admin/item", data);
    return res.data;
  },

  editItem: async (itemId: number, data: FormData): Promise<ApiResponse<SetupItem>> => {
    data.delete("id");
    const res = await api.patch(`/api/setup/admin/item/${itemId}`, data);
    return res.data;
  },

  deleteItem: async (itemId: number): Promise<ApiResponse<void>> => {
    const res = await api.delete(`/api/setup/admin/item/${itemId}`);
    return res.data;
  },
};
