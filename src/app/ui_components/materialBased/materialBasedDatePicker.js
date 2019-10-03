import React, { Fragment, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid #aaaaaa",
    borderRadius: "12px",
    background: "#f0eff1",
    padding: "0 10px",
    marginBottom: "10px",
    "& .MuiIconButton-root": {
      padding: "5px",
    },
    "& .MuiInputBase-root": {
      marginBottom: "10px",
    },
    "& .MuiInput-underline": {
      "&:after": {
        display: "none !important",
      },
      "&:before": {
        display: "none !important",
      },
    },
    "& .MuiInputLabel-animated": {
      position: "absolute",
      top: "-7px",
      left: "13px",
      background: "#fff",
      padding: "2px 4px",
    },
  },
}));

export const MaterialDatePicker = ({
  name,
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ position: "relative", width: "100%" }}>
        <KeyboardDatePicker
          {...input}
          autoFocus="true"
          clearable
          value={selectedDate}
          label={label}
          onChange={date => handleDateChange(date)}
          minDate={new Date()}
          format="MM/dd/yyyy"
          fullWidth
          className={classes.root}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};
