"use client"
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

interface ContatoFormData {
  cep: string;
  cidade: string;
  uf: string;
  endereco: string;
  numero: string;
  bairro: string;
  complemento: string;
}

export default function ContatoForm() {
  const [contatoFormState, setContatoFormState] = useState<ContatoFormData>({
    cep: "",
    cidade: "",
    uf: "",
    endereco: "",
    numero: "",
    bairro: "",
    complemento: "",
  });
  const [localStorageData, setLocalStorageData] = useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [openErrorMessage, setOpenErrorMessage] = React.useState(false);
 
  

  const handleInputChange = (fieldName: keyof ContatoFormData, value: string) => {
    setContatoFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));

    // Chama a função para buscar o CEP sempre que o campo CEP for alterado
    if (fieldName === 'cep') {
      pesquisacep(value);
    }
  };

  function pesquisacep(valor: string) {
     // Remove caracteres não numéricos do CEP
  const cep = valor.replace(/\D/g, '');

  // Verifica se o CEP possui 8 dígitos
  if (cep.length !== 8) {
    console.log('CEP inválido');
    return;
  }

  // URL da API ViaCEP para busca do CEP
  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(apiUrl)
    .then((response) => {
      // Verifica se a resposta da requisição está OK
      if (!response.ok) {
        throw new Error('Não foi possível obter os dados do CEP');
      }
      // Retorna os dados em formato JSON
      return response.json();
    })
    .then((data) => {
      // Atualiza o estado do formulário com os dados obtidos do CEP
      setContatoFormState((prevState) => ({
        ...prevState,
        endereco: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        uf: data.uf || "",
      }));
    })
    .catch((error) => {
      console.error('Ocorreu um erro ao buscar o CEP:', error);
      // Limpa os campos do formulário em caso de erro
      setContatoFormState((prevState) => ({
        ...prevState,
        endereco: "",
        bairro: "",
        cidade: "",
        uf: "",
        // Outros campos conforme necessário
      }));
    });
  }

  useEffect(() => {
     // Lógica para buscar dados do localStorage
     const savedFormData = localStorage.getItem('formData');

     // Se existirem dados no localStorage, atualize o estado do segundo formulário
     if (savedFormData) {
       const parsedSavedFormData: any = JSON.parse(savedFormData);
       setLocalStorageData(parsedSavedFormData); // Atualiza os dados do localStorage
     }
   }, []);

   const handleContatoFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const combinedFormData: ContatoFormData = {
      // Adiciona os dados do localStorage ao formulário de contato
      ...localStorageData,

      ...contatoFormState,
    };

    console.log("Dados combinados prontos para enviar:", combinedFormData);
    
    try {
      
      const response = await axios.post('https://testepraticogestaodsapi.up.railway.app/api/v1/pacientes', combinedFormData);
      
      
      console.log('Paciente criado com sucesso!', response.data);
      setOpen(true)
      // Limpa o localStorage após enviar os dados
      setContatoFormState({
        cep: "",
        cidade: "",
        uf: "",
        endereco: "",
        numero: "",
        bairro: "",
        complemento: "",
      });
  
      // Limpa os dados do localStorage
      localStorage.removeItem('formData');
      setLocalStorageData(null);
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      setOpenErrorMessage(true)
    }
  };
  const { cep, cidade, uf, endereco, numero, bairro, complemento } = contatoFormState;


  return (
    <div className="p-10">
        <div>
            <UserCircleIcon style={{height: 200}}/>
        </div>
        <form onSubmit={handleContatoFormSubmit}>
            <div className="flex flex-wrap justify-start">
              <div className="p-2">
                  <label htmlFor="cep">cep</label>
                  <Input
                  onChange={(e) => handleInputChange('cep', e.target.value)}
                  type="text"
                  value={cep}
                  crossOrigin={undefined}
                  className=""
                  style={{width: 400, height: 50}}
                  required
                  placeholder="cep"
                  />
              </div>
              <div className="p-2">
                  <label htmlFor="cidade">Cidade</label>
                  <Input
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  type="text"
                  value={cidade}
                  crossOrigin={undefined}
                  className=""
                  style={{width: 400, height: 50}}
                  required
                  placeholder="Cidade"
                  />
              </div>
              <div className="p-2">
                  <label htmlFor="UF">UF</label>
                  <Input
                  onChange={(e) => handleInputChange('uf', e.target.value)}
                  type="text"
                  value={uf}
                  crossOrigin={undefined}
                  className=""
                  style={{width: 400, height: 50}}
                  required
                  placeholder="UF"
                  />
              </div>
              <div className="p-2">
                  <label htmlFor="Endereço">Endereço</label>
                  <Input
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  type="text"
                  value={endereco}
                  crossOrigin={undefined}
                  style={{width: 400, height: 50}}
                  required
                  placeholder="Endereço"
                  />
              </div>
              <div className="p-2">
                  <label htmlFor="Numero">Numero</label>
                  <Input
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                  type="text"
                  value={numero}
                  crossOrigin={undefined}
                  className=""
                  style={{width: 400, height: 50}}
                  required
                  placeholder="Digite"
                  />
              </div>
              <div className="p-2">
                  <label htmlFor="Bairro">Bairro</label>
                  <Input
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                  type="text"
                  value={bairro}
                  crossOrigin={undefined}
                  className=""
                  style={{width: 400, height: 50}}
                  required
                  placeholder="Digite"
                  />
              </div>
              <div className="p-2">
                  <label htmlFor="Complemento">Complemento</label>
                  <Input
                  onChange={(e) => handleInputChange('complemento', e.target.value)}
                  type="text"
                  crossOrigin={undefined}
                  value={complemento}
                  label="Complemento"
                  style={{width: 400, height: 50}}
                  required
                  />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="p-3 text-lg bg-blue-500" type="submit">
                  <Typography className="font-bold text-md p-1">Salvar</Typography>
              </Button>
            </div>  
        </form>
        <Alert open={open} onClose={() => setOpen(false)}>
            Sucesso ao adicionar paciente.
        </Alert>
        <Alert open={openErrorMessage} onClose={() => setOpenErrorMessage(false)}>
            Erro ao adicionar paciente.
        </Alert>
    </div>
  );
};
    