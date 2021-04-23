const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')


roteador.get('/', async (requisicao, resposta, proximo) => {
    try {
        const resultados = await TabelaFornecedor.listar()
        resposta.status(200)
        resposta.send(
        JSON.stringify(resultados) /* CONVERTENDO O RESULTADO PARA JSON */
    ) } catch (erro) {
          proximo(erro)
    }
    
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        resposta.send(
            JSON.stringify(fornecedor)
    )
    } catch (erro) {
        proximo(erro)
    }


})

roteador.get('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        resposta.status(200)
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch (erro) {
        proximo(erro)
    }
})


roteador.put('/:idFornecedor', async (requisicao, resposta, proximo) => {
   try {
    const id = requisicao.params.idFornecedor
    const dadosRecebidos = requisicao.body
    const dados = Object.assign({}, dadosRecebidos, { id: id}) /*Object.assign FUNÇÃO JAVASCRIPT ONDE E POSSIVEL JUNTAR VARIOS OBJETOS EM UM SÓ*/
    const fornecedor = new Fornecedor(dados)
    await fornecedor.atualizar()
    resposta.status(204)
    resposta.end()
   } catch (erro) {
       proximo(erro)
       
   }
})


roteador.delete('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador