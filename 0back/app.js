/* const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo');
});

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
}); */

var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var express = require('express');
var http = require('http');
var cors = require('cors');
var app = express();

/* token */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))


/* cors */

app.use(cors())

/* request */
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo');
})

app.get('/productos/id', function(req, res, next) {
    res.json({ msg: '/productos/id' })
})

app.get('/industrias/id', function(req, res, next) {
    res.json({ msg: '/industrias/id' })
})

app.post('/login', (req, res) => {
    console.log('req', req.body.user);
    var username = req.body.user
    var password = req.body.password

    if (!(username === 'oscar' && password === '1234')) {
        res.status(401).send({
            error: 'usuario o contraseña inválidos'
        })

    } else {
        var tokenData = {
            username: username
        }

        var token = jwt.sign(tokenData, 'Secret Password', {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        })

        res.send(token);
    }
})



/* autenticarse */

app.get('/secure', (req, res) => {
    var token = req.headers['token']
    if (!token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        })
        return
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, 'Secret Password', function(err, user) {
        if (err) {
            res.status(401).send({
                error: 'Token inválido'
            })
        } else {
            res.send({
                message: 'Awwwww yeah!!!!'
            })
        }
    })
})



// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});