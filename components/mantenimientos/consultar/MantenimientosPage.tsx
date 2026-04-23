"use client"

import DataTable, { Column } from "@/components/ui/table/DataTable";
import { listarMantenimientos } from "@/services/mantenimientos/mantenimiento.service";
import { MantenimientoResponse, TipoMantenimiento } from "@/types/mantenimientos/mantenimiento.type";
import { useEffect, useState } from "react";
import { EquipoResponse } from '../../../types/equipos/equipo.type';
import PrimaryButton from "@/components/ui/button/PrimaryButton";
import PageContainer from "@/components/ui/layout/PageContainer";
import Card from "@/components/ui/cards/Card";
import ButtonGrid from "@/components/ui/layout/ButtonGrid";
import { listarEquipos } from "@/services/equipos/equipo.service";
import { EstadoMantenimiento, OrdenServicioRequest, OrdenServicioResponse } from "@/types/mantenimientos/ordenServicio.type";
import { crearOrden, listarOrdenes } from "@/services/mantenimientos/ordenesServicio.service";
import { ProgramacionMantenimientoRequest, ProgramacionMantenimientoResponse, UnidadFrecuencia } from "@/types/mantenimientos/programacionMantenimiento.type";
import { consultarProgramacion, crearProgramacion } from "@/services/mantenimientos/programacionMantenimiento.service";
import { api } from "@/lib/api";
import { UsuarioResponse } from "@/types/usuarios/Usuario.type";
import { consultarUsuarios } from "@/services/usuarios/usuario.service";
import { crearCertificado } from "@/services/mantenimientos/certificados.service";

