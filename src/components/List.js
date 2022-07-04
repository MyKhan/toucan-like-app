import React from "react";
import ListItem from "./ListItem";

const List = ({ list }) => {
  return (
    <>
      <h1>Terms List</h1>
      {list && list.length === 0 ? (
        <h3>Nothing to see here</h3>
      ) : (
        <ListItem list={list}></ListItem>
      )}
    </>
  );
};

export default List;
