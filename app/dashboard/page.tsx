"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const [showMantenimientos,setShowMantenimientos] = useState(false);
    return (
        <div className="w-fit max-w-[90%] min-w-[400px] rounded-xl bg-white p-6 shadow-lg">
            {/* DASHBOARD + Panel Centrado */}
            <aside className="relative z-0  lg:flex flex-col justify-between p-12 text-white overflow-hidden bg-gradient-to-br">
                <div className="mx-auto w-fit max-w-[90%] min-w-[400px] rounded-xl bg-white p-6 shadow-lg">
                   <h1 className="mt-10 text-xl text-center text-black font-bold leading-tight">
                    Bienvenido a Panel administrativo
                    </h1>
                    <p className="mt-2 text-black/90">
                        Bienvenido a la Plataforma de Gestion de Equipos
                        Biomedicos para trazabilidad y seguiminto de equipos
                    </p>
                    <div className="flex gap-6 justify-center mt-4">
                         <button onClick={() => router.push("/equipos")} className="w-full text-black py-2 px-6 rounded-lg border border-black bg-gray-50">
                         Equipos
                        </button>
                        <button 
                        onClick={() => setShowMantenimientos(!showMantenimientos)}
                        className="w-full text-black py-2 px-6 rounded-lg border border-black bg-gray-50"
                        >
                            Mantenimientos
                         </button>
                        <button onClick={() => router.push("/reportes")} className="w-full text-black py-2 px-6 rounded-lg border border-black bg-gray-50">
                            Reportes
                        </button>
                    </div>
                   {showMantenimientos && (
                    <div className="flex gap-8 mt-3 justify-center transition-all duration-300">
                        <button
                        onClick={() =>{
                             router.push("/mantenimientos/correctivos/")
                        }}
                        className="py-2 rounded-lg text-black">
                            Correctivos
                        </button>
                         <button
                        onClick={() => router.push("/mantenimientos/preventivos/")}
                        className="text-black py-2 rounded-lg">
                            Preventivos
                        </button>
                    </div>
                   )}
                   {/* Se pondrian agregar graficos de barras, que traigan datos del apirest django */}
                </div>
            </aside>       
        </div>
    )
}