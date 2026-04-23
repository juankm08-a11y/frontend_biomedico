
export interface ReporteSistemaRequest {

    equipo?: number 

    nombre: string 

    descripcion?: string 

    tipo: string 

    falla?: string 

    archivo?: File | null
}

export interface ReporteSistema {

    totalEquipos: number

    totalMantenimientos: number 

    mantenimientosPendiente: number 

    ordenesEjecutadas: number 
}