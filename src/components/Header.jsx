import PropTypes from 'prop-types';
export const Header = ({ entriesLength, columns }) => {
  return (
    <thead>
      <tr>
        {entriesLength === 0 ? (
            <td>No results found</td>
        ) : (
          columns.map((col) => (
            <th key={col.name} className="products-table-head">
              {col.value}
            </th>
          ))
        )}
      </tr>
    </thead>
  );
};

Header.propTypes = {
  entriesLength: PropTypes.number,
  columns: PropTypes.array,
}
