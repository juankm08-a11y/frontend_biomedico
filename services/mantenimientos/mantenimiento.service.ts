import { api } from "@/lib/api";
import { MantenimientoRequest, MantenimientoResponse } from "@/types/mantenimientos/mantenimiento.type";

export const listarMantenimientos = async (tipo?:string) : Promise<MantenimientoResponse[]> => {

    const response = await api.get("/mantenimientos/",{
        params: {tipo}
    })

    return response.data
}

export const crearMantenimiento = async (data: MantenimientoRequest): Promise<MantenimientoResponse> => {
    
    const response = await api.post("/mantenimientos/", data);
  
    return response.data;
}


export const actualizarMantenimiento = async (idMantenimiento:number,data:MantenimientoRequest): Promise<MantenimientoResponse> => {

    const response = await api.put(`/mantenimientos/${idMantenimiento}/`,data)
    
    return response.data
}

export const aprobarMantenimiento = async (idMantenimiento:number, usuario:number) => {

    const response = await api.patch(`/mantenimientos/${idMantenimiento}/aprobar/`,{
        aprobado_por:usuario
    })

    return response.data
}

export const supervisarMantenimiento = async (idMantenimiento:number) => {
    
    const response = await api.patch(`/mantenimientos/${idMantenimiento}/aprobar`)

    return response.data
}