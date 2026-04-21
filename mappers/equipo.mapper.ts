import { EquipoRequest, EquipoResponse } from "@/types/Equipo.type";

export function equipoToForm(data? : Partial<EquipoResponse>):EquipoRequest {
    return {
        nombre: data?.nombre ?? "",
        marca: data?.marca ?? 0,
        modelo: data?.modelo ?? 0,
        serie: data?.serie ?? "",
        fabricante: data?.fabricante ?? 0,
        tipoTecnologia: data?.tipoTecnologia ?? 0,
        ubicacion: data?.ubicacion ?? 0,
    }
}