"use client"
import { Button, Card, Input, Typography, Option, Textarea } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import ContatoForm from "./formComponents/contatoForm";
import { UserCircleIcon } from "@heroicons/react/20/solid"
import Select from "@material-tailwind/react/components/Select";



export default function CardComTabsParaAdicionarPaciente() {
  const [paciente, setPaciente] = useState("");
  const [apelido, setApelido] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [genero, setGenero] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [observacoesAdicionais, setObservacoesAdicionais] = useState("")
  const [activeTab, setActiveTab] = useState("informacoesBasicas");
  const [formState, setformState] = useState({
    paciente: "",
    apelido: "",
    nacionalidade: "",
    dataDeNascimento: "",
    cpf: "",
    rg: "",
    genero: "",
    estadoCivil: "",
    observacoesAdicionais: "",
  })

  const handleTabChange = (tabId: React.SetStateAction<string>) => {
    setActiveTab(tabId);
  };
  
  useEffect(() => {
    // Lógica a ser executada quando a aba ativa mudar
    console.log("A aba ativa mudou:", activeTab);
  }, [activeTab]);
  
  const handleInputChange = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "paciente":
        setPaciente(value);
        break;
      case "apelido":
        setApelido(value);
        break;
      case "nacionalidade":
        setNacionalidade(value);
        break;
      case "dataDeNascimento":
        setDataDeNascimento(value);
        break;
      case "cpf":
        setCpf(value);
        break;
      case "rg":
        setRg(value);
        break;
      case "genero":
        setGenero(value);
        break;
      case "estadoCivil":
        setEstadoCivil(value);
        break;
      case "observacoesAdicionais":
        setObservacoesAdicionais(value);
        break;
      default:
        break;
    }
  };
  

  const handleToggleTab = () => {
    handleSubmit();
    // Verifica a aba ativa e alterna para a outra aba
    setActiveTab(activeTab === "informacoesBasicas" ? "contato" : "informacoesBasicas");
  };
  const handleSubmit = () => {
    // Atualiza o estado formState com os dados do formulário
    const formData = {
      paciente,
      apelido,
      nacionalidade,
      dataDeNascimento,
      cpf,
      rg,
      genero,
      estadoCivil,
      observacoesAdicionais,
    };
    // Salva os dados do formulário no estado formState
    setformState(formData);
    console.log(formData)
    // Salvar os dados do formulário no localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    setformState({
      paciente: "",
      apelido: "",
      nacionalidade: "",
      dataDeNascimento: "",
      cpf: "",
      rg: "",
      genero: "",
      estadoCivil: "",
      observacoesAdicionais: "",
    })
  };


  
  
  const renderTabContent = () => {
    if (activeTab === "informacoesBasicas") {
      return (
        <Card className="w-full">
          <div className="p-10">
        <div>
            <UserCircleIcon style={{height: 200}}/>
        </div>
        <form className="flex flex-wrap justify-start" onSubmit={handleSubmit}>
            <div className="p-2">
                <label htmlFor="Paciente">Paciente</label>
                <Input
                type="text"
                value={paciente}
                crossOrigin={undefined}
                className=""
                style={{width: 375, height: 50}}
                placeholder="Paciente"
                onChange={(e) => handleInputChange('paciente', e.target.value)}
                />
            </div>
            <div className="p-2">
                <label htmlFor="Apelido">Apelido</label>
                <Input
                value={apelido}
                type="text"
                crossOrigin={undefined}
                className=""
                style={{width: 375, height: 50}}
                placeholder="Apelido"
                onChange={(e) => handleInputChange('apelido', e.target.value)}
                />
            </div>
            <div className="p-2">
                <label htmlFor="Nacionalidade">Nacionalidade</label>
                <Input
                value={nacionalidade}
                type="text"
                crossOrigin={undefined}
                className=""
                style={{width: 375, height: 50}}
                placeholder="Nacionalidade"
                onChange={(e) => handleInputChange('nacionalidade', e.target.value)}
                />
            </div>
            <div className="p-2">
                <label htmlFor="Nascimento">Nascimento</label>
                <Input
                value={dataDeNascimento}
                type="date"
                crossOrigin={undefined}
                style={{width: 375, height: 50}}
                placeholder="Nascimento"
                onChange={(e) => handleInputChange('dataDeNascimento', e.target.value)}
                />
            </div>
            <div className="p-2">
                <label htmlFor="CPF">CPF</label>
                <Input
                value={cpf}
                type="text"
                crossOrigin={undefined}
                className=""
                style={{width: 375, height: 50}}
                placeholder="Digite"
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                />
            </div>
            <div className="p-2">
                <label htmlFor="RG">RG</label>
                <Input
                value={rg}
                type="text"
                crossOrigin={undefined}
                className=""
                style={{width: 375, height: 50}}
                placeholder="Digite"
                onChange={(e) => handleInputChange('rg', e.target.value)}
                />
            </div>
            <div className="p-2">
                <label htmlFor="Gênero">Gênero</label>
                    <Select
                    value={genero || ""}
                    label="Gênero"
                    onChange={(value) => handleInputChange('genero', value|| "")} 
                    style={{width: 375, height: 50}}
                    >
                        <Option value="Masculino">Masculino</Option>
                        <Option value="Feminino">Feminino</Option>
                        <Option value="Outro">Outro</Option>
                    </Select>
                    
                </div>
                <div className="p-2">
                    <label htmlFor="Estado Civil">Estado Civil</label>
                    <Select
                    value={estadoCivil || ""}
                    label="Estado civil"
                    onChange={(value) => handleInputChange('estadoCivil', value|| "")} 
                    
                    style={{width: 375, height: 50}}
                    >
                        <Option>Casado(a)</Option>
                        <Option>Solteiro(a)</Option>
                        <Option>Viuvo(a)</Option>
                    </Select>
                </div>
                <div className="w-full">
                    <label htmlFor="Observaçoes Adicionais">Observações Adicionais</label>
                    <Textarea
                    onChange={(e) => handleInputChange('observacoesAdicionais', e.target.value)}
                    value={observacoesAdicionais}
                    label="Observações Adicionais"
                    />
                </div>
            </form>   
        </div>                   
            <div className="flex justify-end">
                <Button className="p-3 text-lg bg-blue-500" onClick={handleToggleTab}>Próximo</Button>
            </div>
        </Card>
      );
    } else if (activeTab === "contato") {
      return (
        <Card className="p-2">
          {/* Conteúdo para a aba de Contato */}
                <ContatoForm />
        </Card>
      );
    }
  };
  return (
    <div className="p-10">
      <div className="bg-white p-3">
        {/* Renderiza as guias (abas) */}
        <button  className="text-xl ml-1" onClick={() => handleTabChange("informacoesBasicas")}>
          <Typography style={{fontSize: "x-large",  borderBottom: activeTab === "informacoesBasicas" ? "2px solid purple" : "none"}}>Informações Básicas</Typography>
        </button>
        <button  className="text-xl ml-1" onClick={() => {handleTabChange("contato"); handleSubmit()}}>
            <Typography style={{fontSize: "x-large",  borderBottom: activeTab === "contato" ? "2px solid purple" : "none"}}>Contato</Typography>
        </button>
      </div>
      <Card style={{marginLeft:1, marginBottom:1, marginRight: 1,}}>
        {renderTabContent()}
      </Card>
    </div>
  );
}