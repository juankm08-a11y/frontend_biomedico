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
    const [crearFabricante,setCrearFabricante] = useState(false)
    const [crearUbicacion,setCrearUbicacion] = useState(false)

    const [nuevaMarca,setNuevaMarca] = useState("")
    const [nuevoModelo,setNuevoModelo] = useState("")
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
        tipoTecnologia:"",
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
        if (equipoEditarId === null) return 

        const cargarEditar = async () => {
            const data = await obtenerEquipo(equipoEditarId)

            setFormEditar({
                nombre:data.nombre ?? "",
                marca:data.marca ?? 0,
                modelo:data.modelo ?? 0,
                serie:data.serie ?? "",
                tipoTecnologia:data.tipo_tecnologia ?? "",
                ubicacion:data.ubicacion ?? 0,
                placa:data.placa ?? "",
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
    {value:"monitoreo",label:"Monitoreo"},
    {value:"imagenologia",label:"Imagenología"},
    {value:"soporte_vital",label:"Soporte Vital"},
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

        let marcaFinal = formData.marca
        let modeloFinal = formData.modelo
        let ubicacionFinal = formData.ubicacion

        if (crearMarca && nuevaMarca) {
            const res = await fetch("http://127.0.0.1:8000/api/marcas/",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({nombre:nuevaMarca})
            })

            const data = await res.json()
            marcaFinal = data.id 
        }

        if (crearModelo && nuevoModelo) {
            const res = await fetch("http://127.0.0.1:8000/api/modelos/",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({nombre:nuevoModelo,marca:Number(marcaFinal)})
            })

            const data = await res.json()
            modeloFinal = data.id 
        }

        if (crearUbicacion && nuevaUbicacion) {
            const res = await fetch("http://127.0.0.1:8000/api/ubicaciones/",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    sede:1,
                    departamento:1,
                    ciudad:1,
                    area:1,
                    detalle:nuevaUbicacion
                })
            })

            const data = await res.json()
            ubicacionFinal = data.id 
        }

        const cleanValue = (value:any) => {
            if (!value) return null
            if (Array.isArray(value)) return Number(value[0])
            return Number(value)
        }

        const dataFinal = {
            nombre: formData.nombre,
            marca:Number(marcaFinal) || 1,
            modelo: Number(modeloFinal) || 1,
            placa:formData.placa,
            tipo_tecnologia: formData.tipo_tecnologia || "",
            serie:formData.serie,
            ubicacion: cleanValue(ubicacionFinal) || 1
        }
        

        try {
            
        await crear(dataFinal)

        const res = await fetch("http://localhost:8000/api/equipos")
        setEquipos(await res.json())

        setMostrarRegistro(false)
        } catch (error:any) {
            console.log("ERROR: ",error?.response.data)
        }
    }

    const handleActualizar = async (e:any) => {
        e.preventDefault()

        if (!equipoEditarId) return 

       try {
        
         const dataFinal = {
            nombre: formEditar.nombre,
            marca: Number(formEditar.marca) || 1,
            modelo: Number(formEditar.modelo) || 1,
            tipo_tecnologia: formEditar.tipoTecnologia || "",
            serie: formEditar.serie,
            placa: formEditar.placa, 
            ubicacion: Number(formEditar.ubicacion) || 1
        }

        await actualizarEquipo(equipoEditarId,dataFinal)

        alert("Equipo actualizar correctamente")
        const res = await fetch("http://localhost:8000/api/equipos")
        const data = await res.json()
        setEquipos(data)

        setEquipoEditarId(null)
       } catch (error:any) {
         console.log("ERROR BACKEND: ",error?.response.data)
       }
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
        const value = e.target.value
        if (value === "new") {
            setCrearModelo(true)
        } else {
            setCrearModelo(false)
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

    const equiposOptions = equipos.map(e => ({
        value: e.id ?? e.idEquipo,
        label:e.nombre ?? "sin nombre"
    }))

    return (
        <PageContainer>
        <Card>
                <h2 className="text-xl font-bold mb-4">
                Fichas Técnicas de EquipoResponse
            </h2>
             <div className="w-full border shadow bg-white overflow-x-auto">
             <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Equipo</th>
                        <th className="border p-2">Marca</th>
                        <th className="border p-2">Serie</th>
                        <th className="border p-2">Estado</th>
                        <th className="border p-2">Fabricante</th>
                        <th className="border p-2">Tecnología</th>
                        <th className="border p-2">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {equipos.map((e) => (
                        <tr className="hover:bg-gray-50" key={e.id ?? e.idEquipo}>
                            <td className="border p-2">
                                {e.nombre}
                            </td>
                            <td className="border p-2">
                                {e.marca_nombre}
                            </td>
                            <td className="border p-2">
                                {e.serie}
                            </td>
                            <td className="border p-2">
                                {e.estado_display}
                            </td>
                            <td className="border p-2">
                                {e.tecnologia_display}
                            </td>
                            <td className="border p-2">
                                {e.ubicacion}
                            </td>
                            <td className="border p-2">
                                <div className="flex gap-2 flex-wrap">
                                     <button onClick={() => {
                                    setEquipoSeleccionado(e.id)
                                    setMostrarRegistro(false)
                                    }}>
                                    Ver
                                </button>
                                <button type="submit" onClick={() => setMostrarRegistro(true)}>
                                    Registrar
                                </button>
                                <button type="button"  onClick={() => setEquipoEditarId(e.id ?? e.idEquipo)}>
                                    Editar hoja de vida
                                </button>
                                <button type="button"  onClick={() => handleEliminar(e.id ?? e.idEquipo)}>
                                    Eliminar hoja de vida
                                </button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

           {equipo && !mostrarRegistro && (
            <div className="w-full border shadow bg-white mt-6">
                <div className="border-b p-4 font-bold text-lg">
                    HOJA DE VIDA DEL EQUIPO BIOMÉDICO
                </div>
                <div className="bg-gray-100 border-b p-2 font-semibold text-sm">
                    INFORMACIÓN TÉCNICA
                </div>
                <div className="grid grid-cols-4 gap-2 p-4 text-sm">
                    <div>
                        <strong>
                            Nombre:
                        </strong>
                        <p>
                            {equipo.nombre}
                        </p>
                    </div>
                    <div>
                        <strong>Marca:</strong>
                        <p>
                            {equipo.marca_nombre}
                        </p>
                    </div>
                    <div>
                        <strong>Serie:</strong>
                        <p>
                            {equipo.serie}
                        </p>
                    </div>
                    <div>
                        <strong>Estado:</strong>
                        <p>
                            {equipo.estado_nombre}
                        </p>
                    </div>
                    <div>
                        <strong>Modelo:</strong>
                        <p>
                            {equipo.modelo_nombre}
                        </p>
                    </div>
                    <div>
                        <strong>Tecnología</strong>
                        <p>{equipo.tecnologia_display}</p>
                    </div>
                    <div>
                        <strong>Ubicación</strong>
                        <p>
                            {equipo.ubicacion}
                        </p>
                    </div>
                    <div>
                        <strong>Placa:</strong>
                        <p>
                            {equipo.placa}
                        </p>
                    </div>
                </div>
            </div>
           )}
           {mostrarRegistro && (
             <form onSubmit={handleSubmit} className="w-full border shadow bg-white mt-6">
                    <div className="border-b p-4 font-bold text-lg">
                        HOJA DE VIDA DEL EQUIPO BIOMÉDICO
                    </div>
                    <div className="border-1 p-2 text-xs">
                        <p>Formato</p>
                        <p>Revisado</p>
                        <p>Aprobado</p>
                    </div>
                <div className="bg-gray-100 border-b p-2 font-semibold text-sm">
                    INFORMACIÓN TÉCNICA
                </div>
                <div className="grid grid-cols-4 gap-3 p-4">
                    <InputField
                        label="Nombre del Equipo"
                        name="nombre"
                        value={formData.nombre ?? ""}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Número de Placa"
                        name="placa"
                        type="text"
                        value={formData.placa}
                        onChange={handleChange}
                        />
                    <InputField 
                        label="Serie"
                        name="serie"
                        value={formData.serie}
                        onChange={handleChange}
                        />
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
                    <SelectField
                        label="Modelo"
                        name="modelo"
                        value={String(formData.modelo) || ""}
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
                    <SelectField
                    label="Tipo Tecnología"
                    name="tipo_tecnologia"
                    value={formData.tipo_tecnologia}
                    options={tecnologias}
                    onChange={handleChange}
                    />
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
                    {error && (
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>
                    )}
            </div>  
            <div className="border-t p-4">
                <p className="font-semibold text-sm mb-2">
                    Estado del Equipo
                </p>
                <div className="flex gap-4 flex-wrap">
                    <label className="flex gap-4 flex-wrap">
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
                </div>
            </div>   
            

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
                <form onSubmit={handleActualizar} className="w-full border shadow bg-white mt-6">
                    <div className="border-b p-4 font-bold text-lg">
                        HOJA DE VIDA DEL EQUIPO BIOMÉDICO
                    </div>
                     <div className="border-1 p-2 text-xs">
                        <p>Formato</p>
                        <p>Revisado</p>
                        <p>Aprobado</p>
                    </div>
                    <div className="bg-gray-100 border-b p-2 font-semibold text-sm">
                        INFORMACIÓN TÉCNICA
                    </div>
                    <div className="grid grid-cols-4 gap-3 p-4">
                       <InputField
                        label="Nombre del Equipo"
                        name="nombre"
                        value={formEditar.nombre ?? ""}
                        onChange={handleChange}
                        />
                        <InputField
                        label="Número de Placa"
                        name="placa"
                        type="text"
                        value={formEditar.placa}
                        onChange={handleChange}
                        />
                        <InputField 
                        label="Serie"
                        name="serie"
                        value={formEditar.serie}
                        onChange={handleChange}
                        />
                        <SelectField
                        label="Marca"
                        name="marca"
                        value={formEditar.marca}
                        onChange={handleChange}
                        options={marcas}
                        />
                         {crearMarca && (
                        <InputField 
                        label="Nueva Marca"
                        name="nuevaMarca"
                        value={nuevaMarca}
                        onChange={(e:any) => setNuevaMarca(e.target.value)}/>
                        )}
                        <SelectField
                        label="Modelo"
                        name="modelo"
                        value={formEditar.modelo}
                        onChange={handleChange}
                        options={modelos}
                        />
                        {crearModelo && (
                        <InputField
                        label="Nuevo Modelo"
                        name="nuevoModelo"
                        value={nuevoModelo}
                        onChange={(e:any) => setNuevoModelo(e.target.value)} />
                        )}
                        <SelectField
                        label="Tipo Tecnología"
                        name="tipo_tecnologia"
                        value={formEditar.tipoTecnologia}
                        options={tecnologias}
                        onChange={handleChange}
                        />
                    <SelectField
                    label="Ubicación"
                    name="ubicacion"
                    value={formEditar.ubicacion}
                    onChange={(e) => setFormEditar(
                            {
                                ...formEditar,
                                ubicacion:Number(e.target.value)
                            }
                        )}
                    options={ubicaciones}
                    />
                    {crearUbicacion && (
                        <InputField
                        label="Nueva Ubicación"
                        name="nuevaUbicacion"
                        value={nuevaUbicacion}
                        onChange={(e:any) => setNuevaUbicacion(e.target.value)} />
                    )}
                    {error && (
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>
                    )}
                </div>  
                    {error && (
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>
                    )}
                     <div className="border-t p-4">
                <p className="font-semibold text-sm mb-2">
                    Estado del Equipo
                </p>
                <div className="flex gap-4 flex-wrap">
                    <label className="flex gap-4 flex-wrap">
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
                </div>
            </div>   
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
            <button type="submit">
                 Actualizar equipo
                </button>
            </form>
            </Card>
        )}
        </PageContainer>
    )

}