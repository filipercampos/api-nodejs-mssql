'use strict';
const router = require('express').Router();

//health
router.get('/health', function (req, res) {
  //TODO validate your health
  res.json({ data: { message: `API running on ${process.env.ENV}` } });
});
module.exports = (app) => app.use('/api/v1', router);
