"use client"
import { useAction } from "@/hooks/useAction";
import { useError } from "@/hooks/useError";
import { UseForm } from "@/hooks/useForm";
import { useHandle } from "@/hooks/useHandle";
import PageContainer from "../ui/layout/PageContainer";
import { useRouter } from "next/navigation";
import { EquipoRequest } from "@/types/equipo.type";
import { equipoToForm } from "@/mappers/equipo.mapper";
import { crearEquipo } from "@/services/equipo.service";
import InputField from "../ui/input/InputField";
import SelectField from "../ui/input/SelectField";
import { useState } from "react";

export default function FormularioRegistroEquipo() {
    const router = useRouter();
    const [crearMarca,setCrearMarca] = useState(false)
    const [crearModelo,setCrearModelo] = useState(false)
    const [crearTecnologia,setCrearTecnologia] = useState(false)
    const [crearFabricante,setCrearFabricante] = useState(false)
    const [crearUbicacion,setCrearUbicacion] = useState(false)

    const [nuevaMarca,setNuevaMarca] = useState("")
    const [nuevoModelo, setNuevoModelo] = useState("");
    const [nuevaTecnologia,setNuevaTecnologia] = useState("")
    const [nuevoFabricante,setNuevoFabricante] = useState("")
    const [nuevaUbicacion,setNuevaUbicacion] = useState("")

    const {formData,handleChange} = 
    UseForm<EquipoRequest>(equipoToForm())

    const {error } = useError()

    const {execute:crear,loading} = useAction(crearEquipo)

    const {handle} = useHandle()

    const handleSubmit = (e:any) => {
        e.preventDefault()

        const data = {
            ...formData,
            nuevaMarca,
            nuevoModelo,
            nuevaTecnologia,
            nuevoFabricante,
            nuevaUbicacion
        }

        handle(() => crear(data))

        router.push("/dashboard")
    }

    const marcas = [
        {value:"1",label:"Philips"},
        {value:"2",label:"GE Healthcare"},
        {value:"3",label:"Siemenens"},
        {value:"4",label:"Mindray"},
        {value:"5",label:"Drager"},
        {value:"new",label:"+ Crear nueva marca"}
    ]

    const modelos = [
        {value:"1",label:"Philips Medical System"},
        {value:"2",label:"GE Healthcare"},
        {value:"3",label:"Siemenens Healthineers"},
        {value:"4",label:"Mindray Bio-Medical Electronics"},
        {value:"5",label:"Dragerwerk AG"},
        {value:"new",label:"Crear nuevo modelo"}
    ]

    const tecnologias = [
        {value:"1",label:"Philips Medical System"},
        {value:"2",label:"GE Healthcare"},
        {value:"3",label:"Siemenens Healthineers"},
        {value:"4",label:"Mindray Bio-Medical Electronics"},
        {value:"5",label:"Dragerwerk AG"},
        {value:"new",label:"+ Crear nueva tecnologia"}
    ]

    const fabricantes = [
        {value:"1",label:""},
        {value:"2",label:"Imagenología"},
        {value:"3",label:"Soporte Vital"},
        {value:"4",label:"Diagnóstico"},
        {value:"5",label:"Terapéutico"},
        {value:"new",label:"+ Crear nuevo fabricante"}
    ]

    const ubicaciones = [
        {value:"1",label:"Pabón - UCI 6 piso"},
        {value:"2",label:"Pabón - Hemodinamia"},
        {value:"3",label:"Centro Cuidados - Farmacia"},
        {value:"4",label:"Centro Cuidados - Laboratorio"},
        {value:"new",label:"+ Crear nueva Ubicacion"}
    ]

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

    return (
        <PageContainer>
            <form onSubmit={handleSubmit} className="bg-white border shadow-lg">7
                <div className="flex justify-between items-center border-b p-4">
                     <h1 className="text-xl font-bold">
                        HOJA DE VIDA DEL EQUIPO BIOMÉDICO
                    </h1>
                </div>
                <div className="p-6 border-b">
                    <h2 className="font-semibold mb-4">
                        I. INFORMACIÓN GENERAL
                    </h2>

                    {error && (
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>
                    )}
                </div>
                <div className="grid grid-cols gap-4">
                 <InputField
                    label="Nombre del Equipo"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
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
                </div>
                <div className="mt-4">
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
                </div>
                <div className="p-6 border-b">
                    <h2 className="font-semibold mb-4">
                        II. DOCUMENTACIÓN
                    </h2>
                    <button type="button" className="border px-4 py-2 hover:bg-gray-100">
                        Subir archivo
                    </button>
                    <button type="button" className="border px-4 py-2 hover:bg-gray-100">
                        Ver archivos
                    </button>
                </div>
                <div className="flex gap-4">
                    <button type="button" className="border px-4 py-2 hover:bg-gray-100">
                        Generar QR
                    </button>
                     <button type="button" className="border px-4 py-2 hover:bg-gray-100">
                        Ver QR
                    </button>
                </div>
                <div className="flex justify-end gap-4 p-4">
                    <button className="px-6 py-2 bg-red-600 text-white hover:bg-red-700" disabled={loading}>
                        {loading ? "Guardando...":"Guardar Equipo"}
                    </button>
                    <button className="border px-6 py-2" type="button" onClick={() => router.push("/dashboard")}>
                        Cancelar
                    </button>
                </div>
            </form>
        </PageContainer>
    )
}