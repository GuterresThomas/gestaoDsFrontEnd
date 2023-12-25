import NavListMenu from "@/components/NavBar"
import CardComTabsParaAdicionarPaciente from "../../components/CardComTabsParaAdicionarPaciente"
import Image from "next/image"

export default function PageAddPaciente() {
    return (
        <div className="bg-blue-gray-50 h-screen">
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
                <CardComTabsParaAdicionarPaciente/>
            </div>
      </div>
    )
}