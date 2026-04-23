import { api } from "@/lib/api";
import { OrdenServicioRequest, OrdenServicioResponse } from "@/types/mantenimientos/ordenServicio.type";

export const listarOrdenes = async (): Promise<OrdenServicioResponse[]> => {

    const response = await api.get("/ordenes-servicio/")

    return response.data
}

export const crearOrden = async (data:OrdenServicioRequest): Promise<OrdenServicioResponse> => {

    const response = await api.post("/ordenes-servicio/",data)

    return response.data
}

export const consultarOrden = async (idOrden:number): Promise<OrdenServicioResponse> => {

    const response = await api.get(`/ordenes-servicio/${idOrden}/`)

    return response.data
}

export const cerrarOrden = async (idOrden:number) => {

    const response = await api.patch(`/ordenes-servicio/${idOrden}/`)

    return response.data
}