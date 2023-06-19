const express = require('express')
const clientesController = require('../controllers/clientes-controller-api')
const router = express.Router();

router.get('/api/clientes',clientesController.getTodosClientes); 
router.get('/api/clientes/:id',clientesController.getClientePorID); 
router.delete('/api/clientes/:id',clientesController.deleteClientePorID); 
router.post('/api/clientes',clientesController.postCliente);
router.put('/api/clientes/:id',clientesController.putClientePorID);



module.exports=router;

