const express = require('express')
const cookieParser = require('cookie-parser');
const csrf = require('csurf')


// constants
const PORT = 5000
const csrfProtection = csrf({cookie: true})
const app = express()

// middle ware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// API
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
    res.set('Cache-Control', 'no-store')
    res.status(200).json({ name: "sheru-khan-bff-api-user", message: "hii this is BFF server with /api/user path" })
})

app.get("/api/csrf-poc",csrfProtection, (req, res) => {

    res.send(`
    <html>
    <form id="myForm" action="/api/csrf-poc" method="POST" target="_self">
    Account:<input type="text" name="account" value="your friend"/><br/>
    Amount:<input type="text" name="amount" value="$5000"/>
    <input type="hidden" name="_csrf" value="${req.csrfToken()}"/>
      <button type="submit">Transfer Money</button>
    </form>
    </html>
    `)
});

app.post("/api/csrf-poc",csrfProtection, (req, res) => {
    console.log({cookie: req.cookies, body: req.body})
    if (isAuthenticated(req.cookies["session"])) {
        // Transfer money and insert data in the database
        console.info("Transferring Money...")
        res.send("OK - Money Transfer done")
    } else {
        res.status(400).send("Bad Request")
    }
});

app.listen(PORT, () => {
    console.log(`node bff-server started !!!! at ${PORT}`)
})


const isAuthenticated = (session) => {
    // We should check session in a store or something like that
    console.log({session})
    return true || (session === "valid_user")
}