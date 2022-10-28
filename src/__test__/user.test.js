const request = require("supertest")

const { createApp } = require("../../app")
const { AppDataSource } = require("../models/datasource")

describe("user", () => {
    let app;
    beforeAll(async () => {
        app = createApp();
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
        await AppDataSource.query(`TRUNCATE user`);
        await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
        await AppDataSource.destroy();
    });

    test("SUCCESS: signup", async () => {
        await request(app)
            .post("/user/signup")
            .send({
                "name":"test",
                "age": "21",
                "email":"test4@test.com",
                "password":"qwer1234",
                "gender":"male",
                "phone":"010-1234-1234"
            })
            .expect(201)
            .expect({
                "status": 201,
                "success": true,
                "message": "signup success"
            })
    });

    test("FAIL: signup email exists", async () => {
        await request(app)
            .post("/user/signup")
            .send({
                "name":"test",
                "age": "21",
                "email":"test4@test.com",
                "password":"qwer1234",
                "gender":"male",
                "phone":"010-1234-1234"
            })
            .expect(400)
            .expect(
                { message: 'EMAIL ALREADY EXIST', statusCode: 400 }
            )
    });

    test("FAIL: signup email error", async () => {
        await request(app)
            .post("/user/signup")
            .send({
                "name":"test",
                "age": "21",
                "email":"test4test.com",
                "password":"qwer1234",
                "gender":"male",
                "phone":"010-1234-1234"
            })
            .expect(400)
            .expect(
                { message: 'EMAIL ERROR', statusCode: 400 }
            )
    });

    test("FAIL: signup password error", async () => {
        await request(app)
            .post("/user/signup")
            .send({
                "name":"test",
                "age": "21",
                "email":"passwordtest@test.com",
                "password":"qw1234",
                "gender":"male",
                "phone":"010-1234-1234"
            })
            .expect(400)
            .expect(
                { message: "PASSWORD ERROR", statusCode: 400 }
            )
    });

    test("FAIL: signin incorrect email", async () => {
        await request(app)
            .get("/user/signin")
            .send({
                email: "user1@edmail.com",
                password: "qwer1234"
            })
            .expect(400)
            .expect(
                { message: 'EMAIL NOT EXIST', statusCode: 400 }
            )
    });

    test("SUCCESS: signin", async () => {
        await request(app)
            .get("/user/signin")
            .query({
                email: "test4@test.com",
                password: "qwer1234"
            })
            .expect(200)
    });

    test("FAIL: signin incorrenct password", async () => {
        await request(app)
            .get("/user/signin")
            .query({
                email: "test4@test.com",
                password: "qwer123411"
            })
            .expect(400)
            .expect(
                { message: 'PASSWORD ERROR', statusCode: 400 }
            )
    });
});