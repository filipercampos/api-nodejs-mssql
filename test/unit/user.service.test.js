const chai = require('chai');
const UserService = require('../../src/app/domain/services/user.service');
const assert = chai.assert;

describe('UserService', () => {
  it('Get user by id', async () => {
    await new UserService().findById(1).then((value) => {
      assert.equal(value?.email, 'admin');
    });
  });
});
