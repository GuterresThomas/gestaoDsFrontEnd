'use client'
import { Input, Avatar, Select, Option, Textarea, Button, Typography } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/20/solid"
import { useState, useEffect } from "react"

interface FormData {
    paciente: string;
    apelido: string;
    nacionalidade: string;
    dataDeNascimento: string;
    cpf: string;
    rg: string;
    genero: string;
    estadoCivil: string;
    observacoesAdicionais: string;
  }

  interface InformacoesPacientesFormProps {
    formState: FormData;
    onFormChange: (fieldName: keyof FormData, value: string) => void;
    onSubmit: () => void;
  }
  


export default function InformacoesPacientesForm({ formState, onFormChange, onSubmit}: InformacoesPacientesFormProps) {
    const [paciente, setPaciente] = useState("");
    const [apelido, setApelido] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
    const [dataDeNascimento, setDataDeNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [genero, setGenero] = useState<string | null>(null);
    const [estadoCivil, setEstadoCivil] = useState<string | null>(null);
    const [observacoesAdicionais, setObservacoesAdicionais] = useState("")
    
    const handleInputChange = (fieldName: keyof FormData, value: string) => {
        onFormChange(fieldName, value);
        // Update state based on the field name
        switch (fieldName) {
            case 'paciente':
                setPaciente(value);
                break;
            case 'apelido':
                setApelido(value);
                break;
            case 'nacionalidade':
                setNacionalidade(value);
                break;
            case 'dataDeNascimento':
                setDataDeNascimento(value);
                break;
            case 'cpf':
                setCpf(value);
                break;
            case 'rg':
                setRg(value);
                break;
            case 'genero':
                setGenero(value);
                break;
            case 'estadoCivil':
                setEstadoCivil(value);
                break;
            case 'observacoesAdicionais':
                setObservacoesAdicionais(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página
        
        // Aqui você pode implementar a lógica de validação dos dados, por exemplo:
        if (paciente.trim() === '' || apelido.trim() === '' /* Adicione outras validações conforme necessário */) {
          // Exemplo de validação simples, aqui você pode exibir mensagens de erro ou realizar outras ações
          console.log('Por favor, preencha todos os campos obrigatórios.');
          return;
        }
        
        console.log()
        // Se todos os campos estiverem preenchidos corretamente, chame a função onSubmit recebida por props
        onSubmit();
      }; 
    


    return(
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
                style={{width: 400, height: 50}}
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
                style={{width: 400, height: 50}}
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
                style={{width: 400, height: 50}}
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
                style={{width: 400, height: 50}}
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
                style={{width: 400, height: 50}}
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
                style={{width: 400, height: 50}}
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
                style={{width: 400, height: 50}}
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
                
                style={{width: 400, height: 50}}
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
    )
}