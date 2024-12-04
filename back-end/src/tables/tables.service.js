const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((rows) => rows[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function seat(table_id, reservation_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id }, "*")
    .then((rows) => rows[0]);
}

function finish(table_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id: null }, "*")
    .then((rows) => rows[0]);
}

module.exports = {
  list,
  create,
  read,
  seat,
  finish,
};