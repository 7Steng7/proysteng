const UserFirebase = function(){
    const express = require('express');
    const router = express.Router();

    const general = require('../utils/general')();
    let admin = general.getfirebase();

    router.get('/list', function(request, response){
        admin.auth().listUsers()
        .then( function (users){
            response.send(users.toJSON())
        })
        .catch(function (error){
            response.send(error);
        })
    });

    router.get('/:id', function(request, response){
        let id = request.params.id;
        admin.auth().listUser(id)
        .then( function (users){
            response.send(users.toJSON())
        })
        .catch(function (error){
            response.send(error);
        });
    });

    router.post('/create', function(request, response){
        admin.auth().createUser(request.body)
        .then( function (users){
            response.send(users.uid)
        })
        .catch(function (error){
            response.send(error);
        });
    });
    router.put('/:id', function(request, response){

    }); 
    router.get('/option/clean', function(request, response){

    });
    return router;
} 
module.exports = UserFirebase;