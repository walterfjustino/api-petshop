const ValorNaoSuportado = require("./erros/ValorNaoSuportado")
const jsontoxml = require('jsontoxml')


class Serializador {

    /*TRANSFORMA OS DADOS RECEBIDOS EM JSON */
    json (dados) {
        return JSON.stringify(dados)
    }
    /*TRANSFORMA OS DADOS RECEBIDOS EM XML */
    xml (dados) {
        let tag = this.tagSingular

        if (Array.isArray(dados)) {
            tag = this.tagPlural
            dados = dados.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
            
        }
        return jsontoxml({ [tag]: dados}) /*PARA CONVERTER EM XML É NECESSÁRIO UMA TAG, 
                                           .TAG ONDE IRÁ AGRUPAR TODOS OS DADOS  */
    }

/*RECEBE OS DADOS, VERIFICA SE O CONTEUDO É JSON, RETORNA JSON, SE NÃO FOR JSON, RETORNA A EXCECÃO VALOR NÃO SUPORTADO */
    serializar (dados) {
        dados = this.filtrar(dados)/*TRANSFORMA O OBJETO DADOS, JA EXECUTANDO A FUNÇÃO DE FILTRAR, RETORNANDO O DADO FILTRADO */

        if (this.contentType === 'application/json') {
            return this.json(dados)
        }

        if (this.contentType === 'application/xml'){
            return this.xml(dados)
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
        ].concat(camposExtras || [])/*PASSA A VARIAVEL CAMPOSEXTRAS OU UMA LISTA VAZIA */
         this.tagSingular = 'fornecedor'
         this.tagPlural = 'fornecedores'
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
    formatosAceitos: ['application/json', 'application/xml']
}