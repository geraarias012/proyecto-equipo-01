const express = require('express')
const productosController = require('../controllers/productos-controller-api')
const router = express.Router();

router.get('/api/productos',productosController.getTodasProductos); 
router.get('/api/productos/:id',productosController.getProductoPorID); 
router.delete('/api/productos/:id',productosController.deleteProductoPorID); 
router.post('/api/productos',productosController.postProducto);
router.put('/api/productos/:id',productosController.putProductoPorID);



module.exports=router;

