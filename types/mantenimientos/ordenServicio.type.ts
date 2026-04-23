export type EstadoOrden = 
    | "pendiente"
    | "aprobada"
    | "ejecutada"
    | "supervisada"
    
export interface OrdenServicioRequest {

    mantenimiento:number 

    tipoServicio: string 

    descripcion: string 

    estado: EstadoOrden
}

export interface OrdenServicioResponse {

    idOrden: number 

    mantenimiento: number 

    tipoServicio: string 

    descripcion: string 

    fechaInicio: string 

    fechaFin: string 

    estado: EstadoOrden
}