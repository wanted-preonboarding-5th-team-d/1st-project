const EntitySchema = require("typeorm").EntitySchema; 

module.exports = new EntitySchema({
    name: "grades",
    tableName: "grade",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        grade: {
            type: "varchar",
            nullable: false
        }
    },
});