import React, { useState } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// Components
import FilterCategoryItem from "./FilterItemCategory";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: "13px",
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

const FilterCategory = props => {
  const classes = useStyles();

  const handleCategoryClick = id => {
    props.getFilteredProducts(id);
  };

  return (
    <div className={classes.root}>
      <div className={classes.filterName}>{props.name}</div>
      <div className={classes.chipsContainer}>
        {props.categorys.map((cat, i) => (
          <FilterCategoryItem
            key={i}
            name={cat.name}
            handleCategoryClick={handleCategoryClick}
            id={cat._id}
            catgory={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterCategory;
