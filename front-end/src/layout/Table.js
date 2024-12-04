import React from "react";

function Table({ table, finishHandler }) {
  return (
    <div className="list-group-item">
      <p>Table Name: {table.table_name}</p>
      <p>Capacity: {table.capacity}</p>
      <p>
        Status: {table.reservation_id ? "Occupied" : "Free"}
      </p>
      {table.reservation_id && (
        <button
          className="btn btn-danger"
          onClick={() => finishHandler(table.table_id)}
          data-table-id-finish={table.table_id}
        >
          Finish
        </button>
      )}
    </div>
  );
}

export default Table;