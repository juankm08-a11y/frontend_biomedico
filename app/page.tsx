import FormularioRegistroEquipo from "@/components/equipos/FormularioRegistrarEquipo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <FormularioRegistroEquipo/>
    </div>
  );
}
