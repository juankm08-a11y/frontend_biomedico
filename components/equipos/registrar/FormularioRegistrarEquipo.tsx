"use client"
import { useAction } from "@/hooks/useAction";
import { useError } from "@/hooks/useError";
import { UseForm } from "@/hooks/useForm";
import { useHandle } from "@/hooks/useHandle";
import PageContainer from "../../ui/layout/PageContainer";
import { useRouter } from "next/navigation";
import { equipoToForm } from "@/mappers/equipo.mapper";
import { crearEquipo } from "@/services/equipo.service";
import InputField from "../../ui/input/InputField";
import SelectField, { Option } from "../../ui/input/SelectField";
import { useEffect, useState } from "react";
import { EquipoRequest } from "@/types/Equipo.type";

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

    const [equipos,setEquipos] = useState<Option[]>([]);

    const {formData,handleChange} = 
    UseForm<EquipoRequest>(equipoToForm())

    useEffect(() => {
        fetch("http://localhost:8000/api/equipos/")
        .then(res => res.json())
        .then(data => {
              const options = data.map((e:any) => ({
            value:e.nombre,
            label:e.nombre
        }))

        setEquipos(options)
        })
    },[])

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
        <div className="border border-gray-400 p-2">
            {children}
        </div>
    )

    return (
        <PageContainer>
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
    </PageContainer>
    )
}