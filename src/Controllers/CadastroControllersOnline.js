import { CreatedContactCardAPI, CallOptions } from '../api/APIChamadas.js';
import dotenv from 'dotenv'; // responsável por armazenar as variáveis de ambiente

dotenv.config();

function sanitize(body = {}) {
  const { email, telefone, ...rest } = body;
  return rest;
}

class CadastroControllers {
  async store(req, res) {
    try {
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
        aceitaPolitica,
        linkOrigem,
      } = req.body;

      if (
        !cidade ||
        !valorDesejadoEmprestimo ||
        !valorImovelGarantia ||
        !quantidadeParcelas ||
        !tipoAmortizacao ||
        !valorParcelaCalculada ||
        !nomeCompleto ||
        !email ||
        !telefone ||
        !imovelProprio ||
        !linkOrigem ||
        aceitaPolitica == null
      ) {
        return res.status(400).json({ msg: 'Todos os campos são obrigatórios' });
      }

      const codePertence = await this.search(imovelProprio, 31246, res);
      if (typeof codePertence !== 'number') return;
      const codeAmortizacao = await this.search(tipoAmortizacao, 44254, res);
      if (typeof codeAmortizacao !== 'number') return;

      const create = new CreatedContactCardAPI(
        email,
        nomeCompleto,
        telefone,
        valorImovelGarantia,
        valorDesejadoEmprestimo,
        0,
        quantidadeParcelas,
        0,
        valorParcelaCalculada,
        codeAmortizacao,
        cidade,
        codePertence,
        linkOrigem,
      );
      const createDeal = await create.main();

      const msg = !createDeal.status
        ? 'Já existe um card criado com este e-mail dentro de um periodo de 7 dias'
        : 'Card criado com sucesso!';

      return res.status(200).json({
        status: createDeal.status,
        msg,
        retorno: {
          nomeCompleto,
          email,
        },
      });
    } catch (e) {
      console.error('Erro ao cadastrar lead', {
        error: e.message,
        body: sanitize(req.body),
      });
      return res.status(500).json({ msg: 'Erro ao cadastrar lead' });
    }
  }

  // realizar busca no ploomes para obter o código da opção
  async search(option, TableId, res) {
    try {
      const find = new CallOptions();
      const retorno = await find.takeOptions(option, TableId);
      const id = retorno.value[0].Id;
      return id;
    } catch (e) {
      console.error('Erro na busca de opção', {
        error: e.message,
        option,
        TableId,
      });
      return res
        .status(500)
        .json({ msg: 'Erro ao buscar informações de cadastro' });
    }
  }
}

export default new CadastroControllers();

