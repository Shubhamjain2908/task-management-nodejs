exports.up = async (knex, Promise) => {

    try {
        await knex.schema
            .createTable('task', table => {
                table.increments('id').primary();
                table.string('title').notNullable()
                table.string('description')
                table.string('status').notNullable()
                table.integer('userId')
                    .references('id')
                    .inTable('user')
                    .notNullable()
                    .onDelete('CASCADE');
                table.timestamps(false, true);
            });
        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e);
    }
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('task');
};