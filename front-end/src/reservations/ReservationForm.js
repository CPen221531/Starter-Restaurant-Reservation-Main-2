import React from "react";

function ReservationForm({ formData, handleChange, handleSubmit, cancelHandler }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          className="form-control"
          id="first_name"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          className="form-control"
          id="last_name"
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          className="form-control"
          id="mobile_number"
          name="mobile_number"
          type="tel"
          value={formData.mobile_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_date">Date</label>
        <input
          className="form-control"
          id="reservation_date"
          name="reservation_date"
          type="date"
          value={formData.reservation_date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_time">Time</label>
        <input
          className="form-control"
          id="reservation_time"
          name="reservation_time"
          type="time"
          value={formData.reservation_time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="people">People</label>
        <input
          className="form-control"
          id="people"
          name="people"
          type="number"
          min="1"
          value={formData.people}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mr-2">
        Submit
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={cancelHandler}
      >
        Cancel
      </button>
    </form>
  );
}

export default ReservationForm;
