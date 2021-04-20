const Sequelize = require('sequelize')
const config = require('config')

const instance = new Sequelize(
    config.get('mysql.database'),        /*NOME DO DATABASE */
    config.get('mysql.user'),            /*USER DO DATABASE */
    config.get('mysql.password'),        /*PASSWORD DO DATABASE */
    {
        host: config.get('127.0.0.1'),   /*IP DO SERVIDOR DO DATABASE */
        dialect: 'mysql'
    }
)

module.exports = instance