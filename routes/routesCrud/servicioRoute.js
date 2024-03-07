const { Router } = require('express');
const servicioController = require('../../controllers/servicioController');
const router = Router();

router.get('/find', servicioController.find);
router.get('/findAll', servicioController.findAll);
router.post('/create', servicioController.create);
router.put('/update', servicioController.update);
router.put('/delete', servicioController.delete);

module.exports = router;