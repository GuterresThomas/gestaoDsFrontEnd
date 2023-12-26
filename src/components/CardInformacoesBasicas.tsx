"use client"
import { ArrowPathIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid";
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
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
 
  export default function CardPacientesHomePage() {
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);
        
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        }
      };
    }, []);

        // Retorna um placeholder ou estado de carregamento se windowWidth ainda não está disponível
      if (!windowWidth) {
        return <div className="flex justify-center">
            <EllipsisHorizontalIcon style={{height:40}}/>
          </div>;
      }

      // Renderiza o componente após windowWidth ficar disponível
 
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
                                placeholder="  Pesquisar"
                                className="w-full"
                                style={{ padding: '20px' }}
                            />
                            <div className="absolute pointer-events-none">
                              <MagnifyingGlassIcon className="h-5 text-blue-500" /> 
                            </div>
                        </div>
                        <a href="/addPaciente">  
                          <Button className="flex ml-1 p-2 md:w-full bg-blue-500" type="submit"
                          >
                              <PlusIcon 
                                className="h-7 mt-1" 
                                style={{ display: windowWidth < 640 ? 'none' : 'block' }}>
                              </PlusIcon>
                              <Typography className="font-bold sm:text-xs md:text-md p-1">Adicionar paciente</Typography>
                          </Button>
                        </a>  
                </div>
            </CardHeader>
            <TabelaInformacoesBasicas/>
        </CardBody>
      </Card>
    );
  }