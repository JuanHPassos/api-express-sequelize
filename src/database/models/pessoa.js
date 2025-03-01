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
        foreignKey: 'estudante_id',
        // scope: { status: 'matriculado' }, // Filtra apenas matrículas com status "matriculado"
        // Cria o método getAulasMatriculadas()
        as: 'aulasMatriculadas' // "as" usada para passar apelidos 
      });  
    }
  }
  Pessoa.init({
    nome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'formato do email inválido',
        }
      }
    },
    cpf: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true,
    // Escopo de modelo.
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes: {
      todosOsRegistros: {
        where: {} // sem especificação(pega tudo).
      }
    }
  });
  return Pessoa;
};