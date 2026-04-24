"use client";

import { useRouter } from "next/router";
import { UseForm } from '../../hooks/useForm';
import { LoginRequest } from "@/types/auth/login.type";
import { useAction } from "@/hooks/useAction";
import { iniciarSesion } from "@/services/auth/login.service";
import { useHandle } from "@/hooks/useHandle";
import { useError } from "@/hooks/useError";
import AuthLayout from "../ui/layout/AuthLayout";
import AuthForm from "../ui/form/AuthForm";
import InputField from "../ui/input/InputField";
import PrimaryButton from "../ui/button/PrimaryButton";

export default function InicioSesionPage() {
    const router = useRouter()

    const {formData,handleChange} =
    UseForm<LoginRequest>({
        correo:"",
        password:""
    })

    const {execute:login,loading} = useAction(iniciarSesion);
    const {handle} = useHandle()
    const {error} = useError()
    
    const handleSubmit = (e:any) => {
        e.preventDefault()

        handle(async () => {
            const response = await login(formData)

            localStorage.setItem("usuario",response.usuario)
            localStorage.setItem("rol",response.rol)

            document.cookie = `rol=${response.rol}; path=/`

            router.push("/dashboard");
        })
    }

    const actions = [
        {
            label: "¿Olvidaste tu contraseña?",
            action:() => console.log("Olvidaste tu contraseña")
        },
        {
            label:"No puedes acceder a tu cuenta?",
            action: () =>console.log("No puedes acceder a tu cuenta")
        },
    ]

    return (
        <AuthLayout>
            <AuthForm title="Bienvenido" subtitle="Ingresa tus credenciales" onSubmit={handleSubmit}>
                  {error && (
                    <p className="text-red-500">
                    {error}
                    </p>
                    )}
                    <InputField
                    label="Correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    />
                    <InputField
                    label="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                    <PrimaryButton type="submit" 
                    text={loading ? "Ingresando...":"Iniciar Sesión"}
                    />
                       <div className="flex flex-col items-start gap-1 mt-4">
                            {actions.map((item) => (
                            <button
                                type="button"
                                key={item.label}
                                className="text-sm text-[var(--color-primary)] hover:underline"
                                onClick={() => console.log("Hola desde Login")}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
            </AuthForm>
        </AuthLayout>
    )
}