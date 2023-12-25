"use client"

import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react"
import axios from "axios";
import Image from "next/image"
import React from "react";
import { useEffect, useState } from "react";

export default function DeleteCard({ handleClose }: { handleClose: () => void }){
    const [patientId, setPatientId] = useState<number | null>(null);
    const [open, setOpen] = React.useState(false);
    const [openErrorMessage, setOpenErrorMessage] = React.useState(false);
 

    useEffect(() => {
        const patientIdFromLocalStorage = localStorage.getItem('selectedPatientId');

        let parsedPatientId: number | null = null;

        if (patientIdFromLocalStorage && !isNaN(parseInt(patientIdFromLocalStorage, 10))) {
            parsedPatientId = parseInt(patientIdFromLocalStorage, 10);
            setPatientId(parsedPatientId);
        }
    }, []); // Executa apenas uma vez, quando o componente é montado

    const handleDelete = async () => {
        try {
            if (patientId) {
                const response = await axios.delete(`http://testepraticogestaodsapi.up.railway.app/api/v1/pacientes/${patientId}`);
                console.log(response.data); // Mensagem de confirmação ou outro feedback do backend
                setOpen(true)
            } else {
                console.error('ID do paciente inválido.');
            }
        } catch (error) {
            console.error('Erro ao excluir paciente:', error);
            // Trate erros ou forneça feedback ao usuário, se necessário
            setOpenErrorMessage(true)
        }
    };

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
                <Button className="bg-transparent" style={{border: '1px solid blue', marginRight: 10}}   onClick={handleClose}>
                    <Typography className=" text-light-blue-500 font-semibold">Cancelar</Typography>
                </Button>
                <Button className="bg-red-500" onClick={handleDelete}>
                    <Typography className="font-semibold">Excluir</Typography>
                </Button>
            </CardFooter>
            <Alert open={open} onClose={() => setOpen(false)}>
                Sucesso ao deletar paciente.
            </Alert>
            <Alert open={openErrorMessage} onClose={() => setOpenErrorMessage(false)}>
                Erro ao deletar paciente.
            </Alert>
        </Card>
    )
}