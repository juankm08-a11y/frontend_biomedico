import { api } from "@/lib/api"
import { EquipoRequest, EquipoResponse } from "@/types/equipos/equipo.type";


export const crearEquipo = async (
  data: EquipoRequest,
): Promise<EquipoResponse> => {
    try {
      const res = await api.post("/equipos/", data);
      return res.data;
    } catch (error:any) {
      console.log("Error BACKEND:",error?.response.data)
      throw error;
    }
};

export const listarEquipos = async (): Promise<EquipoResponse[]> => {
  const res = await api.get("/equipos/");
  return res.data;
};

export const obtenerEquipo = async (
  idEquipo: number,
): Promise<EquipoResponse> => {
  const res = await api.get(`/equipos/${idEquipo}/`);
  return res.data;
};

export const actualizarEquipo = async (
  idEquipo: number,
  data: EquipoRequest,
): Promise<EquipoResponse> => {
  try {
     const res = await api.put(`/equipos/${idEquipo}/`, data);
    return res.data;
  } catch (error: any) {
    console.log("RESPUESTA BACK:",error?.response.data);
    throw error;
  }
};

export const eliminarEquipo = async (idEquipo: number) => {
  const res = await api.delete(`/equipos/${idEquipo}/`);
  return res.data;
};


export const generarQR = async (equipoId:number) => {
    const res = await api.post(`/equipos/${equipoId}/generar_qr/`)
    return res.data;
}

export const obtenerQR = async (equipoId:number) => {
    const res = await api.get(`/equipos/${equipoId}/qr/`)
    return res.data
}

export const subirArchivos = async (equipoId:number,archivo:File) => {
    const formData = new FormData()

    formData.append("archivo",archivo)

    
    const res = await api.post(`/equipos/${equipoId}/adjuntar_archivo`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });
    return res.data;

} 


export const listarArchivos = async (equipoId:number) => {
    const res = await api.get(`/equipos/${equipoId}/archivos/`)
    return res.data
}