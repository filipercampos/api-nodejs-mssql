
const router = require('express').Router();
const controller = require('../controllers/usuarioController');

///O controller faz referencia ao 'ponteiro' this
///Então vc precisa especificar o nome da função
///Mesmo ela recebendo os mesmo parametros

//get user by id
router.get("/usuarios/:id", (req, res) => controller.getById(req, res));

//get users by criteria
router.get("/usuarios", (req, res) => controller.get(req, res));

module.exports = app => app.use('/api/v1', router);