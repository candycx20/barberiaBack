'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estudiante extends Model {
    static associate(models) {

    }
  };
  estudiante.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carnet: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'estudiantes',
  });
  return estudiante;
};