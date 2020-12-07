
exports.up = function(knex) {
  return knex.schema.table('Post', (table) => {
    table.renameColumn('name', 'title')
    table.text('description')
  })
};

exports.down = function(knex) {
  return knex.schema.table('Post', (table) => {
    table.renameColumn('title', 'name')
    table.dropColumn('description')
  })
};
