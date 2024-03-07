'user strict'

const Sequelize = require('sequelize');
const db = require('../models')
const Servicio = db.servicios;
const xmlbuilder = require('xmlbuilder');

module.exports = {
    async findAll(req, res) {
        await Servicio.findAll().then(servicios => {
            const xmlServicios = xmlbuilder.create('servicios');
    
            servicios.forEach(servicio => {
                const idServicio = servicio.dataValues.id;
                const nombre = servicio.dataValues.nombre;
                const descripcion = servicio.dataValues.descripcion;
                const precio = servicio.dataValues.precio;
                const estado = servicio.dataValues.estado;
    
                xmlServicios.ele('servicio', { id: idServicio })
                    .ele('nombre', nombre).up()
                    .ele('apellido', descripcion).up()
                    .ele('telefono', precio).up()
                    .ele('estado', estado).up();
            });
    
            const xml = xmlServicios.end({ pretty: true });
            res.send(xml);
    
        }).catch(error => res.status(400).send(error));
    },    

    async find(req, res){
        const id = req.body.id;
        await Servicio.findByPk(id).then( servicios => {

            const id_Servicio = servicios.dataValues.id;
            const nombre = servicios.dataValues.nombre;
            const descripcion = servicios.dataValues.descripcion;
            const precio = servicios.dataValues.precio;
            const estado = servicios.dataValues.estado;

            const xml = xmlbuilder.create('servicios')
            .ele('Servicio', { id: id_Servicio })
                .ele('nombre', nombre).up()
                .ele('descripcion', descripcion).up()
                .ele('precio', precio).up()
                .ele('estado', estado).up()
            .end({ pretty: true });

            res.send(xml)

        }).catch(error => res.status(400).send(error));
    },

    async create(req, res) {
        try {
            const { nombre, descripcion, precio, estado } = req.body;


            const nuevoServicio = await Servicio.create({ nombre, descripcion, precio, estado });

            const xml = xmlbuilder.create('Servicio')
                .ele('id', nuevoServicio.id).up()
                .ele('nombre', nuevoServicio.nombre).up()
                .ele('descripcion', nuevoServicio.descripcion).up()
                .ele('precio', nuevoServicio.precio).up()
                .ele('estado', nuevoServicio.estado)
                .end({ pretty: true });

            res.send(xml);
        } catch (error) {
            console.error(error);
            res.status(400).send('Error al crear el Servicio');
        }
    },

    async update(req, res) {
        try {
            const { id, nombre, descripcion, precio, estado } = req.body;

            await Servicio.update({ nombre, descripcion, precio, estado }, {
                where: { id }
            });

            res.status(200).send('Servicio actualizado correctamente');
        } catch (error) {
            console.error(error);
            res.status(400).send('Error al actualizar el Servicio');
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.body;

            await Servicio.update({ estado: 0}, {
                where: { id }
            });

            res.status(200).send('Servicio eliminado correctamente');
        } catch (error) {
            console.error(error);
            res.status(400).send('Error al eliminar el Servicio');
        }
    }
}