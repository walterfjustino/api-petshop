const Sequelize = require('sequelize')
const instancia = require('../../database')

/*CADA CHAVE DO OBJETO SERÁ UMA COLUNA DA TABELA */
const colunas = {
    empresa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria:{
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    }

}

/*COLUNAS RELACIONADAS A DATAS, NÃO DEFINIMOS POIS O SEQUELIZE JA FORNECE BASTA
ATIVAR CONFORME ABAIXO, POREM ELE FORNECE EM INGLÊS E TEMOS QUE ALTERAR PARA PORTUGUES-BR */




const opcoes = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}
/*PASSANDO OS PARAMETROS: 1º->NOME DA TABELA, 2º->COLUNAS,3º->OPCOES DE CONFIG DA TABELA*/
module.exports = instancia.define('fornecedor', colunas, opcoes)