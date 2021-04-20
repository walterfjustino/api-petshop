const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

app.use(bodyParser.json())


app.listen(config.get('api.port'), () => console.log('A api está funcionando!'))