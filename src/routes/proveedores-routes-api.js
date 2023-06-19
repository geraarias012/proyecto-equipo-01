const express = require('express')
const proveedoresController = require('../controllers/proveedores-controller-api')
const router = express.Router();

router.get('/api/proveedores',proveedoresController.getTodosProveedores); 
router.get('/api/proveedores/:id',proveedoresController.getProveedorPorID); 
router.delete('/api/proveedores/:id',proveedoresController.deleteProveedorPorID); 
router.post('/api/proveedores',proveedoresController.postProveedor);
router.put('/api/proveedores/:id',proveedoresController.putProveedorPorID);



module.exports=router;

