import React, { useState, Children } from "react";
import axios from "axios";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// Components
import FilterItemCountry from "./FilterItemCountry";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: "33px",
  },
  chipsContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  filterName: {
    marginRight: "24px",
    color: "#333333",
    fontSize: "16px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
    fontWeight: 600,
  },
}));

const FilterCountry = props => {
  const classes = useStyles();

  const handleCountryClick = children => {
    props.getCountry(children);
  };

  return (
    <div className={classes.root}>
      <div className={classes.filterName}>{props.name}</div>
      <div className={classes.chipsContainer}>
        {props.countries.map((country, i) => (
          <FilterItemCountry
            key={i}
            name={country.name}
            handleCountryClick={handleCountryClick}
            country={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterCountry;
