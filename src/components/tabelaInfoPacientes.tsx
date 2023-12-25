"use client"
import { XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ArrowsUpDownIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import {
    Card,
    Button,
    Typography,  
    Dialog,
    DialogBody,
   } from "@material-tailwind/react";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import EditForm from "./formComponents/editForm";
import DeleteCard from "./DeleteCard";
 
const TABLE_HEAD = ["Nome", "CPF", "Data de nascimento", "Cidade", "Ações"];
 
 
export default function TabelaInformacoesBasicas() {
    const [open, setOpen] = useState(false); 
    const [patients, setPatients] = useState([]);
    const [openEditForm, setOpenEditForm] = React.useState(false);
    const [openDeleteCard, setOpenDeleteCard] = React.useState(false);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3000/api/v1/pacientes');
              setPatients(response.data);
          } catch (error) {
              console.error('Erro ao buscar pacientes:', error);
          }
      };

      fetchData();
  }, []);


  const handleOpen = (patientId: number) => {
    setOpen(true);
    //setSelectedPatientId(patientId);
    // Armazenar o ID do paciente no localStorage
    localStorage.setItem('selectedPatientId', patientId.toString());
    console.log('id selecionado: ', patientId)
    console.log(typeof patientId)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEditForm = () => {
  setOpenEditForm(true);
  const patientIdFromLocalStorage = localStorage.getItem('selectedPatientId');
  console.log('id no momento da abertura do modal de edição: ', patientIdFromLocalStorage)
  console.log(typeof patientIdFromLocalStorage)
}

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  };


  const handleOpenDeleteCard = () => {
    setOpenDeleteCard(true);
    const patientIdFromLocalStorage = localStorage.getItem('selectedPatientId');
    console.log('id no momento da abertura do modal de exclusão: ', patientIdFromLocalStorage)
    console.log(typeof patientIdFromLocalStorage)
  }

  const handleCloseDeleteCard = () => {
    setOpenDeleteCard(false)
  }
 
  return (
    <Card className="h-full w-full" style={{overflowY: 'auto',}}>
      <table className="w-full min-w-max table-auto text-left">
        <thead style={{overflowY: 'auto'}}>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <div className="flex">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    >
                    {head} 
                    </Typography>
                    <ArrowsUpDownIcon className="h-4 ml-1 text-blue-500 cursor-pointer"></ArrowsUpDownIcon>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {patients.map(({id, paciente, cpf, dataDeNascimento, cidade }, index) => (
                <tr key={index} className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}>
                    <td className="p-4">
                        <Typography as="a" href="#" variant="small" className="font-medium text-blue-500">
                            {paciente} 
                        </Typography>
                    </td>
                    <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {cpf}
                        </Typography>
                    </td>
                    <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {dataDeNascimento}
                        </Typography>
                    </td>
                    <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {cidade}
                        </Typography>
                    </td>
                    <td className="p-4 bg-white">
                        <Typography as="a" href="#" variant="small" className="font-medium bg-white">
                            <EllipsisHorizontalIcon className="h-5 text-black bg-white" onClick={() => handleOpen(id)}/>
                        </Typography>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
      <Dialog
        open={open}
        handler={handleOpen}
        style={{height: 250}}
      >
        <DialogBody className=" p-5">
        <XMarkIcon
          style={{ height: 40 }}
          className="absolute top-0 right-0 cursor-pointer mt-5 mb-5 mr-0"
          onClick={handleClose}
        />
          <Button style={{marginBottom: 15, marginTop: 15}} onClick={() => handleOpenEditForm()} className="bg-gray-300 w-full hover:bg-blue-gray-200 text-black p-5 m-5">
            Editar
          </Button>
          <br/>
          <Button onClick={() => {handleOpenDeleteCard()}} className="bg-gray-300 w-full hover:bg-blue-gray-200 text-black p-5 m-5">
            Excluir
          </Button>
        </DialogBody>
      </Dialog>
      <Dialog
        size="xs"
        open={openEditForm}
        handler={handleOpenEditForm}
        className="bg-transparent shadow-none"
      >
        <Card style={{overflowY: 'auto', scrollbarWidth: 'thin', height: 600, padding: 30, margin: -30}}>
          <div className="">
            <XMarkIcon style={{height: 40, cursor: 'pointer'}} onClick={handleCloseEditForm}></XMarkIcon>
            <EditForm/>
          </div>
        </Card>
      </Dialog>
      <Dialog
        size="xs"
        open={openDeleteCard}
        handler={handleOpenDeleteCard}
        className="bg-transparent shadow-none"
      >
        <Card className="" style={{ overflowY: 'auto', scrollbarWidth: 'thin'}}>
        <div className="flex justify-end" style={{height:50}}>
          <XMarkIcon
            style={{height: 30, cursor: 'pointer', marginTop:18, marginRight: 10, zIndex: 9999 }}
            onClick={handleCloseDeleteCard}
          />
        </div>
        <DeleteCard handleClose={handleCloseDeleteCard}/>
      </Card>
      </Dialog>
    </Card> 
  );
}