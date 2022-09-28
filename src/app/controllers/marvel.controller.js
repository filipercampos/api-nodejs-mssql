const BaseController = require('./base.controller');
const MarvelService = require('../../libs/marvel.service');
const ResponseHelper = require('../common/helpers/response.helper');

class MarvelController extends BaseController {
  constructor() {
    super(new MarvelService());
  }

  async getCharacteres(req, res) {
    try {
      const result = await this._service.getCharacteres(req.query);
      ResponseHelper.sendSuccess(res, result);
    } catch (err) {
      ResponseHelper.sendError(res, err);
    }
  }

  async getCharacterById(req, res) {
    try {
      const result = await this._service.getCharacterById(req.params.id);
      ResponseHelper.sendSuccess(res, result);
    } catch (err) {
      ResponseHelper.sendError(res, err);
    }
  }
}

module.exports = new MarvelController();
