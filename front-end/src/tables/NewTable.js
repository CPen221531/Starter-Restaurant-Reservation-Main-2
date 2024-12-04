
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const history = useHistory();
  const [table_name, setTableName] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [errors, setErrors] = useState(null);

  const handleChange = ({ target }) => {
    if (target.name === "table_name") {
      setTableName(target.value);
    } else if (target.name === "capacity") {
      setCapacity(Number(target.value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setErrors(null);
    try {
      await createTable(
        { table_name, capacity },
        abortController.signal
      );
      history.push("/dashboard");
    } catch (error) {
      setErrors(error);
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>New Table</h1>
      <ErrorAlert error={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_name">Table Name:</label>
        <input
          id="table_name"
          name="table_name"
          type="text"
          minLength="2"
          onChange={handleChange}
          value={table_name}
          required
        />

        <label htmlFor="capacity">Capacity:</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          min="1"
          onChange={handleChange}
          value={capacity}
          required
        />

        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </main>
  );
}

export default NewTable;