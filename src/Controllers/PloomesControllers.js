import { CreatedContactCardAPI, CallOptions } from '../api/APIChamadas.js';
import dotenv from 'dotenv'; // responsável por armazenar as variáveis de ambiente;

dotenv.config();

class CadastroControllersOffline {
    
    // trás todas as opções do ploomes;
    async search(req, res){
        try{
            const find = new CallOptions(); // Para buscar a chave no ploomes;
            const tableId = req.params.tableId;
            console.log('oisss')
            const retorno = await find.takeOptions(tableId) // Função que irá retornar o código já formatado;

            return res.status(200).json(retorno)
        }catch(e){
            console.log(e);
            return
        }
    }

}

export default new CadastroControllersOffline();