import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines the Seat component.
 * @returns {JSX.Element}
 */
function Seat() {
  return (
    <main>
      <h1>Seat</h1>
      <Link to="/dashboard">
        <button type="button" className="btn btn-secondary">
          Cancel
        </button>
      </Link>
    </main>
  );
}

export default Seat;