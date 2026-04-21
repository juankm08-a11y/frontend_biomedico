"use client"
import ConsultarHojavVidaEquipo from "@/components/equipos/consultar/ConsultarHojaVidaEquipo";
import { useParams } from "next/navigation";

export default function ConsultarHojaVidaEquipoPage() {
    const params = useParams();
    const idParam = params.id;

    const idEquipo = Number(Array.isArray(idParam) ? idParam[0] : idParam)

    if (!idParam || isNaN(idEquipo)) {
        return <div>Cargando hoja de vida...</div>;
    } 
    return (
        <ConsultarHojavVidaEquipo idEquipo={idEquipo}/>
    )
}