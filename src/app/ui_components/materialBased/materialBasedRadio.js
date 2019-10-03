import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export const MaterialRadio = ({
  value,
  menuItems,
  name,
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <div style={{ position: "relative", width: "100%", marginBottom: "16px" }}>
      <RadioGroup aria-label={name} name={name} {...input} {...custom}>
        {menuItems.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            control={<Radio color="primary" />}
            label={item.label}
            disabled={item.disabled}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

const CssTextField = withStyles({
  root: props => {
    return {
      // width: 320,
      height: props.multiline ? 105 : 63,
      margin: "9px 0",
      "& label.Mui-focused": {},
      "& .MuiInput-underline:after": {
        borderBottomColor: "blue",
      },
      "& .MuiOutlinedInput-root": {
        // height: 48,
        "& fieldset": {
          borderColor: "#aaaaaa",
          // borderRadius: "12px",
          backgroundColor: "#f0eff1",
          // zIndex: -1,
          overflow: "hidden",
        },
        // "&:hover fieldset": {
        // },
        "&.Mui-focused fieldset": {},
      },
      "& .MuiOutlinedInput-input": {
        zIndex: 10,
        borderRadius: props.multiline ? 0 : "12px",
        color: "#333333",
        margin: "2px",
        padding: "14px 16px 14px 16px ",
        height: "20px",
        fontSize: "14px",
        lineHeight: "20px",
        // fontWeight: 600,
      },
      // "& .MuiFormHelperText-root": {
      // },
      "& .MuiOutlinedInput-multiline": {
        height: "96px",
      },
      "& .MuiOutlinedInput-inputMultiline": {
        height: 72,
        padding: 0,
        margin: "14px 32px 14px 4px",
      },

      "& .MuiInputLabel-outlined": {
        zIndex: 20,
        marginTop: -2,
      },
      "& .MuiInputAdornment-positionEnd": {
        margin: -8,
      },
    };
  },
})(TextField);
