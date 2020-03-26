import React from "react";

const Select = ({
  name,
  label,
  error,
  options,
  textProperty,
  valueProperty,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...rest} className="form-control">
        <option value="" />
        {options.map(option => (
          <option key={option[valueProperty]} value={option[valueProperty]}>
            {option[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Select;
