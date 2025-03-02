// Camada intermediaria (pega modelo, aplica regras e faz interface com controller)
// Pega arquivo index por padrão
const dataSource = require('../database/models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(where = {}) {
    return dataSource[this.model].findAll({ where: { ...where } });
  }

  async pegaRegistrosPorEscopo(escopo) {
    return dataSource[this.model].scope(escopo).findAll();
  }

  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async pegaUmRegistro(where) {
    // Busca por diferentes parametros, como id, nome e email.
    return dataSource[this.model].findOne({ where: {...where} });
  }

  async pegaEContaRegistros(where) {
    return dataSource[this.model].findAndCountAll({
      where: {...where},
      limit: 2, // Paginação
      order: [['id', 'ASC']] // Ordenação por ascendencia
    });
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(dadosAtualizados, where) {
    const listadeRegistrosAtualizados = dataSource[this.model].update(dadosAtualizados, {
      where: { ...where }
    });
    if (listadeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  async excluiRegistro(id) {
    return dataSource[this.model].destroy({where: { id: id}});
  }
}

module.exports = Services;