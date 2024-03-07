const { Router } = require('express');
const router = Router();

const XMLController = require('../controllers/XMLController')
const XMLClientesController = require('../controllers/XMLClientesController')

module.exports = (app) => {
     router.get('/xml/get', XMLController.get)

     router.get('/xml/clientes/getAll', XMLClientesController.getAll)
     router.get('/xml/clientes/hello', XMLClientesController.hello)
     app.use('/', router);
}