export default function MantenimientosPage({tipo}:{tipo:string}) {
    const [mantenimientos,setMantenimientos] = useState<MantenimientoResponse[]>([])
    const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState<MantenimientoResponse | null>(null)
    const [mantenimientoOrden,setMantenimientoOrden] = useState<MantenimientoResponse | null>(null)
    const [mantenimientoOrdenes,setMantenimientoOrdenes] = useState<MantenimientoResponse | null>(null)
    const [mantenimientoProgramar,setMantenimientoProgramar] = useState<MantenimientoResponse | null>(null)
    const [mantenimientoProgramaciones,setMantenimientoProgramaciones] = useState<MantenimientoResponse | null>(null)
    const [mantenimientoCertificado, setMantenimientoCertificado] = useState<MantenimientoResponse | null>(null)

    const [tipoServicio,setTipoServicio] = useState<TipoMantenimiento>("preventivo")
    const [estado,setEstado] = useState<EstadoMantenimiento>("pendiente")
    const [descripcion,setDescripcion] = useState("")

    const [equipos,setEquipos] = useState<EquipoResponse[]>([])
    const [ordenes,setOrdenes] = useState<OrdenServicioResponse[]>([])
    const [unidadFrecuencia,setUnidadFrecuencia] = useState<UnidadFrecuencia>("meses")

    const [frecuenciaMantenimiento,setFrecuenciaMantenimiento] = useState(1)
    const [frecuenciaCalibracion,setFrecuenciaCalibracion] = useState(1)

    const [numeroCertificado,setNumeroCertificado] = useState<number>(0)
    const [responsableCertificado,setResponsableCertificado] = useState<number>(0)
    
    const [programaciones,setProgramaciones] = useState<ProgramacionMantenimientoResponse[]>([])

    const [usuarios,setUsuarios] = useState<UsuarioResponse[]>([])

    useEffect(() => {

        listarMantenimientos(tipo)
        .then((data) => {
            setMantenimientos(data)
        })

        listarEquipos()
        .then(setEquipos)

    }, [tipo])

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const data = await consultarUsuarios()

                setUsuarios(data)
            } catch(error) {
                console.error("error usuarios:",error)
            }
        }
        

        cargarUsuarios()
    },[])

    const handleCrearOrden = async () => {

        if (!mantenimientoOrden) return 

        const data:OrdenServicioRequest = {
            mantenimiento:mantenimientoOrden.idMantenimiento,
            tipoServicio,
            descripcion,
            estado
        }

        await crearOrden(data)
    }

    const handleEstadoChange = (value:string) => {
        if (
            value === "pendiente" || 
            value === "aprobada" || 
            value === "supervisada" || 
            value === "ejecutada"
        ) {
            setEstado(value)
        }
    }

    useEffect(() => {
        if (!mantenimientoOrdenes) return 

        listarOrdenes().then((data) => {
            const filtradas = data.filter(
                (o) => o.mantenimiento === mantenimientoOrdenes.idMantenimiento
            )
            setOrdenes(filtradas)
        })
    }, [mantenimientoOrdenes])

    useEffect(() => {
        if (!mantenimientoProgramaciones) return 

        api.get("/programaciones/")
        .then((res) => {
            const filtradas = res.data.filter(
                (p:ProgramacionMantenimientoResponse) => 
                    p.equipo === mantenimientoProgramaciones.equipo
            )

            setProgramaciones(filtradas)
        })
    },[mantenimientoProgramaciones])

    const handleCrearProgramacion = async (e:any) => {

        e.preventDefault()

        if (!mantenimientoProgramar) return 

        const data:ProgramacionMantenimientoRequest = {
            equipo: mantenimientoProgramar.equipo,
            unidadFrecuencia,
            frecuenciaMantenimiento,
            frecuenciaCalibracion,
            
        }

        await crearProgramacion(data)
    }

    const handleCrearCertificado = async (e:any) => {

        e.preventDefault()

        if (!mantenimientoCertificado) return 

        const data = {

            numeroCertificado,
            responsable:responsableCertificado,
            mantenimiento:mantenimientoCertificado.idMantenimiento
        
        
        }
        await crearCertificado(data)
    }

    const columns: Column<MantenimientoResponse>[] = [
    {
      key: "equipo",
      label: "Equipo",
      render: (m) => {
        const equipo = equipos?.find(
          (e) => e.idEquipo === m.equipo
        )
        return equipo?.nombre?? "__"
      }
    },
    {
      key: "tipo",
      label: "Tipo",
    },
    {
      key: "estado",
      label: "Estado",
    },
    {
      key: "fechaInicio",
      label: "Fecha Inicio",
    },
    {
      key: "fechaFin",
      label: "Fecha Fin",
    },
    {
      key: "responsable",
      label: "Responsable",
    },
    {
        key:"actions",
        label:"Acciones",
        render: (m) => (
            <div className="flex gap-2">
                <PrimaryButton
                text="Registrar Programacion"
                onClick={() => setMantenimientoProgramar(m)}
                />
                <PrimaryButton
                text="Ver programaciones"
                onClick={() => setMantenimientoProgramaciones(m)}
                />
                <PrimaryButton
                text="Crear Orden"
                onClick={() => setMantenimientoOrden(m)}
                />
                <PrimaryButton 
                text="Ver órdenes"
                onClick={() => setMantenimientoOrdenes(m)}
                />
                <PrimaryButton
                text="Supervisar"
                onClick={() => setMantenimientoSeleccionado(m)}
                />
                <PrimaryButton
                text="Registrar Certificado"
                onClick={() => setMantenimientoCertificado(m)}
                />
                <PrimaryButton
                text="Reporte"
                onClick={() => console.log("generar reporte",m.idMantenimiento)}
                />
            </div>
        )
    }
  ]

  return (
    <PageContainer>
        <Card variant="table">
            <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold">
                    Mantenimientos {tipo}
                </h2>
                <ButtonGrid>
                    <PrimaryButton text="Registrar mantenimiento" onClick={() => console.log("crear mantenimiento")}/>
                </ButtonGrid>
            </div>
            <DataTable
            title="Lista de mantenimientos"
            data={mantenimientos}
            columns={columns}
            />
            {mantenimientoSeleccionado && (
             <Card>
                <h3 className="text-lg font-semibold mb-4">
                    Supervisión de Mantenimiento
                </h3>

                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th>
                                Equipo
                            </th>
                            <th>
                                Próximo mantenimiento
                            </th>
                            <th>
                                Próxima Calibración
                            </th>
                            <th>
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {
                                equipos.find(
                                    e=>e.idEquipo === mantenimientoSeleccionado.equipo
                                )?.nombre}
                            </td>
                            <td>
                                2026-10-19
                            </td>
                            <td>
                                2026-12-19
                            </td>
                        </tr>
                    </tbody>
                </table>
             </Card>
            )}

            {mantenimientoOrden && (
                <Card>
                    <h3 className="text-lg font-semibold mb-4">
                        Orden de Servicio
                    </h3>

                    <form onSubmit={handleCrearOrden} className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Tipo de servicio</label>
                            <select value={tipoServicio} onChange={(e) => setTipoServicio(e.target.value as TipoMantenimiento)}>
                                <option>preventivo</option>
                                <option>correctivo</option>
                            </select>
                        </div>
                        <div>
                            <label>Estado</label>
                            <select value={estado} onChange={(e) => handleEstadoChange(e.target.value)}>
                                <option value="pendiente">pendiente</option>
                                <option value="aprobada">aprobada</option>
                                <option value="supervisada">supervisada</option>
                                <option value="ejecutada">ejecutada</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                           <textarea value={descripcion} className="input" onChange={(e) => setDescripcion(e.target.value)}/>
                        </div>
                        <ButtonGrid>
                            <PrimaryButton type="submit" text="Crear Orden"/>
                        </ButtonGrid>
                    </form>
                </Card>
            )}

            {mantenimientoOrdenes && (
                <Card>
                    <h3 className="text-lg font-semibold mb-4">
                        Órdenes del mantenimiento
                    </h3>

                    
                    <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Mantenimiento
                            </th>
                            <th>
                                Descripción
                            </th>
                            <th>
                                Estado
                            </th>
                            <th>
                                Estado
                            </th>
                            <th>
                                Fecha Inicio
                            </th>
                            <th>
                                Fecha Fin
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map((o) => (
                            <tr key={o.idOrden}>
                                <td>
                                    {o.idOrden}
                                </td>
                                <td>
                                    {o.mantenimiento}
                                </td>
                                <td>
                                    {o.tipoServicio}
                                </td>
                                <td>
                                    {o.descripcion}
                                </td>
                                <td>
                                    {o.estado}
                                </td>
                                <td>
                                    {o.fechaInicio}
                                </td>
                                <td>
                                    {o.fechaFin}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </Card>
            )}

            {mantenimientoProgramar && (
                <Card>
                    <h3 className="text-lg font-semibold mb-4">
                        Programar Mantenimiento
                    </h3>

                    <form onSubmit={handleCrearProgramacion}>
                        <div>
                            <label>Unidad de Frecuencia</label>
                            <select value={unidadFrecuencia} onChange={(e) => setUnidadFrecuencia(e.target.value as UnidadFrecuencia)}>
                                <option value="dias">Días</option>
                                <option value="meses">Meses</option>
                                <option value="anios">Años</option>
                            </select>
                            <div>
                                <label>Frecuencia Mantenimiento</label>
                                <input type="number" value={frecuenciaMantenimiento} onChange={(e) => setFrecuenciaMantenimiento(Number(e.target.value))} />
                            </div>
                            <div>
                                <label>Frecuencia Calibracion</label>
                                <input type="number" value={frecuenciaCalibracion} onChange={(e) => setFrecuenciaCalibracion(Number(e.target.value))} />
                            </div>
                        </div>
                        <ButtonGrid>
                            <PrimaryButton type="submit" text="Guardar Programación"/>
                        </ButtonGrid>
                    </form>
                </Card>    
            )}
            {mantenimientoProgramaciones && (
                <Card>
                    <h3 className="text-lg font-semibold mb-4">
                        Programaciones del equipo
                    </h3>
                    <table className="w-full text-sm-border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>Unidad</th>
                                <th>Frecuencia Mant.</th>
                                <th>Próximo Mant.</th>
                                <th>Próximo Cal.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programaciones.map((p) => (
                                <tr key={p.idProgramacion} className="border-t">
                                    <td>
                                        {p.unidadFrecuencia}
                                    </td>
                                    <td>
                                        {p.unidadFrecuencia}
                                    </td>
                                    <td>
                                        {p.frecuenciaMantenimiento}
                                    </td>
                                    <td>
                                        {p.proximoMantenimiento}
                                    </td>
                                    <td>
                                        {p.proximoCalibracion}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            )}
            {mantenimientoCertificado && (
                <Card>
                    <h3 className="text-lg font-semibold mb-4">
                        Generar certificado metrólogico
                    </h3>
                    <form onSubmit={handleCrearCertificado} className="grid grid-cols gap-4">
                        <div>
                            <label>Número Certificado</label>
                            <input type="number" value={numeroCertificado} onChange={(e) => setNumeroCertificado(Number(e.target.value))}/>
                        </div>
                        <div>
                            <label>Responsable</label>
                            <select value={responsableCertificado} onChange={(e) =>
                                 
                                {
                                    const value = Number(e.target.value)

                                    if (!isNaN(value)) {
                                        setResponsableCertificado(value)
                                    }
                                    setResponsableCertificado(Number(e.target.value))}}>
                                
                                <option value={0}>Seleccione</option>
                                {usuarios.map((u,index) =>(
                                    <option key={u.id ?? index} value={u.id ?? 0}>
                                        {u.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <ButtonGrid>
                            <PrimaryButton type="submit" text="Generar Certificado"/>
                        </ButtonGrid>
                    </form>
                </Card>
            )}
        </Card>
    </PageContainer>
  )
}