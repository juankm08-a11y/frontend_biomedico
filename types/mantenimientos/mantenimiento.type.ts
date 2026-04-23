export type TipoMantenimiento =
    | "preventivo"
    | "correctivo"
    | "calibracion"
    | "falla"
    | "sistema"

export type EstadoMantenimiento = 
    | "pendiente"
    | "aprobado"
    | "supervisado"
    | "ejecutado"



export interface MantenimientoRequest {

    equipo:number

    tipo: TipoMantenimiento

    fechaInicio:string

    fechaFin:string 

    estado: EstadoMantenimiento

    responsable:number 
}

export interface MantenimientoResponse {

    idMantenimiento:number 

    equipo:number 

    tipo: TipoMantenimiento

    fechaInicio: string 

    fechaFin: string 

    estado: EstadoMantenimiento

    responsable:number
}




