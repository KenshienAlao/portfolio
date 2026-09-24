import api from "@/lib/api";
import { ApiResponse } from "@/lib/ApiResponse";

export interface TLogin {
  code: string;
  password: string;
}

export const AuthService = {
  login: async (data: TLogin): Promise<ApiResponse> => {
    const res = await api.post("/api/auth/login", data);
    return res.data;
  },
};
