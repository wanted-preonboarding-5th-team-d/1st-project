const users = require("../entities/user");
const notice = require("../entities/notice");
const notice_type = require("../entities/notice_type");
const grades = require("../entities/grades");
const user_logs = require("../entities/user_logs");

const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  TIME_ZONE: process.env.TIME_ZONE,
  entities: [users, notice, notice_type, grades, user_logs],
  synchronize: false,
<<<<<<< HEAD
  logging: true,
=======
  logging: false,
>>>>>>> feature/notice_register
});

module.exports = { AppDataSource };