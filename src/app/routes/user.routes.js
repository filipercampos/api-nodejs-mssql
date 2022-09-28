const router = require('express').Router();
const controller = require('../controllers/user.controller');

///O controller faz referencia ao 'ponteiro' this
///Então vc precisa especificar o nome da função
///Mesmo ela recebendo os mesmo parametros

//get user by id
router.get('/users/:id', (req, res) => controller.findById(req, res));

//get users by criteria
router.get('/users', (req, res) => controller.find(req, res));

//post user
router.post('/users', (req, res) => controller.post(req, res));

//patch user
router.patch('/users/:id', (req, res) => controller.patch(req, res));

module.exports = (app) => app.use('/api/v1', router);
