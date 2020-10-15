//Importar express
const express = require('express')
const app = express();
//Importar router
const router = require('./Routes/index')
//Importar las settings de la ddbb
const db = require('./settings/db')

//importar las variables de entorno y agregamos los path
require('dotenv').config({path: 'variables.env'})

//conexion con la base de datos
db.authenticate()
.then(res =>{
    console.log('DDBB Connect')
})
.catch(err =>{
    console.log(err)
    console.log('Se ha producido un error en la conexion')
})


//Middlewares//
//Habilitar el bodyparser para que los datos del form puedan ser leidos
app.use(express.urlencoded({extended:true}));
//titulo + año (para todas las paginas)
app.use((req, res, next)=>{
    res.locals.year = ' 2020'
    res.locals.title = 'Agencia de viajes'
    next()
});
//Sistema de ruteo
app.use('/', router);
//definir carpeta publica
app.use(express.static('public'));
//Configurar un 404
app.use((req, res, next)=>{
    res.status(404).render('404', {pagina: '404, NOT FOUND'})
});


//Crear el host local para desarrollo
const HOST = process.env.HOST || '0.0.00';
//Port espera variable desde HEROKU o asigina puerto 4000
const PORT = process.env.PORT || 4000;
//Servidor corriendo
app.listen(PORT , HOST, ()=> console.log(`Servidor funcionando`));


//Set pug
app.set('view engine' , 'pug')


