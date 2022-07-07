import React from "react";
import { useSelector } from "react-redux";
import classes from "./filterTitle.module.css";
const FilterTitle = props => {
  const { darkTheme } = useSelector(state => state.theme);
  return (
    <h6
      className={`${classes["filter__title"]} ${
        darkTheme ? classes["dark"] : ""
      }`}
    >
      {props.children}
    </h6>
  );
};

export default FilterTitle;
