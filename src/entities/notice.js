const EntitySchema = require("typeorm").EntitySchema; 

module.exports = new EntitySchema({
    name: "notices",
    tableName: "notice",
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
        view: {
            type: "int",
            nullable: false
        },
        content: {
            type: "text",
            nullable: false
        },
        type_id: {
            type: "int",
            nullable: false
        },
        created_at: {
            type: "timestamp",
            default: () => 'CURRENT_TIMESTAMP',
        },
        updated_at: {
            type: "timestamp",
            nullable: true,
            onUpdate: 'CURRENT_TIMESTAMP'
        }
    },
    relations: {
        users: {
            type: 'many-to-one',
            target: 'user',
            joinColumn: {
                name: 'user_id',
            }
        },
        notice_type: {
            type: 'many-to-one',
            target: 'notice_type',
            joinColumn: {
                name: 'type_id',
            }
        }
    },
});