const common = require('../../index');

describe('POST /access-token', () => {
  it('POST /access-token', async () => {
    //test
    const payload = {
      username: 'admin',
      password: 'U2FsdGVkX1/voegCIfsS+WSNuML+eZ3brYktdeFaQgA=',
    };
    const res = await common.chai
      .request(common.server)
      .post(`/api/v1/auth/access-token`)
      .send(payload);

    const status = res.status;
    common.handleStatusError(res);
    res.should.have.status(status);
  });
});
