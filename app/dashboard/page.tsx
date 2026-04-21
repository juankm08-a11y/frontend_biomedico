"use client"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
    const router = useRouter()
    return (
        <div>
            Bienvenido al Dashboard
            {/*<RegistroHojaVidaEquipoPage/>*/ } 
            <button onClick={() => router.push("/equipos/")}>
                Hola
            </button>
        </div>
    )
}