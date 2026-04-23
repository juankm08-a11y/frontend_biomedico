import { api } from "@/lib/api";
import { ProgramacionMantenimientoRequest, ProgramacionMantenimientoResponse } from "@/types/mantenimientos/programacionMantenimiento.type";

export const crearProgramacion = async (
    data:ProgramacionMantenimientoRequest
): Promise<ProgramacionMantenimientoResponse> => {

    try {
        const response = await api.post("/programaciones/",data)
    
        return response.data
    } catch (error:any) {
        console.error("ERROR BACKEND:",error.response?.data)

        throw error 
    }

}

    
export const listarProgramacion = async (idProgramacion:number) : Promise<ProgramacionMantenimientoResponse> => {

    const response = await api.get(`/programaciones/${idProgramacion}/`)

    return response.data
}

export const consultarProgramacion = async (idProgramacion:number) : Promise<ProgramacionMantenimientoResponse> => {

    const response = await api.get(`/programaciones/${idProgramacion}/`)

    return response.data
}

export const eliminarProgramacion = async (idProgramacion:number) => {

    const response = await api.delete(`/programaciones/${idProgramacion}/`)

    return response.data
}