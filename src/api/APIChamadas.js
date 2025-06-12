import apiPloomes from '../service/axios.js';
import { formatadorInput } from '../methods/metodos.js'
import dotenv from 'dotenv'; // responsável por armazenar as variáveis de ambiente;

dotenv.config();

export class CallOptions{
    constructor(){}

    async main(TableId){
        try{
            const response = await apiPloomes.get(`/Fields@OptionsTables@Options?$select=Id,TableId,Name&$filter=TableId eq ${TableId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': "661569F0F2BFBD31E9AC2AEE5B55C79F245AA394FAB35193A17D32654241CC4298F80D88A4C7C711FC1F2C7DCD6FBE147CB178B54213CB44E85895DAEC17BA18"
                }
            })

            const data = await response.data;

            return data

        }catch(error){
            if(error.response){
                console.error('Erro API: ', error.response.data)
            } else {
                console.error('Erro geral: ', error.message)
            }
        }
    }

    async fields(){
        try{
            const response = await apiPloomes.get(`/Fields/`, {
                headers: {
                'Content-Type': 'application/json',
                'User-Key': "661569F0F2BFBD31E9AC2AEE5B55C79F245AA394FAB35193A17D32654241CC4298F80D88A4C7C711FC1F2C7DCD6FBE147CB178B54213CB44E85895DAEC17BA18"
            }
        })

        const data = await response.data;

            return data;

        }catch(error){
            if(error.response){
                console.error('Erro API: ', error.response.data)
            } else {
                console.error('Erro geral: ', error.message)
            }
        }
    }

    async takeOptions(options, TableId){
        try{
            const response = await apiPloomes.get(`/Fields@OptionsTables@Options?$select=Id,TableId,Name&$filter=Name eq '${options}' and TableId eq ${TableId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': "661569F0F2BFBD31E9AC2AEE5B55C79F245AA394FAB35193A17D32654241CC4298F80D88A4C7C711FC1F2C7DCD6FBE147CB178B54213CB44E85895DAEC17BA18"
                }
            })

            const data = await response.data;

            return data

        }catch(error){
            if(error.response){
                console.error('Erro API: ', error.response.data)
            } else {
                console.error('Erro geral: ', error.message)
            }
        }
    }

}

export class Deal{
    constructor(dados_update, Id){
        this.dados = dados_update;
        this.Id = Id;
    }

    async main(){
        try{
            const response = await apiPloomes.patch(`/Deals(${this.Id})`, this.dados , {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': "661569F0F2BFBD31E9AC2AEE5B55C79F245AA394FAB35193A17D32654241CC4298F80D88A4C7C711FC1F2C7DCD6FBE147CB178B54213CB44E85895DAEC17BA18"
                }
            })

            const data = await response.data;

            return data;
        }catch(error){
            if(error.response){
                console.error('Erro API: ', error.response.data)
            } else {
                console.error('Erro geral: ', error.message)
            }
        }
    }
}

export class CreatedContactCardAPI extends formatadorInput{
    
    constructor(email, Name, PhoneNumber, vlr_imovel, vlr_solicitado, juros, nmr_parcelas, carencia, primeiraParcela, amortizacao, cidadeSelect, ArrayOtherPropreties, imovelProprio){
        super()
        this.email = email;
        this.Name = Name;
        this.PhoneNumber = PhoneNumber;
        this.vlr_imovel = vlr_imovel;
        this.vlr_solicitado = vlr_solicitado;
        this.juros = juros;
        this.nmr_parcelas = nmr_parcelas;
        this.carencia = carencia;
        this.amortizacao = amortizacao;
        this.primeiraParcela = primeiraParcela;
        this.cidadeSelect = cidadeSelect;
        this.imovelProprio = imovelProprio;
        this.ArrayOtherPropreties = ArrayOtherPropreties;
        this.contactID = false;
    }

    // Metódo principal que será responsável por criar a classe;
    async main(){

        // Dados que serão enviados para o ploomes caso o Contato não exista;
        const dados = {
            TypeId: 2, 
            StatusId: 0,
            Email: this.email,
            Name: this.Name,
            TasksOrdination: 2,
            Editable: true,
            Neighborhood: null,
            ZipCode: 0, // precisa ser string, não número
            Register: null, // sem pontuação, se for CNPJ
            OriginId: null, // Evite usar 0. Use um ID válido ou remova se não for obrigatório
            CompanyId: null, // pode ser removido se não estiver criando com vínculo de empresa
            StreetAddressNumber: null, // string costuma ser mais segura aqui
            Phones: [
                {
                    PhoneNumber: this.PhoneNumber,
                    SearchPhoneNumber: this.PhoneNumber,
                    TypeId: 2, // Verifique se esse tipo existe (ex: 0 = celular)
                    CountryId: 55 // Código do Brasil (não deixe 0)
                }
            ]
        };

        this.contactID = await this.validateContact(); // Verificando se existe algum contato vinculado a este e-mail;
        
        // Aqui iremos respeitar uma regra de 7 dias para realizar a criação deste contato;
        if(this.contactID){
            const validando = await this.validateDeal(this.contactID); // Fazendo a verficação

            if(validando){
                // Caso estiver dentro de um periodo de 7 dias ele terá esse retorno;
                return {
                    status: false
                }

            }else { // Caso contrário ele irá realizar a criação do deal;
                const retorno = await this.createDeal();
                return {
                    dados: retorno.data.value[0],
                    status: true
                }
            }

        }else { // irá realizar a criação do contaot/deal caso o contato não existir;
            this.contactID = await this.createContact(dados)
            const retorno = await this.createDeal();
            return {
                dados: retorno,
                status: true
            }
        }
    }

