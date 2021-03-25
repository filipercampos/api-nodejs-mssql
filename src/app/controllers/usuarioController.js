const BaseController = require('./baseController');
const UsuarioRepository = require('../domain/repositories/usuarioRepository');

class UsuarioController extends BaseController {
  constructor() {
    super(new UsuarioRepository());
  } 
}
module.exports = new UsuarioController();