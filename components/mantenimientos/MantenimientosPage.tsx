"use client"

import DataTable, { Column } from "@/components/ui/table/DataTable";
import { listarMantenimientos } from "@/services/mantenimientos/mantenimiento.service";
import { EstadoMantenimiento, MantenimientoRequest, MantenimientoResponse, TipoMantenimiento } from "@/types/mantenimientos/mantenimiento.type";
import { useEffect, useState } from "react";
import { EquipoResponse } from '../../types/equipos/equipo.type';
import PrimaryButton from "@/components/ui/button/PrimaryButton";
import PageContainer from "@/components/ui/layout/PageContainer";
import Card from "@/components/ui/cards/Card";
import ButtonGrid from "@/components/ui/layout/ButtonGrid";
import { listarEquipos } from "@/services/equipos/equipo.service";
import { EstadoOrden, OrdenServicioRequest, OrdenServicioResponse } from "@/types/mantenimientos/ordenServicio.type";
import { crearOrden, listarOrdenes } from "@/services/mantenimientos/ordenesServicio.service";
import { ProgramacionMantenimientoRequest, ProgramacionMantenimientoResponse, UnidadFrecuencia } from "@/types/mantenimientos/programacionMantenimiento.type";
import { consultarProgramacion, crearProgramacion, listarProgramaciones } from "@/services/mantenimientos/programacionMantenimiento.service";
import { api } from "@/lib/api";
import { consultarUsuarios } from "@/services/usuarios/usuario.service";
import { crearCertificado, listarCertificados } from "@/services/mantenimientos/certificados.service";
import { useRouter } from "next/navigation";
import { crearMantenimiento, actualizarMantenimiento } from '../../services/mantenimientos/mantenimiento.service';
import { UsuarioResponse } from "@/types/usuarios/usuario.type";
import { CertificadoMetrologicoResponse } from "@/types/mantenimientos/certificadoMetrologico.type";

