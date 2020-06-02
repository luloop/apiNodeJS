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
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/dist'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);



/* token */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))


/* cors */

app.use(cors())

/* request */
app.get('/hola', (req, res) => {
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





server.listen(port, () => console.log(`App running on: http://localhost:${port}`));