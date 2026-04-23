"use client";

import { actualizarEquipo, crearEquipo, eliminarEquipo, obtenerEquipo } from "@/services/equipos/equipo.service";
import { useEffect, useState } from "react";
import PageContainer from "../ui/layout/PageContainer";
import { useAction } from "@/hooks/useAction";
import { useHandle } from "@/hooks/useHandle";
import { useError } from "@/hooks/useError";
import Card from "../ui/cards/Card";
import SelectField from "../ui/input/SelectField";
import InputField from "../ui/input/InputField";
import { EquipoRequest } from "@/types/equipos/equipo.type";
import { UseForm } from "@/hooks/useForm";
import { equipoToForm } from "@/mappers/equipos/equipo.mapper";

export default function HojasVidaPage() {

    const [equipos,setEquipos] = useState<any[]>([])
    const [equipoSeleccionado,setEquipoSeleccionado] = useState<number | null>(null)
    const [mostrarRegistro,setMostrarRegistro] = useState(false)

    const [equipo,setEquipo] = useState<any>(null)

    const [crearMarca, setCrearMarca] = useState(false)
    const [crearModelo,setCrearModelo] = useState(false)
    const [crearTecnologia,setCrearTecnologia] = useState(false)
    const [crearFabricante,setCrearFabricante] = useState(false)
    const [crearUbicacion,setCrearUbicacion] = useState(false)

    const [nuevaMarca,setNuevaMarca] = useState("")
    const [nuevoModelo,setNuevoModelo] = useState("")
    const [nuevaTecnologia,setNuevaTecnologia] = useState("")
    const [nuevoFabricante,setNuevoFabricante] = useState("")
    const [nuevaUbicacion,setNuevaUbicacion] = useState("")

    const [mostrarEditar,setMostrarEditar] = useState(false)
    const [equipoEditarId,setEquipoEditarId] = useState<number | null>(null)

    const {execute:crear} = useAction(crearEquipo)
    const {handle} = useHandle()
    const {error} = useError()
    const {formData,handleChange} = 
    UseForm<EquipoRequest>(equipoToForm())

    
    const [formEditar,setFormEditar] = useState({
        nombre:"",
        marca:0,
        modelo:0,
        serie:"",
        fabricante:0,
        tipoTecnologia:0,
        ubicacion:0,
        placa:""
    })

    useEffect(() => {
        fetch("http://localhost:8000/api/equipos/")
        .then(res => res.json())
        .then(data => setEquipos(data))
        .catch(err => console.error("Error cargando equipos:",err))
    },[])

    useEffect(() => {
        if (!equipoSeleccionado) return 

        obtenerEquipo(equipoSeleccionado)
        .then(setEquipo)
        .catch(err => console.error("Error cargando detalle:",err))
    },[equipoSeleccionado])

    useEffect(() => {
        if (!equipoEditarId) return 

        const cargarEditar = async () => {
            const data = await obtenerEquipo(equipoEditarId)

            setFormEditar({
                nombre:data.nombre,
                marca:data.marca,
                modelo:data.modelo,
                serie:data.serie,
                fabricante:data.fabricante,
                tipoTecnologia:data.tipoTecnologia,
                ubicacion:data.ubicacion,
                placa:data.placa,
            })
        }

        cargarEditar()
    },[equipoEditarId])


    const [marcas,setMarcas] = useState([
        {value:"1",label:"Philips"},
        {value:"2",label:"GE Healthcare"},
        {value:"3",label:"Siemenens"},
        {value:"4",label:"Mindray"},
        {value:"5",label:"Drager"},
        {value:"new",label:"+ Crear nueva marca"}
    ])

    const [modelos,setModelos] = useState([
        {value:"1",label:"Philips Medical System"},
        {value:"2",label:"GE Healthcare"},
        {value:"3",label:"Siemenens Healthineers"},
        {value:"4",label:"Mindray Bio-Medical Electronics"},
        {value:"5",label:"Dragerwerk AG"},
        {value:"new",label:"Crear nuevo modelo"}
    ])

    const [tecnologias,setTecnologias] = useState([
        {value:"1",label:"Philips Medical System"},
        {value:"2",label:"GE Healthcare"},
        {value:"3",label:"Siemenens Healthineers"},
        {value:"4",label:"Mindray Bio-Medical Electronics"},
        {value:"5",label:"Dragerwerk AG"},
        {value:"new",label:"+ Crear nueva tecnologia"}
    ])

    const [fabricantes,setFabricantes] = useState([
        {value:"1",label:""},
        {value:"2",label:"Imagenología"},
        {value:"3",label:"Soporte Vital"},
        {value:"4",label:"Diagnóstico"},
        {value:"5",label:"Terapéutico"},
        {value:"new",label:"+ Crear nuevo fabricante"}
    ])

    const [ubicaciones,setUbicaciones] = useState([
        {value:"1",label:"Pabón - UCI 6 piso"},
        {value:"2",label:"Pabón - Hemodinamia"},
        {value:"3",label:"Centro Cuidados - Farmacia"},
        {value:"4",label:"Centro Cuidados - Laboratorio"},
        {value:"new",label:"+ Crear nueva Ubicacion"}
    ])

    const handleEliminar = async (id:number) => {

        const confirmar = window.confirm("¿Deseas eliminar esta hoja de vida?") 
        if (!confirmar) return 

        await eliminarEquipo(id)

        const res = await fetch("http://localhost:8000/api/equipos")
        const data = await res.json()
        setEquipos(data)
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const data = {
            ...formData,
            nuevaMarca,
            nuevoModelo,
            nuevaTecnologia,
            nuevoFabricante,
            nuevaUbicacion
        }

        await crear(data)

        const res = await fetch("http://localhost:8000/api/equipos")
        setEquipos(await res.json())

        setMostrarRegistro(false)
    }

    const handleActualizar = async (e:any) => {
        e.preventDefault()

        if (!equipoEditarId) return 

        await actualizarEquipo(equipoEditarId,formEditar)

        alert("Equipo actualizar correctamente")
        const res = await fetch("http://localhost:8000/api/equipos")
        const data = await res.json()
        setEquipos(data)

        setEquipoEditarId(null)
    }

     const handleMarca = (e:any) => {
        if (e.target.value === "new"){
            setCrearMarca(true)
        } else {
            setCrearMarca(false)
            handleChange(e)
        }
    }

    const handleModelo = (e:any) => {
        if (e.target.value === "new") {
            setCrearModelo(true)
        } else {
            setCrearModelo(false)
            handleChange(e)
        }
    }

    const handleTecnologia = (e:any) => {
        if (e.target.value === "new") {
            setCrearTecnologia(true)
        } else {
            setCrearTecnologia(false)
            handleChange(e)
        }
    }

    const handleFabricante = (e:any) => {
        if (e.target.value === "new") {
            setCrearFabricante(true)
        } else {
            setCrearFabricante(false)
            handleChange(e)
        }
    }

    const handleUbicacion = (e:any) => {
        if (e.target.value === "new") {
            setCrearUbicacion(true)
        } else {
            setCrearUbicacion(false)
            handleChange(e)
        }
    }

    const Cell = ({children}:{children:any}) => (
        <div className="border border-gray-400 p-2 text-sm">
        {children}
        </div>
    )


    return (
        <PageContainer>
        <Card>
                <h2 className="text-xl font-bold mb-4">
                Fichas Técnicas de EquipoResponse
            </h2>
             <div className="w-full border shadow-lg bg-white">
             <table border={1} cellPadding={10}>
                <thead>
                    <tr>
                        <th>Equipo</th>
                        <th>Marca</th>
                        <th>Serie</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {equipos.map((e) => (
                        <tr key={e.id}>
                            <td>
                                {e.nombre}
                            </td>
                            <td>
                                {e.marca_nombre}
                            </td>
                            <td>
                                {e.serie}
                            </td>
                            <td>
                                <button onClick={() => {
                                setEquipoSeleccionado(e.id)
                                setMostrarRegistro(false)
                            }}>
                                Ver
                            </button>
                            <button type="submit" onClick={() => setMostrarRegistro(true)}>
                                Registrar
                            </button>
                            <button type="button" className="bg-blue-600 text-white px-4 py-2" onClick={() => setEquipoEditarId(e.id)}>
                                Editar hoja de vida
                            </button>
                            <button type="button" className="bg-red-600 text-white px-4 py-2" onClick={() => handleEliminar(e.id)}>
                                Eliminar hoja de vida
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

           {equipo && !mostrarRegistro && (
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
            </div>
           )}
           {mostrarRegistro && (
             <form onSubmit={handleSubmit} className="w-full border shadow-lg bg-[var(--color-form-bg)] border-[var(--color-border)]">
           <div className="grid-grid-cols-3 border-b">
            <div className="col-span-2 p-4 font-bold text-lg">
                        HOJA DE VIDA DEL EQUIPO BIOMÉDICO
                </div>
                  <div className="border-1 p-2 text-xs">
                    <Cell>Formato</Cell>
                    <Cell>Revisado</Cell>
                    <Cell>Aprobado</Cell>
            </div>
           </div>
            <div className="bg-gray-100 border-b p-2 font-semibold text-sm">
                    INFORMACIÓN TÉCNICA
            </div>
            <div className="grid grid-cols-5">
                    <Cell>
                        <SelectField
                        label="Nombre del Equipo"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        options={equipos}
                     />
                    </Cell>
                    <Cell>
                        <InputField
                        label="Número de Placa"
                        name="placa"
                        type="text"
                        value={formData.placa}
                        onChange={handleChange}
                        />
                    </Cell>
                    <Cell>
                        <InputField 
                        label="Serie"
                        name="serie"
                        value={formData.serie}
                        onChange={handleChange}
                        />
                    </Cell>
                    <Cell>
                        <SelectField
                        label="Marca"
                        name="marca"
                        value={formData.marca}
                        onChange={handleMarca}
                        options={marcas}
                        />
                         {crearMarca && (
                        <InputField 
                        label="Nueva Marca"
                        name="nuevaMarca"
                        value={nuevaMarca}
                        onChange={(e:any) => setNuevaMarca(e.target.value)}/>
                        )}
                    </Cell>
                    <Cell>
                       <SelectField
                    label="Modelo"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleModelo}
                    options={modelos}
                    />
                    {crearModelo && (
                        <InputField
                        label="Nuevo Modelo"
                        name="nuevoModelo"
                        value={nuevoModelo}
                        onChange={(e:any) => setNuevoModelo(e.target.value)} />
                    )}
                </Cell>      
                <Cell> 
                    <SelectField
                    label="Tipo Tecnología"
                    name="tipoTecnologia"
                    value={formData.tipoTecnologia}
                    onChange={handleTecnologia}
                    options={tecnologias}
                    />
                    {crearTecnologia && (
                        <InputField
                        label="Nueva Tecnología"
                        name="nuevaTecnologia"
                        value={nuevaTecnologia}
                        onChange={(e:any) => setNuevaTecnologia(e.target.value)}/>
                    )}
                </Cell>
                 
                <Cell>
                    <SelectField
                    label="Fabricante"
                    name="fabricante"
                    value={formData.fabricante}
                    onChange={handleFabricante}
                    options={fabricantes}
                    />
                    {crearFabricante && (
                        <InputField
                        label="Fabricante"
                        name="nuevoFabricante"
                        value={nuevoFabricante}
                        onChange={(e:any) => setNuevoFabricante(e.target.value)} />
                    )}
                </Cell>
                <Cell>
                 <SelectField
                    label="Ubicación"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleUbicacion}
                    options={ubicaciones}
                    />
                    {crearUbicacion && (
                        <InputField
                        label="Nueva Ubicación"
                        name="nuevaUbicacion"
                        value={nuevaUbicacion}
                        onChange={(e:any) => setNuevaUbicacion(e.target.value)} />
                    )}
                </Cell>
                <Cell>
                {error && (
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>
                    )}
            </Cell>  
            </div>  
            <div className="border-t p-3 flex gap-6">
                <span className="font-semibold text-sm">
                    Estado del Equipo
                </span>
            </div>   
            <label className="flex gap-2">
                <input type="checkbox" name="estado_bueno" /> Bueno
            </label>
             <label className="flex gap-2">
                <input type="checkbox" name="estado_regular" /> Regular
            </label>
             <label className="flex gap-2">
                <input type="checkbox" name="estado_malo" /> Malo
            </label>
             <label className="flex gap-2">
                <input type="checkbox" name="estado_desarmado" /> Desarmado
            </label>

         <div className="border-t p-3 flex gap-6">
            <span className="font-semibold text-sm">
                    Detalle mantenimiento
                </span>
                <label className="flex gap-2">
                <input type="checkbox" name="mant_preventivo"  /> Preventivo
            </label>
             <label className="flex gap-2">
                <input type="checkbox" name="mant_correctivo"  /> Correctivo
            </label>
             <label className="flex gap-2">
                <input type="checkbox" name="mant_instalacion" /> Instalación
            </label>
             <label className="flex gap-2">
                <input type="checkbox"  name="mant_desmontaje" /> Desmontaje
            </label>
         </div>
         <div className="border-t p-3 flex gap-6 flex-wrap">
            <span className="font-semibold text-sm">
                    Fallas Detectadas
            </span>
            <label className="flex gap-2">
            <input type="checkbox" name="falla_depreciacion"  /> Depreciación
            </label>
             <label className="flex gap-2">
                <input type="checkbox" name="falla_mala_operacion" /> Mala operación
            </label>
             <label className="flex gap-2">
                <input type="checkbox" name="falla_mal_instalado" /> Mal instalado
            </label>
             <label className="flex gap-2">
                <input type="checkbox" name="falla_accesorios"  /> Accesorios
            </label>
              <label className="flex gap-2">
                <input type="checkbox" name="falla_desconocido"  /> Desconocido
            </label>
              <label className="flex gap-2">
                <input type="checkbox" name="falla_sin_fallas"  /> Sin fallas
            </label>
            </div>
            <button type="submit" onClick={handleSubmit}>
                Guardar Equipo
            </button>
            </form>
           )}
           </div>
        </Card>
        {equipoEditarId && (
            <Card>
                <div className="w-full border shadow-lg bg-white mt-6">
                    <h3 className="p-4 font-bold">
                        EDITAR EQUIPO
                    </h3>
                    <form onSubmit={handleActualizar}>
                            <input value={formEditar.nombre} onChange={(e)=>setFormEditar({...formEditar, nombre:e.target.value})} />           
                            <input value={formEditar.marca} onChange={(e)=>setFormEditar({...formEditar, marca:Number(e.target.value)})} />
                            <input value={formEditar.modelo} onChange={(e)=>setFormEditar({...formEditar, modelo:Number(e.target.value)})} />
                            <input value={formEditar.serie} onChange={(e)=>setFormEditar({...formEditar, serie:e.target.value})} />
                            <input value={formEditar.tipoTecnologia} onChange={(e)=>setFormEditar({...formEditar, tipoTecnologia:Number(e.target.value)})} />
                            <input value={formEditar.fabricante} onChange={(e)=>setFormEditar({...formEditar, fabricante:Number(e.target.value)})} />
                            <input value={formEditar.ubicacion} onChange={(e)=>setFormEditar({...formEditar, ubicacion:Number(e.target.value)})} />
                        <button type="submit" className="bg-green-600 text-white px-4 py-2">
                            Actualizar equipo
                        </button>
                     </form>
                </div>
            </Card>
        )}
        </PageContainer>
    )

}