//Importar el orm y la db
const sequelize = require('sequelize')
const db = require('../settings/db')

//Definir el primer modelo
const viaje = db.define('viajes', {
    //Tablas de la base de datos
    titulo:{
        type: sequelize.STRING
    },
    precio:{
        type: sequelize.STRING
    },
    fecha_ida:{
        type: sequelize.DATE
    },
    fecha_vuelta:{
        type: sequelize.DATE
    },
    imagen:{
        type: sequelize.STRING
    },
    descripcion:{
        type: sequelize.STRING
    },
    disponibles:{
        type: sequelize.STRING
    },
    slug:{
        type: sequelize.STRING
    },
});
//Exportar hacia el controlador
module.exports = viaje;