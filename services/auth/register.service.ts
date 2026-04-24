import { api } from "@/lib/api";
import { RegisterRequest, RegisterResponse } from "@/types/auth/register.type";

export const registerUsuario = async (
    data:RegisterRequest
): Promise<RegisterResponse> => {
    const res = await api.post("/auth/register/",data)
    return res.data
}