export default function MantenimientosPage({tipo}:{tipo:string}) {
    const [mantenimientos,setMantenimientos] = useState<MantenimientoResponse[]>([])
    const [mostrarFormularioMantenimiento,setMostrarFormularioMantenimiento] = useState(false)
    const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState<MantenimientoResponse | null>(null)
    const [mantenimientoOrden,setMantenimientoOrden] = useState<MantenimientoResponse | null>(null)
    const [mantenimientoOrdenes,setMantenimientoOrdenes] = useState<MantenimientoResponse | null>(null)
    const [mantenimientoProgramar,setMantenimientoProgramar] = useState<MantenimientoResponse | null>(null)
    const [mantenimientoProgramaciones,setMantenimientoProgramaciones] = useState<MantenimientoResponse | null>(null)
    const [mantenimientoCertificado, setMantenimientoCertificado] = useState<MantenimientoResponse | null>(null)
    const [certificados,setCertificados] = useState<CertificadoMetrologicoResponse[]>([]);

    const [mantenimientoEditarId,setMantenimientoEditarId] = useState<number | null>(null)

    const [responsable,setResponsable] = useState<number>(0)

    const [tipoMantenimiento,setTipoMantenimiento] = useState<TipoMantenimiento>("preventivo")
    const [estadoMantenimiento,setEstadoMantenimiento] = useState<EstadoMantenimiento>("pendiente")

    const [fechaInicio,setFechaInicio] = useState("")
    const [fechaFin,setFechaFin] = useState("")

    const [tipoServicio,setTipoServicio] = useState<TipoMantenimiento>("preventivo")
    const [estado,setEstado] = useState<EstadoOrden>("pendiente")
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

    const [formMantenimiento,setFormMantenimiento] = useState<MantenimientoRequest>({
        equipo_id:1,
        tipo:"preventivo",
        fecha_inicio:"",
        fecha_fin:"",
        estado:"pendiente",
        responsable_id:1,
        diagnostico:""
    })

    const [formProgramacion,setFormProgramacion] = useState<ProgramacionMantenimientoRequest>({
        equipo_id:0,
        unidad_frecuencia:"meses",
        frecuencia_mantenimiento:1,
        frecuencia_calibracion:1,
    });

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (!token) {
            console.warn("No hay token disponible");
            return 
        }

        listarMantenimientos(tipo)
        .then((data) => {
            setMantenimientos(data)
        })

        console.log("mantenimientos:", mantenimientos)

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

    const handleCrearMantenimiento = async (e:any) => {

        e.preventDefault()

        const mantenimientoData = formMantenimiento

        if (mantenimientoData.equipo_id === 0 || mantenimientoData.responsable_id === 0) {
            alert("Seleccione el equipo y responsable")
            return
        }

        if (usuarios.length === 0) {
            alert("Usuarios no cargados aún")
            return
        }

        if (!mantenimientoData.responsable_id) {
            alert("Responsable inválido")
            return 
        }

        console.log("RESPONSABLE_ID:", mantenimientoData.responsable_id)

        await crearMantenimiento({
                diagnostico: mantenimientoData.diagnostico,
                tipo: mantenimientoData.tipo,

                estado: mantenimientoData.estado,

                equipo_id: mantenimientoData.equipo_id,
                responsable_id: mantenimientoData.responsable_id,

                fecha_inicio: mantenimientoData.fecha_inicio,
                fecha_fin: mantenimientoData.fecha_fin
            })

            alert("Mantenimiento creado con exito")

            listarMantenimientos(tipo).then(setMantenimientos)

            setMostrarFormularioMantenimiento(false)
    }

    const handleCrearOrden = async () => {

        if (!mantenimientoOrden) return 

        const data:OrdenServicioRequest = {
            mantenimiento:mantenimientoOrden.id,
            tipoServicio:tipoServicio,
            descripcion:descripcion,
            estado:estado
        }

  
        const res = await crearOrden(data)


        alert("Orden creada correctamente");

        setMantenimientoOrden(null)
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
            console.log("DATA: ",data)
            console.log("ORDENES: ",ordenes)
            const filtradas = data.filter(
                (o) => o.mantenimiento === mantenimientoOrdenes.id
            )
            setOrdenes(filtradas)
        })
    }, [mantenimientoOrdenes])

    useEffect(() => {
        if (!mantenimientoEditarId) return 

        const cargar = async () => {
            const res = await api.get(`/mantenimientos/${mantenimientoEditarId}/`)

            const data = res.data 

            setFormMantenimiento({
                equipo_id:data.equipo_id,
                tipo:data.tipo,
                fecha_inicio:data.fecha_inicio,
                fecha_fin:data.fecha_fin,
                estado:data.estado,
                responsable_id:data.responsable,
                diagnostico:data.diagnostico
            })
        }

        cargar()
    }, [mantenimientoEditarId])

    useEffect(() => {
        if (!mantenimientoProgramaciones) {
            setProgramaciones([])
            return
        } 

        listarProgramaciones()
        .then((data) => {
            const filtradas = data.filter(
                (p) => p.equipo_id === mantenimientoProgramaciones.equipo_id
            )

            setProgramaciones(filtradas)
        })
    },[mantenimientoProgramaciones])

    useEffect(() => {
        if (!mantenimientoCertificado) {
            setCertificados([])
            return 
        }

        listarCertificados().then((data) => {
            const filtrados = data.filter(
                (c) => c.mantenimiento === mantenimientoCertificado.id
            )

            setCertificados(filtrados)
        })
    },[mantenimientoCertificado])

    const handleCrearProgramacion = async (e:any) => {

        e.preventDefault()

        if (!formProgramacion.equipo_id || formProgramacion.equipo_id === 0) {
        alert("ERROR: equipo_id inválido")
        return
        }

        const data:ProgramacionMantenimientoRequest = {
            equipo_id: formProgramacion.equipo_id,
            unidad_frecuencia: unidadFrecuencia,
            frecuencia_mantenimiento: frecuenciaMantenimiento,
            frecuencia_calibracion:frecuenciaCalibracion,
            
        }
        
        await crearProgramacion(data)

        alert("Programación creada exitosamente");

        setFormProgramacion({
            equipo_id:0,
            unidad_frecuencia:"meses",
            frecuencia_mantenimiento:1,
            frecuencia_calibracion:1
        })

        setUnidadFrecuencia("meses")
        setFrecuenciaMantenimiento(1)
        setFrecuenciaCalibracion(1)

        setMantenimientoProgramar(null)
        setMantenimientoProgramaciones(null)
        setProgramaciones([])
    }

    const handleCrearCertificado = async (e:any) => {

        e.preventDefault()

        if (!mantenimientoCertificado) return 

        const data = {

            numeroCertificado,
            responsable:responsableCertificado,
            mantenimiento:mantenimientoCertificado.id
        
        
        }
        try {
            const res = await crearCertificado(data)

            console.log("CERTIFICADO CREADO:", res)

            alert("Certificado creado correctamente")

        } catch (error:any) {

        console.error("ERROR BACKEND:", error.response?.data || error)

        alert(
            error.response?.data?.error ||
            JSON.stringify(error.response?.data?.errors) ||
        "Error al crear certificado"
        )
    }
    }

    const columns: Column<MantenimientoResponse>[] = [
    {
      key: "equipo_id",
      label: "Equipo",
      render: (m) => {
        const equipo = equipos?.find(
          (e) => e.idEquipo === m.equipo_id
        )
        return equipo?.nombre?? "__"
      }
    },
    {
    key: "tipo_display",
    label: "Tipo",
    },
    {
    key: "estado_display",
    label: "Estado",
    },
    {
    key: "fechaInicio",
    label: "Fecha Inicio",
    render: (m) => m.fechaInicio?.split("T")[0]
    },
    {
    key: "fechaFin",
    label: "Fecha Fin",
    render: (m) => m.fechaFin?.split("T")[0]
    },
    {
    key: "responsable_nombre",
    label: "Responsable",
    },
    {
        key:"actions",
        label:"Acciones",
        render: (m) => (
            <div className="flex gap-2">
                <PrimaryButton 
                text="Registrar Mantenimiento"
                onClick={() => setMostrarFormularioMantenimiento(true)}
                />
                <PrimaryButton 
                text="Actualizar Mantenimiento"
                onClick={() => {
                    setMantenimientoEditarId(m.id)
                    setFormMantenimiento({
                        equipo_id:m.equipo_id,
                        tipo:m.tipo,
                        fecha_inicio:m.fechaInicio,
                        fecha_fin:m.fechaFin,
                        responsable_id:m.responsable_id,
                        estado:m.estado,
                        diagnostico:m.diagnostico
                    })
                    }
                }
                />
                <PrimaryButton
                text="Registrar Programacion"
                onClick={() => {
                    setMantenimientoProgramar(m)

                    setFormProgramacion({
                        equipo_id:m.equipo_id,
                        unidad_frecuencia:"meses",
                        frecuencia_mantenimiento:1,
                        frecuencia_calibracion:1,
                    })
                }}
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
                onClick={() => router.push("/reportes")}
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
            </div>
            <DataTable
            title="Lista de mantenimientos"
            data={mantenimientos}
            columns={columns}
            />
           {mostrarFormularioMantenimiento && (
             <Card>
                <h3 className="text-lg font-semibold mb-4">
                    Registrar Mantenimiento
                </h3>
                <form onSubmit={handleCrearMantenimiento} className="w-full border shadow bg-white mt-6">
                    <div className="grid grid-cols-4 gap-3 p-4">
                        <select value={formMantenimiento.equipo_id}
                    onChange={(e) => setFormMantenimiento({
                        ...formMantenimiento,
                        equipo_id:Number(e.target.value)
                    })}>
                        <option value={0}>
                            Seleccione equipo
                        </option>
                        {equipos.map((e) => (
                            <option key={e.idEquipo} value={e.idEquipo}>
                                {e.nombre}
                            </option>
                        ) )}
                    </select>
                    <select value={formMantenimiento.tipo} onChange={(e) => setFormMantenimiento({
                        ...formMantenimiento,
                        tipo:e.target.value as TipoMantenimiento
                    })}>
                        <option value="preventivo">
                            Preventivo
                        </option>
                        <option value="correctivo">
                            Correctivo
                        </option>
                    </select>
                     <input type="date" value={formMantenimiento.fecha_inicio} onChange={(e) => setFormMantenimiento({
                        ...formMantenimiento,
                        fecha_inicio:e.target.value
                    })} />
                    <input type="date" value={formMantenimiento.fecha_fin} onChange={(e) => setFormMantenimiento({
                        ...formMantenimiento,
                        fecha_fin:e.target.value
                    })} />
                    <textarea placeholder="Diagnóstico" value={formMantenimiento.diagnostico} onChange={(e) =>
                        setFormMantenimiento({
                            ...formMantenimiento,
                            diagnostico: e.target.value,
                        })
                    }/>
                    <select value={formMantenimiento.responsable_id} onChange={(e) => setFormMantenimiento({
                        ...formMantenimiento,
                        responsable_id:Number(e.target.value)
                    })}>
                        <option value={0}>Seleccione responsable</option>
                        {usuarios.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.nombre}
                            </option>
                        ))}
                    </select>
                    <button type="submit">
                        Guardar
                    </button>
                    </div>
                </form>
            </Card>
           )}
           {mantenimientoEditarId && (
            <Card>
                <h3>Actualizar mantenimiento</h3>

                <form onSubmit={async (e) => {
                    e.preventDefault()
                    listarMantenimientos(tipo).then(setMantenimientos);
                    setMantenimientoEditarId(null)
                }}>
                    <select value={formMantenimiento.equipo_id}
                    onChange={(e) => setFormMantenimiento({
                        ...formMantenimiento,
                        equipo_id:Number(e.target.value)
                    })}>
                        <option value={0}>
                            Seleccione equipo
                        </option>
                        {equipos.map((e) => (
                            <option key={e.idEquipo} value={e.idEquipo}>
                                {e.nombre}
                            </option>
                        ) )}
                    </select>
                    <select value={formMantenimiento.tipo} onChange={(e) => setFormMantenimiento({
                        ...formMantenimiento,
                        tipo:e.target.value as TipoMantenimiento
                    })}>
                        <option value="preventivo">
                            Preventivo
                        </option>
                        <option value="correctivo">
                            Correctivo
                        </option>
                    </select>
                     <input type="date" value={formMantenimiento.fecha_inicio} onChange={(e) => setFormMantenimiento({
                        ...formMantenimiento,
                        fecha_inicio:e.target.value
                    })} />
                    <input type="date" value={formMantenimiento.fecha_fin} onChange={(e) => setFormMantenimiento({
                        ...formMantenimiento,
                        fecha_fin:e.target.value
                    })} />
                    <textarea placeholder="Diagnóstico" value={formMantenimiento.diagnostico} onChange={(e) =>
                        setFormMantenimiento({
                            ...formMantenimiento,
                            diagnostico: e.target.value,
                        })
                    }/>
                    <select value={formMantenimiento.responsable_id} onChange={(e) => setFormMantenimiento({
                        ...formMantenimiento,
                        responsable_id:Number(e.target.value)
                    })}>
                        <option value={0}>Seleccione responsable</option>
                        {usuarios.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.nombre}
                            </option>
                        ))}
                    </select>
                    <button type="submit">
                        Actualizar
                    </button>
                </form>
            </Card>
           )}
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
                                    e=>e.idEquipo === mantenimientoSeleccionado.equipo_id
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
                            <input placeholder="equipo id" type="number" value={formProgramacion.equipo_id} onChange={(e) => 
                                setFormProgramacion({
                                    ...formProgramacion,
                                    equipo_id: Number(e.target.value)
                                })
                            } />
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
                                        {p.unidad_frecuencia}
                                    </td>
                                    <td>
                                        {p.frecuencia_mantenimiento}
                                    </td>
                                    <td>
                                        {p.frecuencia_calibracion}
                                    </td>
                                    <td>
                                        {p.proximo_mantenimiento}
                                    </td>
                                    <td>
                                        {p.proximo_calibracion}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => {
                        setMantenimientoProgramaciones(null)
                        setProgramaciones([])
                    }}>
                        Cerrar
                    </button>
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
            {mantenimientoCertificado && (
                <Card>
                    <h3 className="text-lg font-semibold mb-4">
                        Certificados del mantenimiento
                    </h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Número</th>
                                <th>Responsable</th>
                                <th>Mantenimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certificados.map((c) => (
                                <tr key={c.idCertificado}>
                                    <td>
                                        {c.idCertificado}
                                    </td>
                                    <td>
                                        {c.numeroCertificado}
                                    </td>
                                    <td>
                                        {c.responsable}
                                    </td>
                                    <td>
                                        {c.mantenimiento}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => {
                        setMantenimientoCertificado(null)
                        setCertificados([])
                    }}>
                        Cerrar
                    </button>
                </Card>
            )}
        </Card>
    </PageContainer>
  )
}