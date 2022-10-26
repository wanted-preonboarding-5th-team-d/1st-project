const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "user_logs",
    tableName: "user_log",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        user_id: {
            type: "varchar",
            nullable: false
        },
        page_type: {
            type: "varchar",
            nullable: false
        },
        page_unique_id: {
            type: "varchar",
            nullable: false
        },
        created_at: {
            type: "timestamp",
            default: () => 'CURRENT_TIMESTAMP',
        }
    },
    relations: {
        users: {
            type: 'many-to-one',
            target: 'user',
            joinColumn: {
                name: 'user_id',
            }
        }
    },
});