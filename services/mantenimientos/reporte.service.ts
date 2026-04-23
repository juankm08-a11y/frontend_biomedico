import { api } from "@/lib/api";
import { ReporteSistema, ReporteSistemaRequest } from "@/types/mantenimientos/reporte.type";

export const consultarReporteSistema = async (): Promise<ReporteSistema> => {
    
    const response = await api.get("/reportes/generar-reporte")

    return response.data
}

export const generarReporte = async (

    data: ReporteSistemaRequest 
): Promise<any> => {

    const formData = new FormData()

    formData.append("mantenimiento",data.mantenimiento.toString())

    formData.append("nombre",data.nombre)

    formData.append("tipo",data.tipo)

    if (data.descripcion) 
        formData.append("descripcion",data.descripcion)

    if (data.falla)
        formData.append("falla",data.falla)

    if (data.archivo)
        formData.append("archivo",data.archivo)

    if (!data.mantenimiento || data.mantenimiento == 0){
        alert("Seleccione un mantenimiento")
        return 
    } 
    
    const response = await api.post(
        "/reportes/",
        formData,
        {
            headers: {
                "Content-Type":"multipart/form-data"
            }
        }
    )

    return response.data
}