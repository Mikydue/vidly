import React from "react";

const listGroup = ({
  items,
  valueProperty,
  textProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

listGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default listGroup;
