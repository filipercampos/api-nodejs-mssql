const BaseController = require('./baseController');
const MarvelService = require('../services/marvelService');
const service = new MarvelService();

class MarvelController extends BaseController {
  constructor() {
    super(service);
  }

  async getCharacteres(req, res) {
    try {
      let result = await service.getCharacteres(req.query);
      super.sendSuccess(res, result);
    } catch (err) {
      super.sendError(res, err);
    }
  }

  async getCharacterById(req, res) {
    try {
      let result = await service.getCharacterById(req.params.id);
      super.sendSuccess(res, result);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

module.exports = new MarvelController();