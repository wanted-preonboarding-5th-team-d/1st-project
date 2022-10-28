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
  getLogByAge: async () => {
    try {
      const rows = await AppDataSource.query(
        `
        SELECT SUM(IF(age BETWEEN 10 AND 19 , 1, 0)) AS age_10
            ,SUM(IF(age BETWEEN 20 AND 29 , 1, 0)) AS age_20
            ,SUM(IF(age BETWEEN 30 AND 39 , 1, 0)) AS age_30
            ,SUM(IF(age BETWEEN 40 AND 49 , 1, 0)) AS age_40
            ,SUM(IF(age BETWEEN 50 AND 59 , 1, 0)) AS age_50
        FROM user;
        `
      );
      return rows[0];
    } catch (err) {
      throw new Error("SERVER ERROR", 500);
    }
  },
};
