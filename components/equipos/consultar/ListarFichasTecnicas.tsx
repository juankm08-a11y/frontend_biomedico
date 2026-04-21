import PageContainer from "@/components/ui/layout/PageContainer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListarFichasTecnicas() {
    const router = useRouter()
    const [equipos,setEquipos] = useState<any[]>([])

    useEffect(() => {
        fetch("http://localhost:8000/api/equipos/")
        .then(res=>res.json())
        .then(data=>setEquipos(data))
    },[])

    return (
        <PageContainer>
              <h2>Fichas Técnicas de equipos</h2>

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
                    {equipos.map((equipo) => (
                        <tr key={equipo.id}>
                            <td>
                                {equipo.nombre}
                            </td>
                            <td>
                                {equipo.marca_nombre}
                            </td>
                            <td>
                                {equipo.serie}
                            </td>
                            <td>
                                 <button onClick={() => router.push(`/equipos/consultar/${equipo.id}`)}>
                                    Ver ficha técnica
                                 </button>
                            </td>
                        </tr>
                    ))}

                    
                </tbody>
            </table>
           </div>
        </PageContainer>
    )
}