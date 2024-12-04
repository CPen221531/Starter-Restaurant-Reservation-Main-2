
import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [errors, setErrors] = useState(null);

  const handleChange = ({ target }) => {
    setMobileNumber(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setErrors(null);
    try {
      const foundReservations = await listReservations(
        { mobile_number: mobileNumber },
        abortController.signal
      );
      setReservations(foundReservations);
    } catch (error) {
      setErrors(error);
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Search Reservations</h1>
      <ErrorAlert error={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile_number">Mobile Number:</label>
        <input
          id="mobile_number"
          name="mobile_number"
          type="text"
          placeholder="Enter a customer's phone number"
          onChange={handleChange}
          value={mobileNumber}
        />
        <button type="submit">Find</button>
      </form>

      {/* Display search results similar to Dashboard.js */}
      <h2>Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found</p>
      ) : (
        <div>
          {/* Render reservations */}
          {reservations.map((reservation) => (
            <div key={reservation.reservation_id}>
              <p>
                {reservation.first_name} {reservation.last_name} (
                {reservation.mobile_number}), Party of {reservation.people}.{" "}
                Status: {reservation.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Search;