const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaService.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }
}

module.exports = PessoaController;