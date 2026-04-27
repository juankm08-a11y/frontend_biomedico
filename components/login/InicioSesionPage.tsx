"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { UseForm } from "../../hooks/useForm";
import { LoginRequest } from "@/types/auth/login.type";
import { useAction } from "@/hooks/useAction";
import { iniciarSesion } from "@/services/auth/login.service";
import { useError } from "@/hooks/useError";
import InputField from "../ui/input/InputField";

const features = [
    {
        title: "Hojas de vida",
        desc: "Registro completo y actualizado de cada equipo biomédico.",
    },
    {
        title: "Mantenimientos preventivos y correctivos",
        desc: "Programa, ejecuta y documenta intervenciones técnicas.",
    },
    {
        title: "Reportes y trazabilidad",
        desc: "Consulta el estado e historial de cada equipo en tiempo real.",
    },
    {
        title: "Usuarios y roles",
        desc: "Control de acceso por rol dentro de la clínica.",
    },
];

export default function InicioSesionPage() {
    const router = useRouter();

    const { formData, handleChange } = UseForm<LoginRequest>({
        correo: "",
        password: "",
    });

    const { error, handleError } = useError();
    const { execute: login, loading } = useAction(iniciarSesion);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await login(formData);
        if (!response) return;

        localStorage.setItem("usuario", response.usuario);
        localStorage.setItem("rol", response.rol);
        document.cookie = `rol=${response.rol}; path=/; SameSite=Lax`;

        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* PANEL IZQUIERDO — Branding + información de la app */}
            <aside className="relative hidden lg:flex flex-col justify-between p-12 text-white overflow-hidden bg-gradient-to-br from-[#d71920] via-[#b2141a] to-[#7a0d12]">
                <div className="relative z-10 max-w-lg">
                    <div className="inline-block rounded-xl bg-white p-4 shadow-lg">
                        <Image
                            src="/icons/LOGO CLINICA para premiere.png"
                            alt="Clínica Pabón"
                            width={180}
                            height={90}
                            priority
                        />
                    </div>

                    <h1 className="mt-10 text-4xl font-bold leading-tight">
                        Gestión de Equipos <br /> Biomédicos
                    </h1>
                    <p className="mt-4 text-white/90">
                        Plataforma interna de Clínica Pabón para controlar el
                        inventario, el mantenimiento y la trazabilidad de todos
                        los equipos biomédicos de la institución.
                    </p>

                    <ul className="mt-10 space-y-4">
                        {features.map((f) => (
                            <li key={f.title} className="flex gap-3">
                                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                                    ✓
                                </span>
                                <div>
                                    <p className="font-semibold">{f.title}</p>
                                    <p className="text-sm text-white/80">
                                        {f.desc}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative z-10 text-xs text-white/70">
                    © {new Date().getFullYear()} Clínica Pabón — Todos los
                    derechos reservados.
                </p>

                {/* Mascota decorativa: Dr. Wertino */}
                <Image
                    src="/images/PABONCITO QUIROFANO 2025.png"
                    alt=""
                    aria-hidden
                    width={320}
                    height={320}
                    className="pointer-events-none absolute -bottom-4 -right-4 select-none opacity-95 drop-shadow-2xl"
                />
            </aside>

            {/* PANEL DERECHO — Formulario de inicio de sesión */}
            <section className="flex items-center justify-center bg-white p-6 sm:p-10">
                <div className="w-full max-w-md">
                    {/* Encabezado visible solo en móvil */}
                    <div className="mb-8 flex justify-center lg:hidden">
                        <Image
                            src="/icons/LOGO CLINICA para premiere.png"
                            alt="Clínica Pabón"
                            width={160}
                            height={80}
                            priority
                        />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Bienvenido
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Ingresa tus credenciales para acceder al sistema.
                        </p>
                    </div>

                    {error && (
                        <div
                            role="alert"
                            className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                        >
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <InputField
                            label="Correo"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full rounded-lg bg-[var(--color-primary)] py-3 font-semibold text-white transition hover:bg-[#b2141a] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Ingresando..." : "Iniciar Sesión"}
                        </button>
                    </form>

                    <div className="mt-6 flex flex-col items-start gap-2">
                        <button
                            type="button"
                            className="text-sm text-[var(--color-primary)] hover:underline"
                            onClick={() => router.push("/recovery-password")}
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                        <button
                            type="button"
                            className="text-sm text-[var(--color-primary)] hover:underline"
                            onClick={() => router.push("/recovery-account")}
                        >
                            ¿No puedes acceder a tu cuenta?
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
