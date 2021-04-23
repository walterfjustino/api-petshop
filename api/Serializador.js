const ValorNaoSuportado = require("./erros/ValorNaoSuportado")

/*TRANSFORMA OS DADOS RECEBIDOS EM JSON */
class Serializador {
    json (dados) {
        return JSON.stringify(dados)
    }
/*RECEBE OS DADOS, VERIFICA SE O CONTEUDO É JSON, RETORNA JSON, SE NÃO FOR JSON, RETORNA A EXCECÃO VALOR NÃO SUPORTADO */
    serializar (dados) {
        if (this.contentType === 'application/json') {
            return this.json(dados)
        }
        throw new ValorNaoSuportado(this.contentType)
    }
}

module.exports = {
    Serializador: Serializador,
    formatosAceitos: ['application/json']
}