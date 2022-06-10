const express = require('express')
var cors = require('cors');
const tableRender = require('./router/table.router')

const PORT = process.env.PORT || 8081

const app = express()

app.use(express.json())
app.use(cors());
app.use('/api', tableRender)

app.listen(PORT, ()=>console.log(`Сервер был запущен на порту ${PORT}`))