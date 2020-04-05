//ENDPOINT TESTING

const app = require('./../../server');
const {
    PORT
} = require("./../../config");

app.listen(PORT);

const supertest = require('supertest');
const request = supertest(app);
const {
    User
} = require('./../../models/index');


describe('Checking endpoints', () => {

    afterAll(async () => {
        console.log("... Test Ended");
        app.close();
    });

    it('gets the home endpoint', async (done) => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Welcome aboard!');
        done();
    })

    it('Should POST user to database', async done => {
        const res = await request.post('/user')
            .send({
                name: 'tester',
                email: 'tester@gmail.com',
                pwd: 'tester'
            });
        done();
    })

    it('Should have user saved in database', async done => {
        const user = await User.findOne({
            email: 'tester@gmail.com'
        });
        expect(user.name).toBeTruthy();
        expect(user.email).toBeTruthy();
        expect(user.pwd).toBeTruthy();
        done();
    })

    it('Should GET user save from database', async done => {
        //fetching user 
        const user = await User.findOne({
            email: 'tester@gmail.com'
        });
        //deleting user
        const UserFetched = await request.get(`/user/userId/${user._id}`);
        expect(UserFetched.body.message.email).toBe('tester@gmail.com');
        done();
    })

    it('Should UPDATE test user from database', async done => {
        //fetching user 
        const user = await User.findOne({
            name: 'tester'
        });
        //updating user
        const UserUpdated = await request.put(`/user/userId/${user._id}`)
            .send({
                name: 'nameChanged',
            });
        expect(UserUpdated.body.message.name).toBe('nameChanged');
        done();
    })

    it("Should get more than 0 users", async done => {
        const users = await User.find({});
        expect(users.length).toBeGreaterThan(0);
        done();
    })

    it('Should DELETE one user from database', async done => {
        //fetching user 
        const user = await User.findOne({
            name: 'nameChanged'
        });
        //deleting user
        const UserDeleted = await request.delete(`/user/userId/${user._id}`);
        expect(UserDeleted.status).toBe(200);
        done();
    })

    it('gets the 404 for unknown endpoint', async (done) => {
        const response = await request.get('/unknown');
        expect(response.body.status).toBe(404);
        expect(response.body.message).toBe('Not found!');
        done();
    })

})