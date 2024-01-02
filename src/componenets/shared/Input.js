import React from "react";
import { classForInput } from "../page/css_classes";

const Input = ({ type, name, id, value, onChange }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        className={classForInput}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
