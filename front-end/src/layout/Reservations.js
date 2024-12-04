import React from "react";
import { updateReservationStatus } from "../utils/api";

function Reservation({ reservation }) {
  const cancelHandler = async () => {
    const confirm = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirm) {
      const abortController = new AbortController();
      try {
        await updateReservationStatus(
          reservation.reservation_id,
          "cancelled",
          abortController.signal
        );
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      return () => abortController.abort();
    }
  };

  return (
    <div className="list-group-item">
      <p>
        {reservation.first_name} {reservation.last_name} - {reservation.mobile_number}
      </p>
      <p>
        {reservation.reservation_date} at {reservation.reservation_time}, Party of {reservation.people}
      </p>
      <p>Status: {reservation.status}</p>
      {reservation.status === "booked" && (
        <div>
          <a href={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-primary">
            Seat
          </a>
          <button className="btn btn-danger" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Reservation;