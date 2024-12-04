import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  });

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const formattedData = {
        ...formData,
        people: Number(formData.people),
      };
      await createReservation(formattedData, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Create Reservation</h1>
      <ErrorAlert error={error} />
      <ReservationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelHandler={() => history.goBack()}
      />
    </main>
  );
}

export default NewReservation;
