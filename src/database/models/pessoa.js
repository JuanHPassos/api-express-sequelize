/* eslint-disable linebreak-style */
const isCpfValido = require('../../utils/validaCpfHelper.js');

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
        scope: { status: 'matriculado' }, // Filtra apenas matrículas com status "matriculado"
        // Cria o método getAulasMatriculadas()
        as: 'aulasMatriculadas' // "as" usada para passar apelidos 
      });  
      // 1 para N (pessoa tem varias matriculas)
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        // Cria o método getAulasMatriculadas()
        as: 'todasAsMatriculas' // "as" usada para passar apelidos 
      });  
    }
  }
  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 30],
          msg: 'o campo nome deve ter no mínimo 3 caracteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'formato do email inválido',
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      // Realizada na consulta (!= de uma constraint)
      validate: {
        cpfEhValido: (cpf) => {
          if (!isCpfValido(cpf)) throw new Error('número de CPF inválido');
        }
      }
    },
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