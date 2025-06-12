import { CreatedContactCardAPI, CallOptions } from '../api/APIChamadas.js';
import dotenv from 'dotenv'; // responsável por armazenar as variáveis de ambiente;

dotenv.config();

class CadastroControllers{

    async store(req, res){
        try{
            
            const {
                cidade,
                valorDesejadoEmprestimo,
                valorImovelGarantia,
                quantidadeParcelas,
                tipoAmortizacao,
                valorParcelaCalculada,
                nomeCompleto,
                email,
                telefone,
                imovelProprio,
                aceitaPolitica
            } = req.body;

            if(!cidade ||
                !valorDesejadoEmprestimo ||
                !valorImovelGarantia ||
                !quantidadeParcelas ||
                !tipoAmortizacao ||
                !valorParcelaCalculada ||
                !nomeCompleto ||
                !email ||
                !telefone ||
                !imovelProprio ||
                aceitaPolitica == null
            ){
                return res.status(400).json({msg: "Todos os campos são obrigatórios"});
            }

            const codePertence = await this.search(imovelProprio, 31246); // Capturando código se é próprio ou não;
            const codeAmortizacao = await this.search(tipoAmortizacao, 44254); // capturando código amortização;
            
            console.log(codePertence);

            const create = new CreatedContactCardAPI(email, nomeCompleto, telefone, valorImovelGarantia, valorDesejadoEmprestimo, 0 ,quantidadeParcelas, 0, valorParcelaCalculada, codeAmortizacao, cidade, codePertence); //  Responsável por realizar o cadastro do lead no ploomes;
            const createDeal = await create.main() // Cadastrando no ploomes;
            
            const msg = !createDeal.status ? 'Já existe um card criado com este e-mail dentro de um periodo de 7 dias' : "Card criado com sucesso!"

            return res.status(200).json({
                status: createDeal.status,
                msg: msg,
                retorno: {
                    nomeCompleto,
                    email,
                }
            })
        }catch(e){
            return res.status(400).json({
            error: [e],
            });
        }
    }

    // realizar busca no ploomes para obter o código da opção;
    async search(option, TableId){
        try{
            const find = new CallOptions(); // Para buscar a chave no ploomes;

            const retorno = await find.takeOptions(option, TableId) // Função que irá retornar o códigojá formatado;

            const id = retorno.value[0].Id // capturando código;

            return id;
        }catch(e){
            console.log(e);
            return
        }
    }

}

export default new CadastroControllers();