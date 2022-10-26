const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "notice_type",
    tableName: "notice_type",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        type: {
            type: "varchar",
            nullable: false
        },
        grade_id: {
            type: "varchar",
            nullable: false
        }
    },
    relations: {
        notice_type: {
        type: 'many-to-one',
        target: 'grade',
        joinColumn: {
            name: 'grade_id',
            },
        }
    },
});