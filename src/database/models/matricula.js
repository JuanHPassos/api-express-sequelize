/* eslint-disable linebreak-style */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matricula extends Model {
    static associate(models) {
      // N para 1 (matricula de uma pessoa)
      Matricula.belongsTo(models.Pessoa, {
        foreignKey: 'estudante_id'
      });
      // N para 1 (matricula de um curso)
      Matricula.belongsTo(models.Curso, {
        foreignKey: 'curso_id'
      });
    }
  }
  Matricula.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matricula',
    tableName:'matriculas',
    paranoid: true
  });
  return Matricula;
};