const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cors = require('cors');
const puerto = process.env.PORT || 3000;
const rutasCategorias = require('./src/routes/categorias-routes-api');
const rutasProductos = require('./src/routes/productos-routes-api');
const rutasClientes = require('./src/routes/clientes-routes-api');
const rutasProveedores = require('./src/routes/proveedores-routes-api');

const app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials',()=>{});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//Definir rutas: login, categorias, index y Not Found
//GET o POST

app.use(rutasCategorias); 
app.use(rutasProductos);
app.use(rutasClientes);
app.use(rutasProveedores);


app.get('/',(req,res)=>{
    res.render('dashboard');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/ventas',(req,res)=>{
    res.render('ventas');
});

 app.get('/clientes',(req,res)=>{
    res.render('clientes');
}); 

app.get('/proveedores',(req,res)=>{
    res.render('proveedores');
});

app.get('/facturas',(req,res)=>{
    res.render('facturas');
});

app.get('/productos',(req,res)=>{
    res.render('productos');
});

app.get('/categorias',(req,res)=>{
    res.render('categorias');
});


app.get('*',(req,res)=>{
    res.render('404');
});

app.listen(puerto,()=>{
    console.log('El servidor corriendo en el puerto: ',puerto);
});