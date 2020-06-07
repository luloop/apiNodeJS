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

'use strict';

var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var express = require('express');
var http = require('http');
var cors = require('cors');
const path = require('path');
var mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/dist'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname)));
const server = http.createServer(app);

/* base de datos */
var con = mysql.createConnection({
    socketPath: '/cloudsql/backcero:southamerica-east1:obackdba',
    user: "root",
    password: "luloop",
    database: "aaaaaaaaa"
});


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


/* consultas a base de datos */
app.get('/crearIndustria', (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE IF NOT EXISTS productos (name VARCHAR(255), address VARCHAR(255))";
        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Table created");
            res.json({ msg: 'Table created' })
        });
    });
})
app.get('/crearIndustria', (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE IF NOT EXISTS productos (name VARCHAR(255), address VARCHAR(255))";
        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Table created");
            res.json({ msg: 'Table created' })
        });
    });
})

app.get('/crearBaseDeDatos', (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("CREATE DATABASE IF NOT EXISTS aaaaaaaaa", function(err, result) {
            if (err) throw err;
            console.log("Database created");
            res.json({ msg: 'Database created' })
        });
    });
})

app.get('/productos/id', function(req, res, next) {
    res.json({ msg: '/productos/id' })
})

app.get('/industrias/id', function(req, res, next) {
    res.json({ msg: '/industrias/id' })
})

app.post('/login', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    console.log('req', req.body);
    var username = req.body.user
    var password = req.body.password

    if (!(username === 'oscar' && password === '1234')) {

        res.setHeader('contentType', 'application/json;charset=utf-8;');
        res.status(401).send({
            error: 'usuario o contraseña inválidos'
        })

    } else {
        res.setHeader('contentType', 'text/plain');
        var tokenData = {
            username: username
        }

        var token = jwt.sign(tokenData, 'Secret Password', {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        })
        res.send(JSON.stringify(token));

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