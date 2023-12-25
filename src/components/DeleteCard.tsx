"use client"

import { XMarkIcon } from "@heroicons/react/20/solid"
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react"
import Image from "next/image"

export default function DeleteCard() {
    return(
        <Card>
            <CardHeader className="flex justify-start" style={{height: 60, margin: 0, marginTop: -48}}>
                <Typography className=" text-xl top-0 font-semibold text-purple-500" style={{margin: 20,}}>Excluir Paciente?</Typography>
            </CardHeader>
            <CardBody style={{borderBottom: '1px solid rgb(215,215,215)'}}>
                <div className="flex justify-center">
                    <Image src="/deleteCardFigure.svg"
                    width={100}
                    height={100}
                    alt="figura com dúvida"/>
                </div>
                <Typography className="flex justify-center ">
                Tem certeza que deseja excluir o paciente selecionado?
                <br/>
                </Typography>
                
                <Typography className="font-bold flex justify-center text-xl">
                Essa ação não poderá ser desfeita.
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-end">        
                <Button className="bg-transparent" style={{border: '1px solid blue', marginRight: 10}}>
                    <Typography className=" text-light-blue-500 font-semibold">Cancelar</Typography>
                </Button>
                <Button className="bg-red-500">
                    <Typography className="font-semibold">Excluir</Typography>
                </Button>
            </CardFooter>
        </Card>
    )
}