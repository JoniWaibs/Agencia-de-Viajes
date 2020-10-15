//Importar express + sus sitema de ruteos
const express = require('express')
const router = express.Router()
//Importo el controlador
const viajeController = require('../Controllers/controller')
//Rutas, rendereizan desde el controlador
router.get('/', viajeController.home)
router.get('/contacto', viajeController.home)
router.get('/about', viajeController.about)
router.get('/viajes', viajeController.viajes)
router.get('/viajes/:comodin' , viajeController.detalle)
router.get('/testimoniales', viajeController.testimonales)
router.post('/testimoniales', viajeController.postearTestimonio)//Postea un nuevo comentario
//Exporar el router hacia index
module.exports = router