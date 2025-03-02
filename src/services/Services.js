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

  async pegaEContaRegistros(options) {
    return dataSource[this.model].findAndCountAll({ ...options });
  }

  async criaRegistro(dadosDoRegistro, transacao) {
    return dataSource[this.model].create(dadosDoRegistro, {transaction: transacao});
  }

  async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
    const listadeRegistrosAtualizados = await dataSource[this.model]
      .update(dadosAtualizados, {
        where: { ...where },
        transaction: transacao
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