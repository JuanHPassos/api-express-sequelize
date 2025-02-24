/* eslint-disable linebreak-style */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      // 1 para N (pessoa tem varios cursos)
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id'
      });
      // 1 para N (pessoa tem varias matriculas)
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id'
      });  
    }
  }
  Pessoa.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas'
  });
  return Pessoa;
};