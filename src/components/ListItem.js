import React from "react";

const ListItem = ({ list, index }) => {
  return (
    <>
      {console.log(list)}
      <div>
        {list.length === 0 ? null : (
          <table>
            <tr>
              <th>Search Term</th>
              <th>Meaning</th>
            </tr>
            {list.map((item) => {
              return (
                <tr data-index={index}>
                  <td>{item.searchTerm}</td>
                  <td>{item.meaningOfSearchTerm}</td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default ListItem;
