//Modelos
const viajeModel = require('../Models/viaje')
const testimonialModel = require('../Models/testimoniales')

//Controlador
const viajeController = {//Metodos del controlador ( consulta a la ddbb / renderiza las vistas de cada ruta)
    about: (req, res)=> res.render('about' ,{pagina: 'Sobre Nosotros'}),//Renderiza ruta sobre nosotros
    home: async (req, res )=> {
        try{
            const resultado = await Promise.all([viajeModel.findAll({limit:3}) , testimonialModel.findAll({limit: 3})])//Descargo al mismo tiempo ambas tablas
            res.render('index' ,{pagina: 'Inicio' , searchViajes: resultado[0] , testimonios: resultado[1]})//Y renderiza la home con viajes + testimonios
        }catch(err){
            console.log(err)
        }
    },
    viajes: async (req, res)=>{
        try{
            const searchViajes = await viajeModel.findAll()//Descarga los viajes
            res.render('viajes' ,{pagina: 'Proximos viajes', searchViajes});//Renderiza su vista
        }catch(err){
            console.log(err)
        }
    },
    testimonales: async (req, res)=>{
        try{
            const testimonios = await  testimonialModel.findAll()//Descarga los testimonios
            res.render('testimoniales' , {pagina: 'Testimoniales',testimonios})//Renderiza la ruta testimoniales
        }catch(err){
            console.log(err)
        }
    },
    detalle: async (req, res) =>{
        const { comodin } =  req.params//Extraer el titulo del elemento desde los params
        try{
            const viaje = await viajeModel.findOne({where:{slug: comodin}}) //Busca las coincidencias en la ddbb
            res.render('detalle',{pagina: viaje.titulo, viaje,})//Y renderiza el detalle de cada viaje
        }catch(err){
            console.log(err)
        }
    },
    postearTestimonio: async (req ,res)=>{//requerir body parser en index.js para capturar los datos del formulario
        const { nombre , correo , mensaje } = req.body;//Desde req.body conseguir esos datos
        console.log( nombre , correo , mensaje )
        //Validar que no lleguen datos vacios  
        if(nombre.trim() === '' || correo.trim() === '' || mensaje.trim() === ''){
            //Descargar los testimonios para mostrarlos siempre
            const testimonios = await  testimonialModel.findAll()
            //Renderiza alertas en caso de estar vacios, los testimonios  y completa los campos automaticamente
            res.render('testimoniales' , {
                pagina: 'Testimoniales',
                alerta: 'Faltan completar algunos campos',
                nombre, 
                correo,
                mensaje,
                testimonios 
            })
        }else{//Si los campos llegan con data
            try{
                await testimonialModel.create({nombre , correo , mensaje})//Grabar en la ddbb
                res.redirect('/testimoniales')//Y recargar
            }catch(err){
                console.log(err)
            }
        } 
    },
}
//Exportar hacia el router
module.exports = viajeController;