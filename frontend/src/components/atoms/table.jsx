import PropTypes from 'prop-types';
import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          {columns.length > 0 ? (
            columns.map((col) => <th key={col}>{col}</th>)
          ) : (
            <th>No columns</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col}>{row[col] ?? '-'}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length || 1}>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
