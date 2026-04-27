"use client"
import { consultarReporteSistema, generarReporte } from "@/services/mantenimientos/reporte.service";
import { ReporteSistema } from "@/types/mantenimientos/reporte.type";
import { useEffect, useState } from "react";
import PageContainer from "../ui/layout/PageContainer";
import Card from "../ui/cards/Card";
import { MantenimientoResponse } from "@/types/mantenimientos/mantenimiento.type";
import { listarMantenimientos } from "@/services/mantenimientos/mantenimiento.service";
import PrimaryButton from "../ui/button/PrimaryButton";

export default function ConsultarReportesPage() {

    const [resumen,setResumen] = useState<ReporteSistema | null>(null)
    const [mantenimientos,setMantenimientos] = useState<MantenimientoResponse[]>([])

    const [mantenimiento,setMantenimiento] = useState<number>(0)
    const [nombre,setNombre] = useState("")
    const [tipo,setTipo] = useState("preventivo")
    const [descripcion,setDescripcion] = useState("")
    const [archivo,setArchivo] = useState<File | null>(null)

    useEffect(() => {
        consultarReporteSistema().then(setResumen)
        listarMantenimientos().then(setMantenimientos)
    },[])

    const handleSubmit = async (e:any) => {
        e.preventDefault()

        await generarReporte({
            mantenimiento,
            nombre,
            tipo,
            descripcion,
            archivo
        })

        alert("Reporte generado correctamente")
    }

    return (
        <PageContainer>
            {resumen && (
                <div className="grid-grid-cols-4 gap-4 mb-6">
                    <Card>
                        <p>Total Equipos</p>
                        <h2>
                            {resumen.totalEquipos}
                        </h2>
                    </Card>
                    <Card>
                        <p>Total Mantenimientos</p>
                        <h2>
                            {resumen.totalMantenimientos}
                        </h2>
                    </Card>
                    <Card>
                        <p>Pendientes</p>
                        <h2>
                            {resumen.mantenimientosPendientes}
                        </h2>
                    </Card>
                    <Card>
                        <p>Órdenes Ejecutadas</p>
                        <h2>
                            {resumen.ordenesEjecutadas}
                        </h2>
                    </Card>
                </div>
            )}

            <Card>
                <h3 className="text-lg font-semibold mb-4">
                    Generar Reporte
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div>
                        <label>
                            Mantenimiento
                        </label>
                        <select value={mantenimiento} onChange={(e) => setMantenimiento(Number(e.target.value))}>
                            <option value={0}>Seleccione</option>
                            {mantenimientos.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.id} - {m.tipo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label>Nombre</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="col-span-2">
                        <label>Descripción</label>
                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                    </div>
                    <div className="col-span-2">
                        <label>Archivo</label>
                        <input type="file" onChange={(e) => setArchivo(e.target.files?.[0] || null)} />
                    </div>

                    <PrimaryButton type="submit" text="Generar Reporte" />
                </form>
            </Card>
        </PageContainer>
    )


}