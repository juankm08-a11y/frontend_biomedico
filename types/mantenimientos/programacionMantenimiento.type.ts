export type UnidadFrecuencia =
    | "dias"
    | "meses"
    | "anios"

export interface ProgramacionMantenimientoRequest {

    equipo_id: number 

    unidad_frecuencia: UnidadFrecuencia

    frecuencia_mantenimiento: number 

    frecuencia_calibracion: number 

   
}

export interface ProgramacionMantenimientoResponse {

    idProgramacion: number 

    equipo_id: number 

    mantenimiento: number 

    unidad_frecuencia: UnidadFrecuencia

    frecuencia_mantenimiento: number 

    frecuencia_calibracion: number 

    proximo_mantenimiento: string 

    proximo_calibracion: string 
}