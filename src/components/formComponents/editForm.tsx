"use client"
import { useEffect, useState } from "react";
import { Input, Button, Select, Option, Textarea, Alert } from "@material-tailwind/react";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import React from "react";


interface EditFormData {
    paciente: string;
    apelido: string;
    nacionalidade: string;
    dataDeNascimento: string;
    cpf: string;
    rg: string;
    genero: string;
    estadoCivil: string;
    observacoesAdicionais: string;   
    cep: string;
    cidade: string;
    uf: string;
    endereco: string;
    numero: string;
    bairro: string;
    complemento: string;
}

export default function EditForm() {

  const [editFormState, setEditFormState] = useState<EditFormData>({
    paciente: "",
    apelido: "",
    nacionalidade: "",
    dataDeNascimento: "",
    cpf: "",
    rg: "",
    genero: "",
    estadoCivil: "",
    observacoesAdicionais: "",   
    cep: "",
    cidade: "",
    uf: "",
    endereco: "",
    numero: "",
    bairro: "",
    complemento: "",
  });
  const [patientId, setPatientId] = useState<number | null>(null);
  const patientIdFromLocalStorage = localStorage.getItem('selectedPatientId');
  const [open, setOpen] = React.useState(false);
  const [openErrorMessage, setOpenErrorMessage] = React.useState(false);
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


  
  
    let parsedPatientId: number | null = null;

    if (patientIdFromLocalStorage && !isNaN(parseInt(patientIdFromLocalStorage, 10))) {
    parsedPatientId = parseInt(patientIdFromLocalStorage, 10);
    }


  
  
  useEffect(() => {
    // Verifica se o ID do paciente existe no localStorage antes de fazer a requisição
    if (parsedPatientId) {
    // Quando o componente montar, definir o ID do paciente no estado
      setPatientId(parsedPatientId);
      const fetchPatientData = async () => {
        try {
          const response = await axios.get(`https://testepraticogestaodsapi.up.railway.app/api/v1/pacientes/${parsedPatientId}`);
          const patientData: EditFormData = response.data;
          // Atualiza o estado do formulário com os dados do paciente
          setEditFormState(patientData);
          localStorage.removeItem('selectedPatientId')
          console.log('id logo após abrir o modal de edição: ', parsedPatientId)
        } catch (error) {
          console.error('Erro ao buscar dados do paciente:', error);
        }
      };

      fetchPatientData();
    }
  }, [parsedPatientId]);

  

  const handleInputChange = (fieldName: keyof EditFormData, value: string) => {
    setEditFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
      id: patientId
    }));
  };

  const handleEditFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Id logo antes do envio: ', patientId)
    if (patientId && !isNaN(patientId)) {
    try {
      const response = await axios.put(`https://testepraticogestaodsapi.up.railway.app/api/v1/pacientes/${patientId}`, editFormState);
      console.log('Paciente atualizado com sucesso!', response.data);
      console.log('id armazenado no estado, na hora do envio: ', patientId)
      setOpen(true)
      setPatientId(null);
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      setOpenErrorMessage(true)
    }} else{
        console.error('ID do paciente inválido.');
    }
  };


  return (
    <div style={{ width: windowWidth < 640 ? '100%' : '100%' }}>
      <div>
            <UserCircleIcon style={{height: 200}}/>
        </div>
        <form className="flex flex-col" onSubmit={handleEditFormSubmit}>
            <div className="">
                <label htmlFor="Paciente">Paciente</label>
                <Input
                type="text"
                value={editFormState.paciente}
                crossOrigin={undefined}
                className=""
                style={{width: 375, borderRight: 'none', height: 50}}
                placeholder="Paciente"
                onChange={(e) => handleInputChange('paciente', e.target.value)}
                />
            </div>
            <div className="">
                <label htmlFor="Apelido">Apelido</label>
                <Input
                value={editFormState.apelido}
                type="text"
                crossOrigin={undefined}
                className=""
                style={{width: 375, borderRight: 'none',  height: 50}}
                placeholder="Apelido"
                
                onChange={(e) => handleInputChange('apelido', e.target.value)}
                />
            </div>
            <div className="">
                <label htmlFor="Nacionalidade">Nacionalidade</label>
                <Input
                value={editFormState.nacionalidade}
                type="text"
                crossOrigin={undefined}
                className=""
                style={{width: 375, borderRight: 'none',  height: 50}}
                placeholder="Nacionalidade"
                onChange={(e) => handleInputChange('nacionalidade', e.target.value)}
                />
            </div>
            <div className="">
                <label htmlFor="Nascimento">Nascimento</label>
                <Input
                value={editFormState.dataDeNascimento}
                type="date"
                crossOrigin={undefined}
                style={{width: 375, borderRight: 'none',  height: 50}}
                placeholder="Nascimento"
                onChange={(e) => handleInputChange('dataDeNascimento', e.target.value)}
                />
            </div>
            <div className="">
                <label htmlFor="CPF">CPF</label>
                <Input
                value={editFormState.cpf}
                type="text"
                crossOrigin={undefined}
                className=""
                style={{width: 375, borderRight: 'none',  height: 50}}
                placeholder="Digite"
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                />
            </div>
            <div className="">
                <label htmlFor="RG">RG</label>
                <Input
                value={editFormState.rg}
                type="text"
                crossOrigin={undefined}
                className=""
                style={{width: 375, borderRight: 'none',  height: 50}}
                placeholder="Digite"
                onChange={(e) => handleInputChange('rg', e.target.value)}
                />
            </div>
            <div className="">
                <label htmlFor="Gênero">Gênero</label>
                <Select
                value={editFormState.genero || ""}
                label="Gênero"
                onChange={(value) => handleInputChange('genero', value|| "")} 
                style={{width: 375, borderRight: 'none',  height: 50}}
                >
                    <Option value="Masculino">Masculino</Option>
                    <Option value="Feminino">Feminino</Option>
                    <Option value="Outro">Outro</Option>
                </Select>
                
            </div>
            <div className="">
                <label htmlFor="Estado Civil">Estado Civil</label>
                <Select
                value={editFormState.estadoCivil || ""}
                label="Estado civil"
                onChange={(value) => handleInputChange('estadoCivil', value|| "")} 
                
                style={{width: 375, borderRight: 'none',  height: 50}}
                >
                    <Option value="Casado">Casado(a)</Option>
                    <Option value="Solteiro">Solteiro(a)</Option>
                    <Option value="Viuvo">Viuvo(a)</Option>
                </Select>
            </div>
            <div className="w-full">
                <label htmlFor="Observaçoes Adicionais">Observações Adicionais</label>
                <Textarea
                onChange={(e) => handleInputChange('observacoesAdicionais', e.target.value)}
                value={editFormState.observacoesAdicionais}
                 label="Observações Adicionais"
                />
            </div>
            <div className="">
                  <label htmlFor="cep">cep</label>
                  <Input
                  onChange={(e) => handleInputChange('cep', e.target.value)}
                  type="text"
                  value={editFormState.cep}
                  crossOrigin={undefined}
                  className=""
                  style={{width: 375, borderRight: 'none',  height: 50}}
                  placeholder="cep"
                  />
              </div>
              <div className="">
                  <label htmlFor="cidade">Cidade</label>
                  <Input
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  type="text"
                  value={editFormState.cidade}
                  crossOrigin={undefined}
                  className=""
                  style={{width: 375, borderRight: 'none',  height: 50}}
                  placeholder="Cidade"
                  />
              </div>
              <div className="">
                  <label htmlFor="UF">UF</label>
                  <Input
                  onChange={(e) => handleInputChange('uf', e.target.value)}
                  type="text"
                  value={editFormState.uf}
                  crossOrigin={undefined}
                  className=""
                  style={{width: 375, borderRight: 'none',  height: 50}}
                  placeholder="UF"
                  />
              </div>
              <div className="">
                  <label htmlFor="Endereço">Endereço</label>
                  <Input
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  type="text"
                  value={editFormState.endereco}
                  crossOrigin={undefined}
                  style={{width: 375, borderRight: 'none',  height: 50}}
                  placeholder="Endereço"
                  />
              </div>
              <div className="">
                  <label htmlFor="Numero">Numero</label>
                  <Input
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                  type="text"
                  value={editFormState.numero}
                  crossOrigin={undefined}
                  className=""
                  style={{width: 375, borderRight: 'none',  height: 50}}
                  placeholder="Digite"
                  />
              </div>
              <div className="">
                  <label htmlFor="Bairro">Bairro</label>
                  <Input
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                  type="text"
                  value={editFormState.bairro}
                  crossOrigin={undefined}
                  className=""
                  style={{width: 375, borderRight: 'none',  height: 50}}
                  placeholder="Digite"
                  />
              </div>
              <div className="">
                  <label htmlFor="Complemento">Complemento</label>
                  <Input
                  onChange={(e) => handleInputChange('complemento', e.target.value)}
                  type="text"
                  crossOrigin={undefined}
                  value={editFormState.complemento}
                  label="Complemento"
                  style={{width: 375, borderRight: 'none',  height: 50}}
                  />
              </div>
              <div className="flex justify-between p-5">
                <Button className="text-lg p-3 bg-blue-500" type="submit">
                Salvar
                </Button>
              </div>
      </form>
      <Alert open={open} onClose={() => setOpen(false)}>
        Sucesso ao editar paciente.
    </Alert>
    <Alert open={openErrorMessage} onClose={() => setOpenErrorMessage(false)}>
        Erro ao editar paciente.
    </Alert>
    </div>
  );
};

