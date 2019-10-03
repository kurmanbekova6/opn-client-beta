import React, { useState, Children } from "react";
import axios from "axios";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

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
  chip: {
    margin: "4px",
    fontSize: "12px",
    paddingLeft: "16px",
    border: "1px solid #dddddd",
    lineHeight: "16px",
    letterSpacing: "0.5px",
    background: "transparent",
    textTransform: "capitalize",
    borderRadius: "12px",
    fontFamily: "Montserrat",
    "&:hover": {
      background: "#3d7efd",
      color: "#ffffff",
    },
    "&:focus": {
      background: "#3d7efd",
      color: "#ffffff",
    },
  },
  filterName: {
    marginRight: "24px",
    color: "#333333",
    fontSize: "16px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
  },
  deleteIcon: {
    color: "#ffffff",
  },
}));

const Filter = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.filterName}>{props.name}</div>
      <div className={classes.chipsContainer}>
        {props.categorys.map((cat, i) => (
          <Chip
            key={i}
            size="medium"
            deleteIcon={
              <DoneIcon fontSize="small" className={classes.deleteIcon} />
            }
            onClick={() => props.getFilteredProducts(cat.children)}
            deletable
            onDelete={() => props.getFilteredProducts(cat.children)}
            className={classes.chip}
            label={cat.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Filter;
