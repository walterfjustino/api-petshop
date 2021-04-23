const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')


roteador.get('/', async (requisicao, resposta) => {
    try {
        const resultados = await TabelaFornecedor.listar()
        resposta.status(200)
        resposta.send(
        JSON.stringify(resultados) /* CONVERTENDO O RESULTADO PARA JSON */
    ) } catch (erro) {
        resposta.status(404)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
    
})

roteador.post('/', async (requisicao, resposta) => {
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        resposta.send(
            JSON.stringify(fornecedor)
    )
    } catch (erro) {
        resposta.status(400)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }


})

roteador.get('/:idFornecedor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        resposta.status(200)
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch (erro) {
        resposta.status(404)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})


roteador.put('/:idFornecedor', async (requisicao, resposta) => {
   try {
    const id = requisicao.params.idFornecedor
    const dadosRecebidos = requisicao.body
    const dados = Object.assign({}, dadosRecebidos, { id: id}) /*Object.assign FUNÇÃO JAVASCRIPT ONDE E POSSIVEL JUNTAR VARIOS OBJETOS EM UM SÓ*/
    const fornecedor = new Fornecedor(dados)
    await fornecedor.atualizar()
    resposta.status(204)
    resposta.end()
   } catch (erro) {
       resposta.status(400)
       resposta.send(
           JSON.stringify({
               mensagem: erro.message
           })
       )
       
   }
})


roteador.delete('/:idFornecedor', async (requisicao, resposta) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        resposta.status(404)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador