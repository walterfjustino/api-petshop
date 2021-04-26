const Modelo = require('./ModeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')
                                /*TABELAFORNECEDOR.JS SERVE COMO UMA "PONTE" DE CONEXÃO ENTRE O CODIGO EO BANCO DE DADOS */
module.exports = {

    listar () {
        return Modelo.findAll({ raw: true })
    },

    inserir (fornecedor) {
        return Modelo.create(fornecedor)

    },
    
    async buscarPorId (id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new NaoEncontrado()
        }

        return encontrado
    },

    atualizar (id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            }
        )
    },

    remover (id) {
        return Modelo.destroy({
            where: { id: id }
        })
    }

}