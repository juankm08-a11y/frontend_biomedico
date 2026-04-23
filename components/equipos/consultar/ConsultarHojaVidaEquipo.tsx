"use client"
import PageContainer from "@/components/ui/layout/PageContainer";
import { eliminarEquipo, obtenerEquipo } from "@/services/equipos/equipo.service";
import {  useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    idEquipo:number
}
export default function ConsultarHojavVidaEquipo({idEquipo}:Props) {

    const router = useRouter()

    const [equipo,setEquipo] = useState<any>(null)

    useEffect(() => {
        if(!idEquipo)  return

        obtenerEquipo(Number(idEquipo))
        .then((data) => setEquipo(data))

    },[idEquipo])

    const handleEliminar = async () => {
        const confirmar = window.confirm(
            "¿Deseas eliminar esta hoja de vida?"
        )
        if (!confirmar) return 

        await eliminarEquipo(Number(idEquipo))

        router.push("/dashboard")
    }
    const Cell = ({children}:{children:any}) => (
        <div className="border border-gray-400 p-2">
            {children}
        </div>
    )

    if (!equipo) return <p>Cargando hoja de vida...</p>


    return (
        <PageContainer>
            <div className="w-full border shadow-lg bg-white">
                <div className="grid grid-cols-3 border-b">
                    <div className="col-span-2 p-4 font-bold text-lg">
                        HOJA DE VIDA DEL EQUIPO BIOMÉDICO
                    </div>
                </div>
                <div className="bg-gray-100 border-b p-2 font-semibold text-sm">
                    INFORMACIÓN TÉCNICA
                </div>
                <div className="grid grid-cols-5">
                    <Cell>
                       <strong>Nombre del Equipo:</strong>
                       <p>
                        {equipo.nombre}
                       </p>
                       <strong>Número de Placa:</strong>
                       <p>
                        {equipo.placa ?? "No registrada"}
                       </p>
                       <strong>Serie:</strong>
                       <p>
                        {equipo.serie}
                       </p>
                       <strong>Marca:</strong>
                       <p>
                        {equipo.marca_nombre}
                       </p>
                       <strong>Modelo:</strong>
                       <p>
                        {equipo.modelo_nombre}
                       </p>
                        <strong>Tecnología:</strong>
                       <p>
                        {equipo.tecnologia_nombre}
                       </p>
                        <strong>Fabricante:</strong>
                       <p>
                        {equipo.fabricante_nombre}
                       </p>
                        <strong>Ubicación:</strong>
                       <p>
                        {equipo.ubicacion_nombre}
                       </p>
                    </Cell>
                </div>
                <div className="p-4 flex gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2" onClick={() => router.push(`/equipos/editar/${idEquipo}`)}>
                        Editar hoja de vida
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2" onClick={handleEliminar}>
                        Eliminar hoja de vida
                    </button>
                </div>
            </div>
        </PageContainer>
    )
}