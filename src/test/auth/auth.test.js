const common = require('../index');
const chalk = common.chalk;

describe('POST Auth', () => {

    it('POST Auth', async function () {
        //test
        const payload = {
            "username": "dev@mail.com",
            "password": "password"
        };
        const res = await common.chai.request(common.server)
            .post(`/api/v1/auth/access-token`)
            .send(payload);

        const status = res.status;

        if (status === 404 || status === 500) {
            console.log(chalk.red('\t' + res.body.data.message));
        }
        res.should.have.status(status === 200 || status === 401);

    });

});

