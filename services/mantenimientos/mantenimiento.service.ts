import { api } from "@/lib/api";
import { MantenimientoRequest, MantenimientoResponse } from "@/types/mantenimientos/mantenimiento.type";

export const listarMantenimientos = async (tipo?:string) : Promise<MantenimientoResponse[]> => {

    const response = await api.get("/mantenimientos/",{
        params: {tipo}
    })

    const data = response.data.results || response.data 

    return data.map((m:any) => ({
        id:m.idMantenimiento || m.id,
        equipo_id:m.equipo_id,
        responsable_id:m.responsable_id,
        
        equipo_nombre: m.equipo_nombre,
        responsable_nombre: m.responsable_nombre,

        tipo: m.tipo,
        tipo_display: m.tipo_display,

        estado: m.estado,
        estado_display: m.estado_display,

        fechaInicio: m.fecha_inicio,
        fechaFin: m.fecha_fin,

        diagnostico:m.diagnostico
        
    }))
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