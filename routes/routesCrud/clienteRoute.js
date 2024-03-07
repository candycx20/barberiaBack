const { Router } = require('express');
const clienteController = require('../../controllers/clienteController');
const router = Router();

router.get('/find', clienteController.find);
router.get('/findAll', clienteController.findAll);
router.post('/create', clienteController.create);
router.put('/update', clienteController.update);
router.put('/delete', clienteController.delete);

module.exports = router;