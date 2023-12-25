
import CardPacientesHomePage from "@/components/CardInformacoesBasicas"
import NavListMenu from "@/components/NavBar"
import Image from "next/image"

export default function Home() {
  return (
    <main className="bg-blue-gray-50 h-screen">
      <NavListMenu/>
      <div className="flex justify-center">
        <a href="/">
          <Image
          src="/logo.svg"
          width={200}
          height={200}
          alt="logo"
          />
        </a>
      </div>
      <div>
        <CardPacientesHomePage/>        
      </div>
    </main>
  )
}
