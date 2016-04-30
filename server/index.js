'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const http = require('http');
const nodemailer = require('nodemailer');

const config = require('./config/config');
// const app = express();
// const server = require('http').createServer(app);
// const io = require("socket.io").listen(server)
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


function connect(options) {
  return mongoose.connect(config.db, options).connection;
}

function listen() {
  server.listen(config.port);
  // app.listen(config.port);

  // eslint-disable-next-line no-console
  console.log(`Express app started on http://127.0.0.1:${config.port}`);
}

connect()
  // eslint-disable-next-line no-console
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

/**
 * Expose application
 */

 module.exports = app;

// Configure application
app.use(cookieParser());
app.use(cookieSession({ secret: config.secret }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./config/cors')(app);
require('./config/logger')(app);
require('./config/passport')(app, passport);

app.all('*', function(req, res, next) {
 res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
 res.header("Access-Control-Allow-Headers", "X-Requested-With");
 res.header('Access-Control-Allow-Headers', 'Content-Type');
 res.header('Access-Control-Allow-Credentials', 'true');
 next();
});

//notifications
io.sockets.on("connection", function (socket) {
  console.log('You have connected to the server', socket);
  socket.on('join', function (data) {
    console.log(data);
    console.log(data.message);
    socket.broadcast.emit('message', {msg: data.message});


    var transporter = nodemailer.createTransport({
      service: 'Gmail',
    host: 'localhost:3000',
    port: 465,
    auth: { user: 'yummytime.test@gmail.com', pass: 'yandex-shri-minsk-2016' },
    secure: false
    });

    var mailOptions = {
      from: 'yummytime.test@gmail.com',
      to: 'yummytime.test@gmail.com',
      subject: 'Email Example',
      text: data.message
    };

    transporter.verify(function(error, success) {
     if (error) {
      console.log(error);
    } else {
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error);

        }else{
          console.log('Message sent: ' + info.response);
        };
      });
    }
  });

         transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error);

        }else{
          console.log('Message sent: ' + info.response);

        };
      });



  });
});

// Bootstrap routes
require('./config/routes')(app);
