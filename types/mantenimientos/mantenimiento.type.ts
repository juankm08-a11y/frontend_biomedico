
export type TipoMantenimiento =
  | "preventivo"
  | "correctivo"
  | "calibracion"
  | "falla"
  | "sistema"

export type EstadoMantenimiento =
  | "pendiente"
  | "en_proceso"     
  | "completado"     
  | "aprobado"
  | "supervisado"
  | "ejecutado"



export interface MantenimientoRequest {
  equipo_id: number
  tipo: TipoMantenimiento

  fecha_inicio: string 
  fecha_fin: string

  estado: EstadoMantenimiento
  responsable_id: number,

  diagnostico:string
}


export interface MantenimientoResponse {
  id: number

  equipo_id: number
  responsable_id: number

  equipo_nombre: string
  responsable_nombre: string

  tipo: TipoMantenimiento
  tipo_display: string

  estado: EstadoMantenimiento
  estado_display: string

  fechaInicio: string
  fechaFin: string,

  diagnostico:string
}