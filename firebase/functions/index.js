const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


'use strict';

var jwt = require('jsonwebtoken')
const express = require('express');
/* const nodemailer = require('nodemailer'); */
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

/* cors */

app.use(cors());
/* token */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))

/* const transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',
    provider: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'loopup.digital@gmail.com', // Enter here email address from which you want to send emails
        pass: 'Pedro1234' // Enter here password for email account from which you want to send emails
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.use(bodyParser.json());

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

/* app.post('/send', function(req, res) {

    console.log("send")
    let senderName = req.body.contactFormName;
    let senderEmail = req.body.contactFormEmail;
    let messageSubject = req.body.contactFormSubjects;
    let messageText = req.body.contactFormMessage;
    let copyToSender = req.body.contactFormCopy;

    let mailOptions = {
        to: ['2luloop@gmail.com '], // Enter here the email address on which you want to send emails from your customers
        from: senderName,
        subject: messageSubject,
        text: messageText,
        replyTo: senderEmail
    };

    if (senderName === '') {
        res.status(400);
        res.send({
            message: 'Bad request'
        });
        return;
    }

    if (senderEmail === '') {
        res.status(400);
        res.send({
            message: 'Bad request'
        });
        return;
    }

    if (messageSubject === '') {
        res.status(400);
        res.send({
            message: 'Bad request'
        });
        return;
    }

    if (messageText === '') {
        res.status(400);
        res.send({
            message: 'Bad request'
        });
        return;
    }

    if (copyToSender) {
        mailOptions.to.push(senderEmail);
    }

    transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end('error');
        } else {
            console.log('Message sent: ', response);
            res.end('sent');
        }
    });
});
 */

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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    res.json({ msg: '/industrias/id' })
})

app.post('/login', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    console.log('reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', req.body);

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




app.listen(port, function() {
    console.log('Express started on port: ', port);
});

exports.app = functions.https.onRequest(app);