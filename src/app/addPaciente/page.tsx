import CardComTabsParaAdicionarPaciente from "../../components/CardComTabsParaAdicionarPaciente"
import Image from "next/image"

export default function PageAddPaciente() {
    return (
        <div className="bg-blue-gray-50 h-screen">
            <div className="flex justify-center">
                <Image
                src="/logo.svg"
                width={200}
                height={200}
                alt="logo"
                />
            </div>  
            <div>
                <CardComTabsParaAdicionarPaciente/>
            </div>
      </div>
    )
}