'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class factura extends Model {
    static associate(models) {
      factura.belongsTo(models.clientes, {
        foreignKey: 'id_cliente',
      }),
      factura.hasMany(models.citas, {
        foreignKey: 'id_factura',
      }),
      factura.hasMany(models.detalleServicios, {
        foreignKey: 'id_factura',
      })
    }
  };
  factura.init({
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
  }, {
    sequelize,
    modelName: 'facturas',
  });
  return factura;
};