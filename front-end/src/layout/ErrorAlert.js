import React from "react";

/**
 * Defines the ErrorAlert component to display error messages.
 * @param error
 *  an error instance used to render the error message
 * @returns {JSX.Element}
 */
function ErrorAlert({ error }) {
  if (!error) return null; // No error, render nothing

  const errorMessage =
    typeof error === "string"
      ? error // If it's a string, display it directly
      : error.message || "An unknown error occurred"; // Default fallback for objects

  return (
    <div className="alert alert-danger m-2" role="alert">
      Error: {errorMessage}
    </div>
  );
}


export default ErrorAlert;