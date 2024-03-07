'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cita extends Model {
    static associate(models) {
      cita.belongsTo(models.facturas, {
        foreignKey: 'id_factura',
      })
    }
  };
  cita.init({
    fechaReservacion: {
        type: DataTypes.DATE,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_factura: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
  }, {
    sequelize,
    modelName: 'citas',
  });
  return cita;
};