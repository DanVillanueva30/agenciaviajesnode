import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";


//Solo se puede tener una instancia de nuestra aplicación
const app = express();

//Conectar la base de datos.
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch(error => console.log(error))

//Definir el puerto
const port = process.env.PORT || 4000;

//Habilitar PUg
app.set('view engine', 'pug');

//Obtener el año actual.
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    return next();
});

//Agregar body parser para leer los datos del formulario.
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica para que pueda tomar las hojas de estilos y las imagenes
app.use(express.static('public'));

//Agregar router
app.use('/', router);

//Iniciar el servidor
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`)
});