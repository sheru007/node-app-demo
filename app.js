const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.json({name: "sheru khan", message: "hii this is BFF server"})
})

app.get('/api', (req, res) => {
    res.json({name: "sheru khan", message: "hii this is BFF server with /api path"})
})

app.get('/api/user', (req, res) => {
    res.json({name: "sheru khan", message: "hii this is BFF server with /api/user path"})
})

app.listen(PORT, () => {
    console.log('node server started !!!!')
})