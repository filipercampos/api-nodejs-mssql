const common = require('../index'); 

describe('POST Auth', () => {

    it('POST Auth', async ()=> {
        //test
        const payload = {
            "username": "dev@mail.com",
            "password": "password2"
        };
        const res = await common.chai.request(common.server)
            .post(`/api/v1/auth/access-token`)
            .send(payload);

        const status = res.status;
        common.verifyStatusError(res);
        res.should.have.status(status);
    });

});

