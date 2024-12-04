const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

async function list(req, res) {
  const { date } = req.query;
  const reservations = await service.list(date);
  res.json({ data: reservations });
}

async function create(req, res, next) {
  const newReservation = req.body.data;
  const createdReservation = await service.create(newReservation);
  res.status(201).json({ data: createdReservation });
}

async function read(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);

  if (!reservation) {
    return next({ status: 404, message: `Reservation ID ${reservationId} not found.` });
  }

  res.json({ data: reservation });
}

async function updateStatus(req, res, next) {
  const { reservationId } = req.params;
  const { status } = req.body.data;

  const updatedReservation = await service.updateStatus(reservationId, status);
  res.json({ data: updatedReservation });
}

async function update(req, res, next) {
  const { reservationId } = req.params;
  const updatedReservation = req.body.data;

  const updated = await service.update(reservationId, updatedReservation);
  res.json({ data: updated });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
  read: asyncErrorBoundary(read),
  updateStatus: asyncErrorBoundary(updateStatus),
  update: asyncErrorBoundary(update),
};