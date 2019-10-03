import React, { Fragment, useState } from "react";
// Material Ui
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  underCheckbox: {
    fontSize: 9,
    color: "#212121",
    lineHeight: "12px",
    letterSpacing: "0.9px",
    paddingLeft: "32px",
  },
  check: {
    color: "#8d8d8d",
    fontSize: "12px !important",
    letterSpacing: "0.5px !important",
    marginBottom: "0px !important",
  },
}));

export const MaterialCheckbox = ({
  name,
  color,
  label,
  bottomText,
  meta: { touched, error },
  ...custom
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checked: false,
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Checkbox
            //checked={state.checked}
            onChange={handleChange("checked")}
            color={color}
            name={name}
            //value="checked"
            inputProps={{ "aria-label": "checked" }}
          />
        }
        label={label}
      />
      {bottomText ? (
        <div className={classes.underCheckbox}>{bottomText}</div>
      ) : null}
    </React.Fragment>
  );
};
