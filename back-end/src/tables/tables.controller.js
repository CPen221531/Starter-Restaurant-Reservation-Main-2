const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationService = require("../reservations/reservations.service");

// Validation Middleware
async function validateTable(req, res, next) {
  const { data = {} } = req.body;
  const { table_name, capacity } = data;

  if (!table_name || table_name.length < 2) {
    return next({ status: 400, message: "Table name must be at least 2 characters long." });
  }
  if (!capacity || typeof capacity !== "number" || capacity < 1) {
    return next({ status: 400, message: "Table capacity must be a number greater than 0." });
  }
  res.locals.table = data;
  next();
}

async function validateSeat(req, res, next) {
  const { table_id } = req.params;
  const { reservation_id } = req.body.data || {};
  if (!reservation_id) {
    return next({ status: 400, message: "Missing reservation_id in request body." });
  }

  const table = await service.read(table_id);
  const reservation = await reservationService.read(reservation_id);

  if (!table) {
    return next({ status: 404, message: `Table ID ${table_id} not found.` });
  }
  if (!reservation) {
    return next({ status: 404, message: `Reservation ID ${reservation_id} not found.` });
  }
  if (reservation.status === "seated") {
    return next({ status: 400, message: "Reservation is already seated." });
  }
  if (table.capacity < reservation.people) {
    return next({
      status: 400,
      message: `Table does not have enough capacity. Minimum required: ${reservation.people}`,
    });
  }
  if (table.reservation_id) {
    return next({ status: 400, message: "Table is currently occupied." });
  }

  res.locals.table = table;
  res.locals.reservation = reservation;
  next();
}

// CRUD Handlers
async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(res.locals.table);
  res.status(201).json({ data });
}

async function seat(req, res) {
  const { table, reservation } = res.locals;
  const data = await service.seat(table.table_id, reservation.reservation_id);
  await reservationService.updateStatus(reservation.reservation_id, "seated");
  res.json({ data });
}

async function finish(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);

  if (!table) {
    return next({ status: 404, message: `Table ID ${table_id} not found.` });
  }
  if (!table.reservation_id) {
    return next({ status: 400, message: "Table is not occupied." });
  }

  await service.finish(table_id);
  await reservationService.updateStatus(table.reservation_id, "finished");
  res.status(200).json({ data: {} });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateTable, asyncErrorBoundary(create)],
  seat: [asyncErrorBoundary(validateSeat), asyncErrorBoundary(seat)],
  finish: asyncErrorBoundary(finish),
};