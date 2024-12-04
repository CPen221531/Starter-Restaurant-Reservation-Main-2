import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  listReservations,
  listTables,
  finishTable,
  cancelReservation,
} from "../utils/api";
import { next, previous, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

function Dashboard() {
  const history = useHistory();
  const { search } = useLocation();
  const queryDate = new URLSearchParams(search).get("date") || today();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setErrors(null);

    listReservations({ date: queryDate }, abortController.signal)
      .then(setReservations)
      .catch(setErrors);

    listTables(abortController.signal).then(setTables).catch(setErrors);

    return () => abortController.abort();
  }, [queryDate]);

  const handleDateChange = (newDate) => {
    history.push(`/dashboard?date=${newDate}`);
  };

  const handleSeat = (reservation_id) => {
    history.push(`/reservations/${reservation_id}/seat`);
  };

  const handleEdit = (reservation_id) => {
    history.push(`/reservations/${reservation_id}/edit`);
  };

  const handleCancel = async (reservation_id) => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      try {
        await cancelReservation(reservation_id, abortController.signal);
        // Refresh the reservations list
        listReservations({ date: queryDate }, abortController.signal).then(
          setReservations
        );
      } catch (error) {
        setErrors(error);
      }
      return () => abortController.abort();
    }
  };

  const handleFinish = async (table_id) => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      try {
        await finishTable(table_id, abortController.signal);
        // Refresh the tables list
        listTables(abortController.signal).then(setTables);
      } catch (error) {
        setErrors(error);
      }
      return () => abortController.abort();
    }
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={errors} />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {queryDate}</h4>
      </div>
      {/* Reservations List */}
      <div>
        {/* Render reservations */}
        {reservations.map((reservation) => (
          <div key={reservation.reservation_id}>
            <p>
              {reservation.first_name} {reservation.last_name} (
              {reservation.mobile_number}), Party of {reservation.people}.{" "}
              Status: {reservation.status}
            </p>
            <div>
              {reservation.status === "booked" && (
                <button
                  data-reservation-id-status={reservation.reservation_id}
                  onClick={() => handleSeat(reservation.reservation_id)}
                >
                  Seat
                </button>
              )}
              <button
                data-reservation-id-status={reservation.reservation_id}
                onClick={() => handleEdit(reservation.reservation_id)}
                hidden={reservation.status !== "booked"}
              >
                Edit
              </button>
              <button
                data-reservation-id-cancel={reservation.reservation_id}
                onClick={() => handleCancel(reservation.reservation_id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tables List */}
      <div>
        <h3>Tables</h3>
        {tables.map((table) => (
          <div key={table.table_id}>
            {table.table_name} - Capacity: {table.capacity} ({table.status})
            {table.status === "occupied" && (
              <button
                data-table-id-finish={table.table_id}
                onClick={() => handleFinish(table.table_id)}
              >
                Finish
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div>
        <button onClick={() => handleDateChange(previous(queryDate))}>
          Previous
        </button>
        <button onClick={() => handleDateChange(today())}>Today</button>
        <button onClick={() => handleDateChange(next(queryDate))}>
          Next
        </button>
      </div>
    </main>
  );
}

export default Dashboard;