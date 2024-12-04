
/**
 * Format a date string in ISO 8601 format (YYYY-MM-DD) for display.
 *
 * @param dateString The date string in ISO 8601 format.
 * @returns The formatted date string.
 */
export function formatAsDate(dateString) {
  return dateString.match(/\d{4}-\d{2}-\d{2}/)[0];
}

/**
 * Format a time string in HH:MM:SS format for display.
 *
 * @param timeString The time string in HH:MM:SS format.
 * @returns The formatted time string.
 */
export function formatAsTime(timeString) {
  return timeString.substring(0, 5);
}

/**
 * Today's date as a string in YYYY-MM-DD format.
 * @returns Today's date as a string in YYYY-MM-DD format.
 */
export function today() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Add one day to the given date.
 *
 * @param date The date to add a day to.
 * @returns A new date object with one day added.
 */
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Tomorrow's date as a string in YYYY-MM-DD format.
 * @returns Tomorrow's date as a string in YYYY-MM-DD format.
 */
export function tomorrow() {
  return addDays(new Date(), 1).toISOString().split("T")[0];
}

/**
 * Format the date and time of a reservation for display.
 *
 * @param reservation The reservation object with date and time properties.
 * @returns The formatted date and time string.
 */
export function formatDateTime(reservation) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(
    `${reservation.reservation_date}T${reservation.reservation_time}`
  );
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/**
 * Format the time of a reservation for display.
 *
 * @param reservation The reservation object with a time property.
 * @returns The formatted time string.
 */
export function formatReservationTime(reservation) {
  if (Array.isArray(reservation)) {
    return reservation.map((res) => ({
      ...res,
      reservation_time: formatAsTime(res.reservation_time),
    }));
  } else {
    return {
      ...reservation,
      reservation_time: formatAsTime(reservation.reservation_time),
    };
  }
}

/**
 * Format the date of a reservation for display.
 *
 * @param reservation The reservation object with a date property.
 * @returns The formatted date string.
 */
export function formatReservationDate(reservation) {
  if (Array.isArray(reservation)) {
    return reservation.map((res) => ({
      ...res,
      reservation_date: formatAsDate(res.reservation_date),
    }));
  } else {
    return {
      ...reservation,
      reservation_date: formatAsDate(reservation.reservation_date),
    };
  }
}

/**
 * Get the previous date to the given date.
 *
 * @param dateString The date string in YYYY-MM-DD format.
 * @returns The previous date string in YYYY-MM-DD format.
 */
export function previous(dateString) {
  return addDays(new Date(dateString), -1).toISOString().split("T")[0];
}

/**
 * Get the next date to the given date.
 *
 * @param dateString The date string in YYYY-MM-DD format.
 * @returns The next date string in YYYY-MM-DD format.
 */
export function next(dateString) {
  return addDays(new Date(dateString), 1).toISOString().split("T")[0];
}