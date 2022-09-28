const UserService = require('../domain/services/user.service');
const BaseController = require('./base.controller');
class UserController extends BaseController {
  constructor() {
    super(new UserService());
  }
}
module.exports = new UserController();
