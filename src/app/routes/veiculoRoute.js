'use strict';

const router = require('express').Router();

const controller = require('../controllers/veiculoController');

router.get("/veiculos/:id", controller.getById);
router.get("/veiculos", controller.get);

module.exports = app => app.use('/api/v1', router);