import PropTypes from 'prop-types';
export const Content = ({ entries, columns}) => {

  return (
    <tbody>
      {entries.length === 0
        ? <tr> 
            <td> - </td>
          </tr>
        : entries.map((entry) => (
            <tr key={entry.isin}>
              {columns.map((col) => (
                <td key={col.name} className="products-table-cell">
                  {entry[col.name]}
                </td>
              ))}
            </tr>
          ))}
    </tbody>
  );
};

Content.propTypes = {
  entries: PropTypes.array,
  columns: PropTypes.array,
}