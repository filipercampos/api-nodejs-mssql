'use strict';
const router = require('express').Router();
const controller = require('../controllers/authController');

//get token
router.post('/access-token', controller.accessToken);

//refresh token
router.post("/refresh-token", controller.refreshToken);

module.exports = app => app.use('/api/v1/auth', router);