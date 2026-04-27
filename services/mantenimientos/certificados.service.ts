import { api } from "@/lib/api";
import { CertificadoMetrologicoRequest, CertificadoMetrologicoResponse } from "@/types/mantenimientos/certificadoMetrologico.type";

export const crearCertificado = async (
    data:CertificadoMetrologicoRequest
): Promise<CertificadoMetrologicoResponse> => {

    const payload = {
        numero_certificado: data.numeroCertificado,
        responsable: data.responsable,
        mantenimiento:data.mantenimiento
    }

    const response = await api.post("/certificados/",payload)

    return {
        idCertificado: response.data.idCertificado ?? response.data.id,
        numeroCertificado: response.data.numero_certificado,
        responsable: response.data.responsable,
        mantenimiento: response.data.mantenimiento
    }
}

export const listarCertificados = async () : Promise<CertificadoMetrologicoResponse[]> => {
    const response = await api.get("/certificados/")

    const data = response.data.results || response.data 

    return data.map((c:any) => ({
        idCertificado: c.idCertificado ?? c.id,
        numeroCertificado: c.numero_certificado,
        responsable:c.responsable,
        mantenimiento:c.mantenimiento
    }))
}

export const consultarCertificado = async (
    idCertificado:number
): Promise<CertificadoMetrologicoResponse> => {
    
    const response = await api.get(`/certificados/${idCertificado}/`)

    const c = response.data 

    return {
        idCertificado: c.idCertificado ?? c.id,
        numeroCertificado: c.numero_certificado,
        responsable: c.responsable,
        mantenimiento: c.mantenimiento
    }
}