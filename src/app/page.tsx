
import CardPacientesHomePage from "@/components/CardInformacoesBasicas"
import Image from "next/image"

export default function Home() {
  return (
    <main className="bg-blue-gray-50 h-screen">
      <div className="flex justify-center">
        <Image
        src="/logo.svg"
        width={200}
        height={200}
        alt="logo"
        />
      </div>
      <div>
        <CardPacientesHomePage/>        
      </div>
    </main>
  )
}
