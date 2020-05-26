const firestoreModel = function(firestore){

    this.getAll = function(table){
        return new Promise ((resolve, reject)=>{
            firestore.collection(table).get()
            .then((registros)=>{
                let respuesta = [];
                registros.forEach(registro => {
                    let elemento = registro.data();
                    elemento.id = registro.id;
                    respuesta.push(elemento);
                });
                resolve(respuesta);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };  
    this.getById = function(table, id){
        return new Promise ((resolve, reject)=>{
            firestore.collection(table).doc(id).get()
            .then((documento)=>{
                if(documento.exists){
                    let respuesta = documento.data();
                    respuesta.id = documento.id;
                    resolve(respuesta)
                }else{
                    reject('El elemento en la colección -'+ table +'- no existe')
                }
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };
    this.create = function(table, params){
        return new Promise ((resolve, reject)=>{
            firestore.collection(table).add(params)
            .then((respuesta)=>{
                params.id = respuesta.id;
                resolve(respuesta);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };
    this.update = function(table, params, id){
        return new Promise ((resolve, reject)=>{
            firestore.collection(table).doc(id).update(params)
            .then((respuesta)=>{
                params.id = respuesta.id;
                resolve(respuesta);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };
    this.delete = function(table, id){
        return new Promise ((resolve, reject)=>{
            firestore.collection(table).doc(id).delete()
            .then((respuesta)=>{
                resolve('El elemento ' + id + ' fue eliminado');
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };
    this.clean = function(table){
        return new Promise ((resolve, reject)=>{
            
        });
    };
return this; 
};

module.exports = firestoreModel;