export type EstadoMantenimiento = 
    | "pendiente"
    | "aprobada"
    | "ejecutada"
    | "supervisada"
    
export interface OrdenServicioRequest {

    mantenimiento:number 

    tipoServicio: string 

    descripcion: string 

    estado: EstadoMantenimiento
}

export interface OrdenServicioResponse {

    idOrden: number 

    mantenimiento: number 

    tipoServicio: string 

    descripcion: string 

    fechaInicio: string 

    fechaFin: string 

    estado: EstadoMantenimiento
}