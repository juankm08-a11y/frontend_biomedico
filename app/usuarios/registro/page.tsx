"use client";

import PrimaryButton from "@/components/ui/button/PrimaryButton";
import Card from "@/components/ui/cards/Card";
import InputField from "@/components/ui/input/InputField";
import SelectField from "@/components/ui/input/SelectField";
import PageContainer from "@/components/ui/layout/PageContainer";
import { useError } from "@/hooks/useError";
import { registerUsuario } from "@/services/auth/register.service";
import { RegisterRequest } from "@/types/auth/register.type";
import { useState } from "react";

export default function UsuariosPage() {
    const [mostrarRegistro,setMostrarRegistro] = useState(false)

    const [form,setForm] = useState<RegisterRequest>({
        nombre:"",
        correo:"",
        password:"",
        rol:"administrador"
    })

    const {error,handleError} = useError()

    const [loading,setLoading] = useState(false)

    const handleChange = (e:any) => {
        const {name,value} = e.target;

        setForm({
            ...form,
            [name]:value
        })
    }

    const handleRegister = async (e:any) => {
        e.preventDefault()
        setLoading(true)

        try {
            await registerUsuario(form)

            alert("Usuario creado exitosamente")

            setForm({
                nombre:"",
                correo:"",
                password:"",
                rol:"administrador"
            })

            setMostrarRegistro(false)
        } catch (err) {
            handleError(err)
        } finally {
            setLoading(false)
        }
    } 
    return (
        <PageContainer>
            <Card>
                <div className="flex justify-between mb-4">
                    <h2>Bienvenido al panel administrativo</h2>

                    <PrimaryButton 
                    text={mostrarRegistro ? "Cerrar":"Crear Usuario"}
                    onClick={() => setMostrarRegistro(!mostrarRegistro)}
                    />
                </div>

                {mostrarRegistro && (
                    <form onSubmit={handleRegister} className="grid gap-4">
                        {error && (
                            <p className="text-red-500 text-sm">
                                {error}
                            </p>
                        )}
                        <InputField         
                        label="Nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        />
                        <InputField
                        label="Correo"
                        name="correo"
                        type="email"
                        value={form.correo}
                        onChange={handleChange}
                        />
                        <InputField
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        />
                        <SelectField
                        label="Rol"
                        name="rol"
                        value={form.rol}
                        onChange={handleChange}
                        options={[
                            { value: "superadministrador", label: "Super Administrador" },
                            { value: "administrador", label: "Administrador" },
                            {value:"coordinador",label:"Coordinador"},
                            {value:"ingenierobiomedico",label:"Ingeniero biomédico"},
                            {value:"tecnicobiomedico",label:"Técnico biomédico"}
                        ]}
                    />
                    <PrimaryButton 
                    type="submit"
                    text={loading ? "Registrando...":"Registrar"}
                    />
                    </form>
                )}
            </Card>
        </PageContainer>
    )
} 