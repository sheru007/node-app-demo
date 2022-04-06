const express = require('express')
const app = express()
const PORT = 5000
app.use(
    express.urlencoded({
      extended: true
    })
  )
  
app.use(express.json())
app.get('/', (req, res) => {
    res.json({ name: "sheru-khan-bff", message: "hii this is BFF server" })
})

app.get('/api', (req, res) => {
    res.json({ name: "sheru-khan-bff-api", message: "hii this is BFF server with /api path" })
})
app.post('/api/update-title', (req, res) => {
    console.log({header: req.headers, body: req.body})
    const bearerHeader = req.headers['authorization'];
    const {title = 'no-title'} = req.body

    console.log({bearerHeader})
    if(!bearerHeader ){
        return res.sendStatus(403);
    }
    const bearerToken = bearerHeader.split(' ')[1];
    console.log({bearerToken})
    if(bearerToken !== 'sk007') {
        return res.json({message: 'token is wrong'})
    }
        
    res.json({ name: "sheru-khan-bff-update-title-api", message: "hii this is BFF server with /api path", title })
})

app.get('/api/user', (req, res) => {
    res.json({ name: "sheru-khan-bff-api-user", message: "hii this is BFF server with /api/user path" })
})

app.listen(PORT, () => {
    console.log('node server started !!!!')
})