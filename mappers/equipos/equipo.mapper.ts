import { EquipoRequest, EquipoResponse } from "@/types/equipos/equipo.type";

export function equipoToForm(data? : Partial<EquipoResponse>):EquipoRequest {
    return {
        nombre: data?.nombre ?? "",
        marca: data?.marca ?? 0,
        modelo: data?.modelo ?? 0,
        serie: data?.serie ?? "",
        placa: data?.placa ?? "",
        tipo_tecnologia: data?.tipo_tecnologia ?? "",
        ubicacion: data?.ubicacion ?? 0,
    }
}