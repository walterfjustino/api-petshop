const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

app.use(bodyParser.json())

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

/* UTILIZADO PARA CENTRALIZAR TODA TRATATIVA DE ERRO DA API */
app.use((erro, requisicao, resposta, proximo) => {
    
    let status = 500 /* VARIAVEL Q RECEBE OS STATUS DOS ERROS E RETORNA DE ACORDO COM O ERRO, POR PADRÃO STATUS 500: INTERNAL SERVER ERROR */

    if (erro instanceof NaoEncontrado) {
        status = 404
    }

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400
   }
   if (erro instanceof ValorNaoSuportado) {
        status = 406
    }

   resposta.status(status)
   resposta.send(
       JSON.stringify({
           mensagem: erro.message,
           id: erro.idErro
       })
   )

})

app.listen(config.get('api.port'), () => console.log('A api está funcionando!'))