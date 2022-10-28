const request = require("supertest")

const { createApp } = require("../../app")
const { AppDataSource } = require("../models/datasource")

const user_id = "41f63499-519c-490a-bdd6-026f028e05k4"

describe("notice", () => {
    let app;
    beforeAll(async () => {
        app = createApp();
        await AppDataSource.initialize();
        await AppDataSource.query(
            `
            INSERT INTO user (id, age, name, email, password, gender, phone)
            VALUES ("41f63499-519c-490a-bdd6-026f028e05k4", 21, "test", "noticetest@test.com", "qwer1234", "male", "010-1234-1234");
            `);
        await AppDataSource.query(
            `
            INSERT INTO grade (grade) VALUES ("admin"), ("user"), ("staff");
            `);
        await AppDataSource.query(
            `
            INSERT INTO notice_type (type, grade_id) VALUES ("notice_board", 1), ("member_board", 2), ("management_board", 3);
            `);
    });

    afterAll(async () => {
        await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
        // await AppDataSource.query(`TRUNCATE user`);
        await AppDataSource.query(`TRUNCATE notice`);
        await AppDataSource.query(`TRUNCATE notice_type`);
        await AppDataSource.query(`TRUNCATE grade`);
        await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
        await AppDataSource.destroy();
    });

    test("SUCCESS: notice register", async () => {
        await request(app)
            .post("/notice/register")
            .send({
                "user_id": user_id,
                "title": "테스트공지",
                "content": "테스트입니다.",
                "type_id": 1
            })
            .expect(200)
            .expect({"message": "게시글이 등록 되었습니다."})
    });

    test("FAIL: notice register", async () => {
        await request(app)
            .post("/notice/register")
            .send({
                "user_id": user_id,
                "content": "테스트입니다.",
                "type_id": 1
            })
            .expect(400)
            .expect({"message": "게시판 제목을 입력 해 주세요."})
    });

    test("SUCCESS: notice edit", async () => {
        await request(app)
            .put("/notice/edit")
            .send({
                "user_id": user_id,
                "notice_id" : 1,
                "title" : "타이틀 수정입니다.",
                "content" : "본문 수정입니다."
            })
            .expect(200)
            .expect({"message": "게시글이 수정 되었습니다."})
    });

    test("FAIL: notice edit", async () => {
        await request(app)
            .put("/notice/edit")
            .send({
                "user_id": user_id,
                "notice_id" : 31,
                "title" : "타이틀 수정입니다.",
                "content" : "본문 수정입니다."
            })
            .expect(500)
            .expect({"message": "Cannot read properties of undefined (reading 'user_id')"})
    });

    test("SUCCESS: notice delete", async () => {
        await request(app)
            .delete("/notice/edit")
            .send({
                "user_id": user_id,
                "notice_id" : 3
            })
            .expect(404)
            .expect({})
    });
});