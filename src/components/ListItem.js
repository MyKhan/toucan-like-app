import React from "react";

const ListItem = ({ list }) => {
  return (
    <>
      <div>
        {list.length === 0 ? null : (
          <table>
            <thead>
              <tr>
                <th>Search Term</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, id) => {
                return (
                  <tr key={id}>
                    <td>{item.searchTerm}</td>
                    <td>{item.meaningOfSearchTerm}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ListItem;