    // Irá realizar uma busca no ploomes para verificar se o perfil do usuário já existe;
    async validateContact(){
        try{
            const response = await apiPloomes.get(`/Contacts?$filter=Email+eq+'${this.email}'&$select=Id,Name,Email`, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': "661569F0F2BFBD31E9AC2AEE5B55C79F245AA394FAB35193A17D32654241CC4298F80D88A4C7C711FC1F2C7DCD6FBE147CB178B54213CB44E85895DAEC17BA18"
                }
            })

            const verifyValue = response.data.value
            if(verifyValue.length > 0){
                const results = response.data.value;
                return results[0].Id
            }

            return;
            
        }catch(error){
            if(error.response){
                console.error('Erro API: ', error.response.data)
            } else {
                console.error('Erro geral: ', error.message)
            }
        }
    }

    // Função responsável por realizar a criação do contato caso ele for inexistente na base dados no ploomes;
    async createContact(data){
        try {
            data = JSON.stringify(data);
            const contact = await apiPloomes.post('/Contacts', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': "661569F0F2BFBD31E9AC2AEE5B55C79F245AA394FAB35193A17D32654241CC4298F80D88A4C7C711FC1F2C7DCD6FBE147CB178B54213CB44E85895DAEC17BA18"
                }
            })
            
            var takeID = contact.data.value // Capturando os dados recém criados no ploomes.

            // Após realizar a criação do usuário ele irá devolver o ID do novo usuário criado.
            return takeID[0].Id
        }catch(error){
            if(error.response){
                console.error('Erro API: ', error.response.data)
            } else {
                console.error('Erro geral: ', error.message)
            }
        }

        return;
    }

    // Irá realizar a consulta na base de dados do ploomes para verificar se há algum contato criado dentro desse período;
    async validateDeal(){
        try{
            const response = await apiPloomes.get(`/Deals?$select=Id,Title,PipelineId,StageId,Amount,StatusId,StartDate&$filter=ContactId eq ${this.contactID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': "661569F0F2BFBD31E9AC2AEE5B55C79F245AA394FAB35193A17D32654241CC4298F80D88A4C7C711FC1F2C7DCD6FBE147CB178B54213CB44E85895DAEC17BA18"
                }
            })

            const dados = response.data.value;

            if(dados.length < 1){
                return false;
            }

            const insideSevenDayExists = this.takeDate(dados);

            return insideSevenDayExists ? true : false;

        }catch(error){
            if(error.response){
                console.error('Erro API: ', error.response.data)
            } else {
                console.error('Erro geral: ', error.message)
            }
        }
    }

    // Irá criar um novo negócio atrelado ao Contato já existe/criado;
    async createDeal(){ 

        try{
            const dados = {
                Title: this.Name, // Receber Front-end;
                ContactId: this.contactID, // Resolvido;
                Amount: this.vlr_solicitado, // Receber Front-end;
                StageId: 228324, // O funil usado no caso Atendimento libra;
                PipelineId: 49228, // Pipeline usado no caso Atendimento;
                OtherProperties: [
                    {
                        FieldKey: process.env.DEAL_ID_VALOR_IMOVEL,
                        DecimalValue: this.vlr_imovel
                    },
                    {
                        FieldKey: process.env.DEAL_ID_PRIMEIRA_PARCELA,
                        DecimalValue: this.primeiraParcela
                    },
                    {
                        FieldKey: process.env.DEAL_ID_VALOR_NMR_PARCELA,
                        IntegerValue: this.nmr_parcelas
                    },
                    {
                        FieldKey: process.env.DEAL_ID_VALOR_SOLICITADO,
                        DecimalValue: this.vlr_solicitado
                    },
                    {
                        FieldKey: process.env.DEAL_ID_CIDADE,
                        StringValue: this.cidadeSelect
                    },
                    {
                        FieldKey: process.env.DEAL_ID_PROPRIETARIO,
                        IntegerValue: this.imovelProprio
                    },
                    {
                        FieldKey: process.env.DEAL_ID_AMORTIZACAO,
                        IntegerValue: this.amortizacao
                    },
                ]
            }

            const response = await apiPloomes.post('/Deals', dados, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': "661569F0F2BFBD31E9AC2AEE5B55C79F245AA394FAB35193A17D32654241CC4298F80D88A4C7C711FC1F2C7DCD6FBE147CB178B54213CB44E85895DAEC17BA18"
                }
            })

            return response;

        }catch(error){
            if(error.response){
                console.error('Erro API: ', error.response.data)
            } else {
                console.error('Erro geral: ', error.message)
            }
        }
    }
    
    // Verificando se há uma diferença maior de 7 dias entre as data do último negócio criado deste contato.
    takeDate(deals){
        if(deals.length > 0){
            let lastIndice = deals.length - 1;
            const StartDate = new Date(deals[lastIndice].StartDate)
            const ActualDate = new Date();
            var diffInMs = ActualDate - StartDate;
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

            return diffInDays > process.env.DEAL_TEMPO ? false : true;
        }
    }
}
