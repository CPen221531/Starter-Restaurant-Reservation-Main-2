import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listReservations, listTables, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  const handleChange = (event) => {
    setTableId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await seatReservation(tableId, reservation_id, abortController.signal);
      history.push("/dashboard");
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Seat Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_id">Table Number</label>
          <select
            className="form-control"
            id="table_id"
            name="table_id"
            value={tableId}
            onChange={handleChange}
          >
            <option value={0}>Select a table</option>
            {tables.map((table) => (
              <option key={table.table_id} value={table.table_id}>
                {table.table_name} - {table.capacity}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </form>
    </main>
  );
}

export default SeatReservation;