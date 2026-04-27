import { api } from "@/lib/api";
import { OrdenServicioRequest, OrdenServicioResponse } from "@/types/mantenimientos/ordenServicio.type";

export const listarOrdenes = async (): Promise<OrdenServicioResponse[]> => {

    const response = await api.get("/ordenes-servicio/")
    const data = response.data.results || response.data 

    return data.map((o:any) => ({
        idOrden: o.idOrden ?? o.id,

        mantenimiento: o.mantenimiento_id ?? o.mantenimiento,

        tipoServicio: o.tipo_servicio,
        descripcion: o.descripcion,

        fechaInicio: o.fecha_inicio,
        fechaFin: o.fecha_fin,

        estado: o.estado
    }))
}

export const crearOrden = async (data:OrdenServicioRequest): Promise<OrdenServicioResponse> => {

    const payload = {
        mantenimiento_id:data.mantenimiento,
        tipo_servicio:data.tipoServicio,
        descripcion:data.descripcion,
        estado:data.estado
    }

    const response = await api.post("/ordenes-servicio/",payload)

    return response.data
}

export const consultarOrden = async (idOrden:number): Promise<OrdenServicioResponse> => {

    const response = await api.get(`/ordenes-servicio/${idOrden}/`)
    const o = response.data 

    return {
        idOrden: o.idOrden ?? o.id,

        mantenimiento: o.mantenimiento_id ?? o.mantenimiento,

        tipoServicio: o.tipo_servicio,
        descripcion: o.descripcion,

        fechaInicio: o.fecha_inicio,
        fechaFin: o.fecha_fin,

        estado: o.estado
    }
}

export const cerrarOrden = async (idOrden:number) => {

    const response = await api.patch(`/ordenes-servicio/${idOrden}/cerrar`)

    return response.data
}