const Sequelize = require('sequelize')
const config = require('config')

const instancia = new Sequelize(
    config.get('mariadb.database'),   /* INF. PREENCHIDAS CONFORME DEFAULT.JSON */
    config.get('mariadb.user'),           
    config.get('mariadb.password'),        
    {
        host: config.get('mariadb.host'),   /*IP DO SERVIDOR DO DATABASE */
        dialect: 'mariadb'
    }
)

module.exports = instancia