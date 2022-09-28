'use strict';

const LoggerBuilder = require('../../../infra/logger/logger.builder');

/**
 * Service
 */
module.exports = class BaseService {
  constructor() {
    this.logger = new LoggerBuilder(this);
  }
  /**
   * Send request get
   */
  find(query) {
    return [];
  }

  /**
   * Send request get
   */
  findById(id) {
    return null;
  }

  /**
   * Send request save
   */
  post(body) {
    return null;
  }

  /**
   * Send request update
   */
  put(id, body) {
    return null;
  }

  /**
   * Send request update
   */
  patch(id, body) {
    return null;
  }

  /**
   * Send request delete
   */
  delete(criteria) {
    return null;
  }
};
