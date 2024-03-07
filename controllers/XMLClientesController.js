'user strict'

const Sequelize = require('sequelize');
const db = require('../models')
const Cliente = db.clientes;
const xmlbuilder = require('xmlbuilder');

module.exports = {
    async getAll(req, res) {
        await Cliente.findAll().then(clientes => {
            const xmlClientes = xmlbuilder.create('clientes');
    
            clientes.forEach(cliente => {
                const idCliente = cliente.dataValues.id;
                const nombre = cliente.dataValues.nombres;
                const apellido = cliente.dataValues.apellidos;
                const telefono = cliente.dataValues.telefono;
                const correo = cliente.dataValues.correo;
                const estado = cliente.dataValues.estado;
    
                xmlClientes.ele('Cliente', { id: idCliente })
                    .ele('nombre', nombre).up()
                    .ele('apellido', apellido).up()
                    .ele('telefono', telefono).up()
                    .ele('correo', correo).up()
                    .ele('estado', estado)
                    .up();
            });
    
            const xml = xmlClientes.end({ pretty: true });
            res.send(xml);
    
        }).catch(error => res.status(400).send(error));
    },    
    async get(req, res){
        const id = req.body.id;
        await Cliente.findByPk(id).then( clientes => {

            const id_Cliente = clientes.dataValues.id;
            const nombre = clientes.dataValues.nombre;
            const carnet = clientes.dataValues.apellido;

            const xml = xmlbuilder.create('clientes')
            .ele('Cliente', { id: id_Cliente })
                .ele('nombre', nombre)
                .up()
                .ele('apellido', carnet)
            .up()
            .up()
            .end({ pretty: true });

            res.send(xml)

        }).catch(error => res.status(400).send(error));
    },

    async created(req, res) {
        try {
            const { nombre, apellido, telefono, correo, estado } = req.body;

           
            const nuevoCliente = await Cliente.create({ nombre, apellido, telefono, correo, estado });

            const idCliente = nuevoCliente.id;
            const nombreCliente = nuevoCliente.nombre;
            const apellidoCliente = nuevoCliente.apellido;
            const telefonoCliente = nuevoCliente.telefono;
            const correoCliente = nuevoCliente.correo;
            const estadoCliente = nuevoCliente.estado;

            const xml = xmlbuilder.create('cliente')
                .ele('id', idCliente)
                .up()
                .ele('nombre', nombreCliente)
                .up()
                .ele('apellido', apellidoCliente)
                .up()
                .ele('apellido', telefonoCliente)
                .up()
                .ele('apellido', correoCliente)
                .up()
                .ele('apellido', estadoCliente)
                .end({ pretty: true });

            
            res.send(xml);
        } catch (error) {
            console.error(error);
            res.status(400).send('Error al crear el cliente');
        }
    }

}
