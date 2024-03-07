const { Router } = require('express');
const router = Router();

const clienteRoute = require('./routesCrud/clienteRoute');
const servicioRoute = require('./routesCrud/servicioRoute');

module.exports = (app) => {

     app.use('/api/clientes', clienteRoute);
     app.use('/api/servicios', servicioRoute);

     app.use('/', router);
}