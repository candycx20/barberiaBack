'user strict'

const Sequelize = require('sequelize');
const db = require('../models')
const Cliente = db.clientes;
const xmlbuilder = require('xmlbuilder');

module.exports = {
    async findAll(req, res) {
        await Cliente.findAll().then(clientes => {
            const xmlClientes = xmlbuilder.create('clientes');
    
            clientes.forEach(cliente => {
                const idCliente = cliente.dataValues.id;
                const nombre = cliente.dataValues.nombre;
                const apellido = cliente.dataValues.apellido;
                const telefono = cliente.dataValues.telefono;
                const correo = cliente.dataValues.correo;
                const estado = cliente.dataValues.estado;
    
                xmlClientes.ele('Cliente', { id: idCliente })
                    .ele('nombre', nombre).up()
                    .ele('apellido', apellido).up()
                    .ele('telefono', telefono).up()
                    .ele('correo', correo).up()
                    .ele('estado', estado).up();
            });
    
            const xml = xmlClientes.end({ pretty: true });
            res.send(xml);
    
        }).catch(error => res.status(400).send(error));
    },    

    async find(req, res){
        const id = req.body.id;
        await Cliente.findByPk(id).then( clientes => {

            const id_Cliente = clientes.dataValues.id;
            const nombre = clientes.dataValues.nombre;
            const apellido = clientes.dataValues.apellido;
            const telefono = clientes.dataValues.telefono;
            const correo = clientes.dataValues.correo;
            const estado = clientes.dataValues.estado;

            const xml = xmlbuilder.create('clientes')
            .ele('Cliente', { id: id_Cliente })
                .ele('nombre', nombre).up()
                .ele('apellido', apellido).up()
                .ele('telefono', telefono).up()
                .ele('correo', correo).up()
                .ele('estado', estado).up()
            .end({ pretty: true });

            res.send(xml)

        }).catch(error => res.status(400).send(error));
    },

    async create(req, res) {
        try {
            const { nombre, apellido, telefono, correo, estado } = req.body;


            const nuevoCliente = await Cliente.create({ nombre, apellido, telefono, correo, estado });

            const xml = xmlbuilder.create('cliente')
                .ele('id', nuevoCliente.id).up()
                .ele('nombre', nuevoCliente.nombre).up()
                .ele('apellido', nuevoCliente.apellido).up()
                .ele('telefono', nuevoCliente.telefono).up()
                .ele('correo', nuevoCliente.correo).up()
                .ele('estado', nuevoCliente.estado)
                .end({ pretty: true });

            res.send(xml);
        } catch (error) {
            console.error(error);
            res.status(400).send('Error al crear el cliente');
        }
    },

    async update(req, res) {
        try {
            const { id, nombre, apellido, telefono, correo, estado } = req.body;

            await Cliente.update({ nombre, apellido, telefono, correo, estado }, {
                where: { id }
            });

            res.status(200).send('Cliente actualizado correctamente');
        } catch (error) {
            console.error(error);
            res.status(400).send('Error al actualizar el cliente');
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.body;

            await Cliente.update({ estado: 0}, {
                where: { id }
            });

            res.status(200).send('Cliente eliminado correctamente');
        } catch (error) {
            console.error(error);
            res.status(400).send('Error al eliminar el cliente');
        }
    }
}