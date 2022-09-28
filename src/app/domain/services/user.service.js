const UserModel = require('../models/user.model');
const UserRepository = require('../repositories/user.repository');
const { PostUserDto } = require('../dto');
const BaseService = require('./base.service');
const PatchUserDto = require('../dto/patch-user.dto');

module.exports = class UserService extends BaseService {
  constructor() {
    super();
    this._repository = new UserRepository();
  }
  /**
   * Get user by id
   *
   * @param {number} id
   * @returns {Promise<UserModel>}
   */
  findById(id) {
    return this._repository.findById(id);
  }

  /**
   * Get user by query
   *
   * @param {GetUserDto} query
   * @returns {Promise<UserModel[]>}
   */
  find(query) {
    return this._repository.find(query);
  }

  /**
   * Save user
   *
   * @param {PostUserDto} body
   * @returns {Promise<UserModel[]>}
   */
  async post(body) {
    const result = await this._repository.post(body);
    return { id: result, message: 'User saved' };
  }

  /**
   * Patch user
   *
   * @param {PatchUserDto} body
   * @returns {Promise<UserModel[]>}
   */
  async patch(id, body) {
    await this._repository.patch(id, body);
    return { message: 'User updated' };
  }
};
