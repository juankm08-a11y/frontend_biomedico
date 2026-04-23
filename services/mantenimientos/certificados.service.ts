import { api } from "@/lib/api";
import { CertificadoMetrologicoRequest, CertificadoMetrologicoResponse } from "@/types/mantenimientos/certificadoMetrologico.type";

export const crearCertificado = async (
    data:CertificadoMetrologicoRequest
): Promise<CertificadoMetrologicoResponse> => {

    const response = await api.post("/certificados/",data)

    return response.data
}

export const listarCertificados = async () : Promise<CertificadoMetrologicoResponse[]> => {
    const response = await api.get("/certificados/")

    return response.data
}

export const consultarCertificado = async (
    idCertificado:number
): Promise<CertificadoMetrologicoResponse> => {
    
    const response = await api.get(`/certificados/${idCertificado}/`)

    return response.data
}