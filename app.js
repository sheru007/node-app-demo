const express = require('express')
const cookieParser = require('cookie-parser');
const csrf = require('csurf')
const cors = require('cors')

// constants
const PORT = 5000

const app = express()
const csrfProtection = csrf({cookie: true})


// middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

//http://localhost:3000/
app.use(cors({
    origin: ['https://www.damensch.io'],
}))

// error handler
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') {
        // res.cookie('XSRF-TOKEN', req.csrfToken())
        return next(err)
    } 
  
    // handle CSRF token errors here
    res.status(403)
    res.send('form tampered with')
})

// API
app.get('/', (req, res) => {
    console.log({headers: req.headers})
    res.json({ name: "sheru-khan-bff", message: "hii this is BFF server" })
})

app.get('/api', (req, res) => {
    res.json({ name: "sheru-khan-bff-api", message: "hii this is BFF server with /api path" })
})

// get csrf token 
app.get('/api/get-csrf-token',csrfProtection, (req, res) => {
    console.log(">>>> ##### final response :: ", {header: res.getHeaders()})
    res.status(200).json({ csrfToken: req.csrfToken(), header: res.getHeaders()})
})

app.post('/api/update-title',csrfProtection, (req, res) => {
    console.log({header: req.headers, body: req.body })
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
    res.set('Cache-Control', 'no-store')
    res.status(200).json({ name: "sheru-khan-bff-api-user", message: "hii this is BFF server with /api/user path" })
})

app.listen(PORT, () => {
    console.log(`node bff-server started !!!! at ${PORT}`)
})



