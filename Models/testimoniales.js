//Importar el orm y la db
const sequelize = require('sequelize')
const db = require('../settings/db')

//Definir el segundo modelo
const testimoniales = db.define('testimoniales', {
    //Tablas de la base de datos
    nombre:{
        type: sequelize.STRING
    },
    correo:{
        type: sequelize.STRING
    },
    mensaje:{
        type: sequelize.STRING
    }
});
//Exportar hacia el controlador
module.exports = testimoniales