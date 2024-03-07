'user strict'

const Sequelize = require('sequelize');
const db = require('../models')
const Estudiante = db.estudiantes;
const xmlbuilder = require('xmlbuilder');

module.exports = {
    async get(req, res){
        const id = req.body.id;
        await Estudiante.findByPk(id).then( estudiantes => {

            const id_estudiante = estudiantes.dataValues.id;
            const nombre = estudiantes.dataValues.nombre;
            const carnet = estudiantes.dataValues.carnet;

            const xml = xmlbuilder.create('estudiantes')
            .ele('estudiante', { id: id_estudiante })
                .ele('nombre', nombre)
                .up()
                .ele('carnet', carnet)
            .up()
            .up()
            .end({ pretty: true });

            res.send(xml)

        }).catch(error => res.status(400).send(error));
    }

}