'use strict';

module.exports = {
  Exception: require('./exception'),
  ForbiddenException: require('./forbidden.exception'),
  BadRequestException: require('./bad-request.exception'),
  UnauthorizedException: require('./unauthorized.exception'),
  UnprocessableEntityException: require('./unprocessable-entity.exception'),
  NotFoundException: require('./not-found.exception'),
  InternalErrorException: require('./internal-error.exception'),
  DatabaseException: require('./database.exception'),
};
