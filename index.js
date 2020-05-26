
const express = require('express');
const aplication = express();
const bodyParser = require('body-parser');
const config = require('./config.json');
const general = require('./app/utils/general')();

const port = process.env.PORT ? process.env.PORT : config.app.port ? config.app.port : 3000 ;
const bind = process.env.BIND ? process.env.BIND : config.app.bind ? config.app.bind : '127.0.0.1' ;

let usersController = require('./app/controllers/users')();
let classesController = require('./app/controllers/classes')();
let compartirController = require('./app/controllers/compartir')();
let loginController = require('./app/controllers/login')();

aplication.use(bodyParser.json());
aplication.use(bodyParser.urlencoded({ extended: true}));
aplication.use('/users', usersController)
aplication.use('/classes', classesController)
aplication.use('/compartir', compartirController)
aplication.use('/login', loginController)

aplication.listen(port,bind, function () {
    console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log('Aplicación: '+ config.app.name);
    console.log('Corriendo en: '+ config.app.bind+':'+config.app.port);
    console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
});
