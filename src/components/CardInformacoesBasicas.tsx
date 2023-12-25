'use client'
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Button,
    Input,
  } from "@material-tailwind/react";
  import TabelaInformacoesBasicas from "./tabelaInfoPacientes"
import { useEffect, useState } from "react";
 
  export default function CardPacientesHomePage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);
 
    return (
      <Card className=" max-w-[24rem] overflow-hidden">
        <CardBody className="">
            <CardHeader className="flex p-2 h-20 justify-between m-1">
              <Typography className="mt-4"
              style={{ display: windowWidth < 640 ? 'none' : 'block' }}
              >
                      Listagem de pacientes
              </Typography>
              <div className="flex items-center"> 
                        <div className="flex items-center">
                            <Input 
                                crossOrigin={undefined}
                                size="md"
                                placeholder="Pesquisar"
                                className="w-full"
                            />
                            <div className="absolute pointer-events-none">
                              <MagnifyingGlassIcon className="h-5 text-blue-500" /> 
                            </div>
                        </div>
                        <a href="/addPaciente">  
                          <Button className="flex ml-3 p-2 md:w-full bg-blue-500" type="submit"
                          >
                              <PlusIcon className="h-6"></PlusIcon>
                              <Typography className="font-bold text-md p-1">Adicionar paciente</Typography>
                          </Button>
                        </a>  
                </div>
            </CardHeader>
            <TabelaInformacoesBasicas/>
        </CardBody>
      </Card>
    );
  }