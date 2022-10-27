const { AppDataSource } = require("./datasource");

module.exports = {
  getLogByGender: async (gender) => {
    try {
      return await AppDataSource.query(
        `
            SELECT * FROM user 
            WHERE gender = ?
            `,
        [gender]
      );
    } catch (err) {
      throw new Error("SERVER ERROR", 500);
    }
  },
};
