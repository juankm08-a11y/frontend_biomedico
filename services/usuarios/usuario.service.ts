import { api } from "@/lib/api";
import { UsuarioResponse } from "@/types/usuarios/usuario.type";

export const consultarUsuarios = async (): Promise<UsuarioResponse[]> => {
  const response = await api.get("/usuarios/");
  console.log("RESPUESTA COMPLETA:", response.data);

  return response.data;
};
