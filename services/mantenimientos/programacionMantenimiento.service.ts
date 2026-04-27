import { api } from "@/lib/api";
import { ProgramacionMantenimientoRequest, ProgramacionMantenimientoResponse } from "@/types/mantenimientos/programacionMantenimiento.type";

export const crearProgramacion = async (
    data:ProgramacionMantenimientoRequest
): Promise<ProgramacionMantenimientoResponse> => {

    const payload = {
        equipo_id:data.equipo_id,
        unidad_frecuencia: data.unidad_frecuencia,
        frecuencia_mantenimiento:data.frecuencia_mantenimiento,
        frecuencia_calibracion:data.frecuencia_calibracion
    }

  
    const response = await api.post("/programaciones/", payload);
    return response.data;
}


export const listarProgramaciones = async () : Promise<ProgramacionMantenimientoResponse[]> => {
    const response = await api.get("/programaciones/");

    const data = response.data.results || response.data 

    return data.map((p:any) => ({
        idProgramacion: p.idProgramacion ?? p.id,

        equipo_id: p.equipo_id ?? p.equipo,

        unidad_frecuencia: p.unidad_frecuencia,
        frecuencia_mantenimiento:p.frecuencia_mantenimiento,
        frecuencia_calibracion: p.frecuencia_calibracion,

        proximo_mantenimiento: p.proximo_mantenimiento,
        proximo_calibracion: p.proximo_calibracion
    }))
}

export const consultarProgramacion = async (idProgramacion:number) : Promise<ProgramacionMantenimientoResponse> => {

    const response = await api.get(`/programaciones/${idProgramacion}/`)

    const p = response.data;

    return {
        idProgramacion: p.idProgramacion ?? p.id,

        mantenimiento: p.mantenimiento,

        equipo_id: p.equipo_id ?? p.equipo,

        unidad_frecuencia: p.unidad_frecuencia,
        frecuencia_mantenimiento: p.frecuencia_mantenimiento,
        frecuencia_calibracion: p.frecuencia_calibracion,

        proximo_mantenimiento: p.proximo_mantenimiento,
        proximo_calibracion: p.proximo_calibracion
    }
}

export const eliminarProgramacion = async (idProgramacion:number) => {

    const response = await api.delete(`/programaciones/${idProgramacion}/`)

    return response.data
}