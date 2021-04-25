const ValorNaoSuportado = require("./erros/ValorNaoSuportado")

/*TRANSFORMA OS DADOS RECEBIDOS EM JSON */
class Serializador {
    json (dados) {
        return JSON.stringify(dados)
    }
/*RECEBE OS DADOS, VERIFICA SE O CONTEUDO É JSON, RETORNA JSON, SE NÃO FOR JSON, RETORNA A EXCECÃO VALOR NÃO SUPORTADO */
    serializar (dados) {
        if (this.contentType === 'application/json') {
            return this.json(
                   this.filtrar(dados)
                   )
        }
        throw new ValorNaoSuportado(this.contentType)
    }

    /*METODO P/ FILTRAR OS DADOS AO RETORNAR OS DADOS SOLICITADO PARA O CLIENTE */
    filtrarObjeto (dados) {
        const novoObjeto = {}
 
        this.camposPublicos.forEach((campo) => {
            if (dados.hasOwnProperty(campo)) { /*VERIFICA SE A VARIAVEL DADOS POSSUI A PROPRIEDADE CAMPO E RETORNA TRUE OU FALSE*/
                novoObjeto[campo] = dados[campo]
            } 
        })
        return novoObjeto
    }

    filtrar (dados) {
        if (Array.isArray(dados)) {     
            dados = dados.map(item => {     /*MAP PEGA O RESULTADO DA FUNÇÃO E RETORNA UMA NOVA LISTA A PARTIR */
                return this.filtrarObjeto(item)
            })
        } else {
            dados = this.filtrarObjeto(dados) /*SOBREESCREVE A VARIAVEL DADOS */
        }

        return dados
    }
}



class SerializadorFornecedor extends Serializador {
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
             'empresa',
              'categoria'           
        ].concat(camposExtras || []) /*PASSA A VARIAVEL CAMPOSEXTRAS OU UMA LISTA VAZIA */
    }                            /*concat() ESTA JUNTANDO OS CAMPOS RESTANTES PARA VISUALIZAR NO MÉTODO GET,
                                        QUE PASSA O ID COMO PARAMETRO AFIM DE RETORNAR TODOS OS DETALHES*/
}

class SerializadorErro extends Serializador {
    constructor( contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id', 
            'mensagem'
        ].concat(camposExtras || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json']
}