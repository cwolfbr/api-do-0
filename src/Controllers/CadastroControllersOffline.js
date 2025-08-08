import { CreatedContactCardAPI, CallOptions } from '../api/APIChamadas.js';
import { TomadoresDados, Garantidores, DemaisInformacoes } from '../methods/metodos.js';
import fs from 'fs';
import dotenv from 'dotenv'; // responsável por armazenar as variáveis de ambiente;

dotenv.config();

class CadastroControllersOffline {

    async store(req, res){
        try{

            const ArrayOtherPropreties = new Array();
            const data = req.body;

            const tomadores = new TomadoresDados(ArrayOtherPropreties);
            const Informacoes = new DemaisInformacoes(ArrayOtherPropreties);
            const garantidores = new Garantidores(ArrayOtherPropreties);

            if(!data){
                return res.status(404).json({
                    error: ['Envie um corpo de dados junto a requisição'],
                });
            }
            
            // Capturando a quantidade de tomadores da operação.
            const QtdTomadores = data.quantidadeTomadores?.Name;
            const QtdGarantidores = data.quantidadeGarantidores?.Name;
            const dadosEmprestimo = data.emprestimo;
            const dadosGarantia = data.garantia;
            const primeiroTomador = data.tomadores[0];

            // Dados do primeiro tomador.
            let email = primeiroTomador.email;
            let nomeCompleto = primeiroTomador.nome;
            let telefone = primeiroTomador.telefone;
            let emprestimoValor = dadosEmprestimo.valorSolicitado;
            let valorImovel = dadosGarantia.valorGarantia;
            let parcelas = dadosEmprestimo.prazoSolicitado;
            let amortizacao = dadosEmprestimo.amortizacao?.Id;
            let cidade = dadosGarantia.cidadeGarantia?.Id;
            let pertenceTomador = dadosGarantia.garantiaPertenceTomador?.Id;
            let juros = dadosEmprestimo.jurosSolicitado;

            console.log(email, nomeCompleto, telefone, emprestimoValor, valorImovel, parcelas, amortizacao, cidade, pertenceTomador, juros)

            // Realizando o preenchimento de cadastro de tomadores da operação.
            for(let i = 0; i < QtdTomadores; i++){
                if(i == 0){
                    let dados = data.tomadores[i]
                    tomadores.tomador_um(
                        dados.nome, 
                        dados.dataNascimento, 
                        Number(dados.tipoPessoa?.Id), 
                        dados.cpf, 
                        dados.cnpj,
                        Number(dados.estadoCivil?.Id),
                        dados.endereco,
                        dados.cep,
                        dados.telefone,
                        dados.email,
                        dados.profissao,
                        dados.rendaFormal,
                        Number(dados.comprovacaoRendaFormal?.Id),
                        dados.rendaInformal,
                        Number(dados.comprovacaoRendaInformal?.Id),
                        Number(dados.qualificacaoProfissional?.Id),
                        dados.rendaTotalInformada,
                        dados.ramoPJ,
                        dados.quantidadeSociosPJ?.Id,
                        dados.numeroAdmin?.Id
                    )
                }
                if(i == 1){
                    let dados = data.tomadores[i]
                    tomadores.tomador_dois(
                        dados.nome, 
                        dados.dataNascimento, 
                        Number(dados.tipoPessoa?.Id), 
                        dados.cpf, 
                        dados.cnpj,
                        Number(dados.estadoCivil?.Id),
                        dados.endereco,
                        dados.cep,
                        dados.telefone,
                        dados.email,
                        dados.profissao,
                        dados.rendaFormal,
                        Number(dados.comprovacaoRendaFormal?.Id),
                        dados.rendaInformal,
                        Number(dados.comprovacaoRendaInformal?.Id),
                        Number(dados.qualificacaoProfissional?.Id),
                        dados.rendaTotalInformada,
                        dados.ramoPJ,
                        dados.quantidadeSociosPJ?.Id,
                        dados.numeroAdmin?.Id
                    )
                }
                if(i == 2){
                    let dados = data.tomadores[i]
                    tomadores.tomador_tres(
                        dados.nome, 
                        dados.dataNascimento, 
                        Number(dados.tipoPessoa?.Id), 
                        dados.cpf, 
                        dados.cnpj,
                        Number(dados.estadoCivil?.Id),
                        dados.endereco,
                        dados.cep,
                        dados.telefone,
                        dados.email,
                        dados.profissao,
                        dados.rendaFormal,
                        Number(dados.comprovacaoRendaFormal?.Id),
                        dados.rendaInformal,
                        Number(dados.comprovacaoRendaInformal?.Id),
                        Number(dados.qualificacaoProfissional?.Id),
                        dados.rendaTotalInformada,
                        dados.ramoPJ,
                        dados.quantidadeSociosPJ?.Id,
                        dados.numeroAdmin?.Id
                    )
                }
                if(i == 3){
                    let dados = data.tomadores[i]
                    tomadores.tomador_quatro(
                        dados.nome, 
                        dados.dataNascimento, 
                        Number(dados.tipoPessoa?.Id), 
                        dados.cpf, 
                        dados.cnpj,
                        Number(dados.estadoCivil?.Id),
                        dados.endereco,
                        dados.cep,
                        dados.telefone,
                        dados.email,
                        dados.profissao,
                        dados.rendaFormal,
                        Number(dados.comprovacaoRendaFormal?.Id),
                        dados.rendaInformal,
                        Number(dados.comprovacaoRendaInformal?.Id),
                        Number(dados.qualificacaoProfissional?.Id),
                        dados.rendaTotalInformada,
                        dados.ramoPJ,
                        dados.quantidadeSociosPJ?.Id,
                        dados.numeroAdmin?.Id
                    )
                }
            }

            // Realizando o preenchimento de cadastro de garantidores da operação.
            garantidores.quantidadeGarantidores(data.quantidadeGarantidores?.Id)
            
            for(let i = 0; i < QtdGarantidores; i++){
                if(i == 0){
                    let dados = data.garantidores[i]
                    garantidores.garantidorUm(
                        dados.nome,
                        dados.email,
                        dados.cpf,
                        dados.cnpj,
                        dados.profissao,
                        Number(dados.estadoCivil?.Id)
                    )
                }
                if(i == 1){
                    let dados = data.garantidores[i]
                    garantidores.garantidorDois(
                        dados.nome,
                        dados.email,
                        dados.cpf,
                        dados.cnpj,
                        dados.profissao,
                        Number(dados.estadoCivil?.Id)
                    )
                }
                if(i == 2){
                    let dados = data.garantidores[i]
                    garantidores.garantidorTres(
                        dados.nome,
                        dados.email,
                        dados.cpf,
                        dados.cnpj,
                        dados.profissao,
                        Number(dados.estadoCivil?.Id)
                    )
                }
                if(i == 3){
                    let dados = data.garantidores[i]
                    garantidores.garantidorQuatro(
                        dados.nome,
                        dados.email,
                        dados.cpf,
                        dados.cnpj,
                        dados.profissao,
                        Number(dados.estadoCivil?.Id)
                    )
                }
            }

            // Realizando o preenchimento de informações do empréstimo.
            Informacoes.informacoesEmprestimo(
                dadosEmprestimo.jurosSolicitado,
                dadosEmprestimo.valorSolicitado,
                Number(dadosEmprestimo.prazoSolicitado),
                Number(dadosEmprestimo.amortizacao?.Id),
                Number(dadosEmprestimo.carencia?.Id),
                data.quantidadeTomadores?.Id, 
                dadosEmprestimo.rendaTotal,
                dadosEmprestimo.prazoSolicitado
            )

            // Realizando o preenchimento de informações sobre a Garantia.
            Informacoes.condicoesGarantia(
                Number(dadosGarantia.garantiaPertenceTomador?.Id),
                dadosGarantia.valorGarantia,
                Number(dadosGarantia.cidadeGarantia?.Id),
                dadosGarantia.situacaoGarantia,
                Number(dadosGarantia.ruralUrbano?.Id),
                dadosGarantia.enderecoGarantia,
                Number(dadosGarantia.unidadeFederativa?.Id),
                dadosGarantia.escritura,
                dadosGarantia.nomeNaMatricula,
                dadosGarantia.imovelAverbado,
                dadosGarantia.possuiUsufruto,
                dadosGarantia.processoInventario,
                dadosGarantia.valorEmAberto,
                Number(dadosGarantia.comQuemEstaFinanciada?.Id),
                Number(dadosGarantia.quantasParcelasFalta),
                Number(dadosGarantia.utilizacaoGarantia?.Id),
                Number(dadosGarantia.tipoGarantia?.Id)
            )

            // Realizando o preenchimento de informações sobre dividas;
            Informacoes.checagemDividas(
                dadosGarantia.dividaIPTU,
                dadosGarantia.dividaITR?.Id,
                dadosGarantia.dividaCondominio,
            )

            // Aqui será criado o Card Inicial, para adicionar as demais informações abaixo;
            const deal = new CreatedContactCardAPI(
                email,
                nomeCompleto,
                telefone,
                valorImovel,
                emprestimoValor,
                juros,
                parcelas,
                '',
                '',
                amortizacao,
                cidade,
                pertenceTomador,
                ArrayOtherPropreties
            )   

            // Chamando a função responsável por criar o negócio;
            const createDeal = await deal.mainOffline();
            
            const msg = !createDeal.status ? 'Já existe um card criado com este e-mail dentro de um periodo de 7 dias' : "Card criado com sucesso!"
            return res.status(200).json({
                status: createDeal.status,
                msg: msg,
                retorno: {
                    nomeCompleto,
                    email,
                }
            });

        }catch(e){
            console.error(e); // opcional, para log no terminal
            return res.status(400).json({
                error: [e.message || e.toString()],
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

    // Realizar a transformação do arquivo para base64;
    async upload(req, res){
        try{
            const filePath = req.file.path;
            const options = new CallOptions();

            // Capturando o arquivo para leitura;
            fs.readFile(filePath, async (err, data) => {
                if(err){
                    return res.status(500).json({error: 'Erro ao ler arquivo!'})
                }

                // Convertendo em arquivo base64
                const base64 = data.toString('base64');

                const body = {
                    "Attachment":
                    {
                    "Content": base64.base64,
                    "ContentType": "pdf",
                    "FileName": "Teste"
                    },
                    "EntityId":2,
                    "ItemId": 801982417
                }
                
                const retorno = await options.sendFile(body);
                console.log(retorno)

                fs.unlink(filePath, () => {
                    return res.json({ retorno });
                });
            })

        }catch(e){

        }
    }

}

export default new CadastroControllersOffline();