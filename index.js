const express = require('express')
const mongoose = require('mongoose')
const { mongoURI } = require('./src/config/db')
const routes = require('./src/routes')

const app = express()

//Mongoose
mongoose.connect(mongoURI,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{
    console.log('Conectou ao banco de dados')
})

//Middlewares
app.use(express.json())

//Rotas
app.use('/',routes)

app.listen(3333,()=>{
    console.log('Servidor rodando')
})