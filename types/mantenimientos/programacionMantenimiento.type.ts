export type UnidadFrecuencia =
    | "dias"
    | "meses"
    | "anios"

export interface ProgramacionMantenimientoRequest {

    equipo: number 

    unidadFrecuencia: UnidadFrecuencia

    frecuenciaMantenimiento: number 

    frecuenciaCalibracion: number 

   
}

export interface ProgramacionMantenimientoResponse {

    idProgramacion: number 

    equipo: number 

    mantenimiento: number 

    unidadFrecuencia: UnidadFrecuencia

    frecuenciaMantenimiento: number 

    frecuenciaCalibracion: number 

    proximoMantenimiento: string 

    proximoCalibracion: string 
}