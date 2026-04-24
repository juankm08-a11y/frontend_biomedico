import { api } from "@/lib/api";
import { LoginRequest, LoginResponse } from "@/types/auth/login.type";

export const iniciarSesion = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const res = await api.post("/auth/login/",data)
    return res.data
}