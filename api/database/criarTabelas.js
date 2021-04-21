const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedor')

/*SINCRONIZANDO A TABELA COM O DATABASE */
ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)