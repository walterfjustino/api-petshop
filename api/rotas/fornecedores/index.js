const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (requisicao, resposta) => {
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

roteador.post('/', async (requisicao, resposta) => {
    const dadosRecebidos = requisicao.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    resposta.send(
        JSON.stringify(fornecedor)
    )

})

module.exports = roteador