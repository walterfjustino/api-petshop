const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')

roteador.use('/', async (requisicao, resposta) => {
    try {
        const resultados = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resultados) /* CONVERTENDO O RESULTADO PARA JSON */
    ) } catch (erro) {
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador