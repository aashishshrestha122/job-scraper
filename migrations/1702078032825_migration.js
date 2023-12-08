/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        user_id: 'id',
        username: { type: 'varchar(1000)', notNull: true },
        password: { type: 'varchar(1000)', notNull: true },
        email: { type: 'varchar(1000)', notNull: true },
        created_on: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        last_login: {
            type: 'timestamp',
            default: pgm.func('current_timestamp'),
        },
    })
};

exports.down = pgm => { };
