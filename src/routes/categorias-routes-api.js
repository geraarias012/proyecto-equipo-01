const express = require('express')
const categoriasController = require('../controllers/categorias-controller-api')
const router = express.Router();

router.get('/api/categorias',categoriasController.getTodasCategorias); 
router.get('/api/categorias/:id',categoriasController.getCategoriaPorID); 
router.delete('/api/categorias/:id',categoriasController.deleteCategoriaPorID); 
router.post('/api/categorias',categoriasController.postCategoria);
router.put('/api/categorias/:id',categoriasController.putCategoriaPorID);



module.exports=router;

