/* eslint-disable linebreak-style */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      // N para 1 (cursos pertencem a categoria)
      Curso.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id'
      });
      // N para 1 (curso pertence a uma pessoa(docente))
      Curso.belongsTo(models.Pessoa, {
        foreignKey: 'docente_id'
      });
      // N para 1 (um curso tem varis matriculas)
      Curso.hasMany(models.Matricula, {
        foreignKey: 'curso_id'
      });
      
    }
  }
  Curso.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Curso',
    tableName: 'cursos'
  });
  return Curso;
};