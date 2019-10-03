import React, { useState } from "react";
// Maretial UI
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: "4px",
    fontSize: "12px",
    padding: "8px 20px",
    border: "1px solid #dddddd",
    lineHeight: "16px",
    letterSpacing: "0.5px",
    textTransform: "capitalize",
    borderRadius: "12px",
    fontFamily: "Montserrat",
    cursor: "pointer",
    "&:hover": {
      background: "#3d7efd",
      color: "#ffffff",
    },
    "&:focus": {
      background: "#3d7efd",
      color: "#ffffff",
    },
    "&_active": {
      background: "#3d7efd",
      color: "#ffffff",
    },
  },
  deleteIcon: {
    color: "#ffffff",
    position: "relative",
    top: "-2px",
    left: "5px",
  },
}));

const FilterCategoryItem = props => {
  const classes = useStyles();
  const [activeItem, setItemActive] = useState(false);

  const handleItemCategoryClick = id => {
    setItemActive(!activeItem);
    props.handleCategoryClick(id);
  };

  return (
    <div
      className={classes.chip}
      onClick={() => handleItemCategoryClick(props.id)}
      style={
        activeItem
          ? { background: "#3d7efd", color: "#ffffff" }
          : { background: "transparent", color: "#333333" }
      }
    >
      {props.name}
      {activeItem ? (
        <DoneIcon fontSize="small" className={classes.deleteIcon} />
      ) : null}
    </div>
  );
};

export default FilterCategoryItem;
