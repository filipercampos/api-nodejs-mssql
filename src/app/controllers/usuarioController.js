const BaseController = require('./baseController');
const UsuarioRepository = require('../domain/repositories/usuarioRepository');

class UsuarioController extends BaseController {
  constructor() {
    super(new UsuarioRepository());
  }

  async get(req, res) {
    return super.get(res, req);
  }
}
module.exports = new UsuarioController();