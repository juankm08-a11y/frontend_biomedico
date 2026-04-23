
export interface ReporteSistemaRequest {

    mantenimiento: number 

    nombre: string 

    descripcion?: string 

    tipo: string 

    falla?: string 

    archivo?: File | null
}

export interface ReporteSistema {

    totalEquipos: number

    totalMantenimientos: number 

    mantenimientosPendientes: number 

    ordenesEjecutadas: number 
}