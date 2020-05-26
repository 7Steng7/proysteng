module.exports = function(databaseConfig){
    const express = require('express');
    const router = express.Router();
    const TABLE = 'users';
    const general = require('../utils/general')();
    console.log('Users está entrando por ')
    general.setDefaultDatabase('firestore');
    let model = general.getDatabaseModel();
    var jwt = require('jsonwebtoken');

     //{{SERVER}}/users/clean 
    //Limpia la base de datos
    router.get('/clean', function(request, response){
        let token = request.headers['auth-jwt'];
    if(token){
        jwt.verify(token, 'bictia', function(error, decoded){
            if(error){
                response.send({error: 'El token utilizado no es valido'})
            }
                model.clean(TABLE)
                .then((message)=>{
                    response.send(message)
                }).catch((error)=>{
                    console.error(error);
                    response.send(error);
            });
        });
    }else{
        response.send({error: 'No se ha enviado el Token'});
    }
    });
    //{{SERVER}}/users/crear
    //Crear un usuario
    router.post('/crear', function(request, response){
        let token = request.headers['auth-jwt'];
        if(token){
            jwt.verify(token, 'bictia', function(error, decoded){
                if(error){
                    response.send({error: 'El token utilizado no es valido'})
                }

                model.create(TABLE, request.body)
                .then((object)=>{
                    response.send(object)
                }).catch((error)=>{
                    console.error(error);
                    response.send(error);
                });
            });
        }else{
            response.send({error: 'No se ha enviado el Token'});
        }
    });
    //{{SERVER}}/users/id
    //Es para editar un usuario usando id
    router.put('/:id', function(request, response){
        let id = request.params.id;
        let token = request.headers['auth-jwt'];
        if(token){
            jwt.verify(token, 'bictia', function(error, decoded){
                if(error){
                    response.send({error: 'El token utilizado no es valido'})
                }
                model.update(TABLE, request.body, id)
                .then((row)=>{
                    response.send(row);
                })
                .catch((error)=>{
                    console.error(error);
                    response.send(error);
                });
            });
        }else{
            response.send({error: 'No se ha enviado el Token'});
        }
    });

    //{{SERVER}}/users/users     
    //Muestra la lista de usuarios  
    router.get('/users', function(request, response){
        let token = request.headers['auth-jwt'];
        if(token){
            jwt.verify(token, 'bictia', function(error, decoded){
                if(error){
                    response.send({error: 'El token utilizado no es valido'})
                }
                model.getAll(TABLE)
                .then((rows)=>{
                    response.send(rows);
                }).catch((error)=>{
                    console.error(error);
                    response.send(error);
                });
            });
        }else{
            response.send({error: 'No se ha enviado el Token'});
        }
    });
    //{{SERVER}}/users/id 
    //Muestra un usuario segun su id
    router.get('/:id', function(request, response){
        let id = request.params.id;
        let token = request.headers['auth-jwt'];
        if(token){
            jwt.verify(token, 'bictia', function(error, decoded){
                if(error){
                    response.send({error: 'El token utilizado no es valido'})
                }
                model.getById(TABLE, id)
                .then((row)=>{
                    response.send(row);
                })
                .catch((error)=>{
                    console.error(error);
                    response.send(error);
                });
            });
        }else{
            response.send({error: 'No se ha enviado el Token'});
        }
    });
    //{{SERVER}}/users/id
    //Elimina un usuario segun su id
    router.delete('/:id', function(request, response){
        let id = request.params.id;  
        let token = request.headers['auth-jwt'];
        if(token){
            jwt.verify(token, 'bictia', function(error, decoded){
                if(error){
                    response.send({error: 'El token utilizado no es valido'})
                }
                model.delete(TABLE, id)
                .then((message)=>{
                    response.send(message);
                })
                .catch((error)=>{
                    console.error(error);
                    response.send(error);
                });
            });
        }else{
            response.send({error: 'No se ha enviado el Token'});
        } 

    });
    //{{SERVER}}/users/create 
    //Crear plantilla para sqlite
    router.post('/create', function(request, response){
        let token = request.headers['auth-jwt'];
        if(token){
            jwt.verify(token, 'bictia', function(error, decoded){
                if(error){
                    response.send({error: 'El token utilizado no es valido'})
                }
                model.initialize(TABLE, request.body)
                .then((message)=>{
                    response.send(message)
                }).catch((error)=>{
                    console.error(error);
                    response.send(error);
                });  
            });
        }else{
            response.send({error: 'No se ha enviado el Token'});
        }
    });
    return router;
}
