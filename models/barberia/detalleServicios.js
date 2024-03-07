'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalleServicios extends Model {
    static associate(models) {
        detalleServicios.belongsTo(models.facturas, {
          foreignKey: 'id_factura',
        }),
        detalleServicios.belongsTo(models.servicios, {
            foreignKey: 'id_servicio',
          })
    }
  };
  detalleServicios.init({
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_factura: {
        allowNull: false,
        type: DataTypes.INTEGER
      }, 
      id_servicio: {
        allowNull: false,
        type: DataTypes.INTEGER
      }, 
  }, {
    sequelize,
    modelName: 'detalleServicios',
  });
  return detalleServicios;
};