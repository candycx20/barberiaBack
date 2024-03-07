"use strict";
var Sequelize = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    static associate(models) {}
  }
  clientes.init(
    {
      nombres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      correo: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "clientes",
    }
  );
  return clientes;
};
