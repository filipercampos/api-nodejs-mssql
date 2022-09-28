const router = require('express').Router();
const controller = require('../controllers/marvel.controller');

//get user by id
router.get('/characteres/:id', (req, res) =>
  controller.getCharacterById(req, res)
);
//get users by criteria
router.get('/characteres', (req, res) => controller.getCharacteres(req, res));

module.exports = (app) => app.use('/api/v1/marvel', router);
