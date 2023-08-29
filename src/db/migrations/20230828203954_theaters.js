exports.up = function(knex){
    return knex.schema.createTable("theaters", (table) => {
        table.increments("theater_id").primary();
        table.string("city");
        table.string("state");
        table.string("zip");
        table.timestamps(true,true);
    });
};

exports.down = function (knex){
    return knex.schema.dropTable("theaters");
};