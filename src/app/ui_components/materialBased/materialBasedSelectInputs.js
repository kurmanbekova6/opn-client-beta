import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import ErrorOutline from "@material-ui/icons/ErrorOutline";

export const MaterialOutlinedSelect = ({
  name,
  input,
  label,
  type,
  placeholder,
  menuItems,
  meta: { touched, error },
  ...custom
}) => {
  return (
    
      <CssTextField
        select
        {...input}
        {...custom}
        id="outlined-helperText"
        label={label}
        error={touched && !!error}
        helperText={touched && !!error ? error : " "}
        InputProps={
          touched && !!error
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <ErrorOutline
                      style={{ zIndex: 20, margin: "14px 11px" }}
                      color="error"
                    />
                  </InputAdornment>
                ),
              }
            : null
        }
        margin="none"
        variant="outlined"
        fullWidth
        autoComplete="off"
      >
        {menuItems.map((item, index) => {
          return (
            <MenuItem key={index} value={item.code}>
              {item.name}
            </MenuItem>
          );
        })}
      </CssTextField>
    
  );
};

const CssTextField = withStyles({
  root: props => {
    return {
      height: 63,
      margin: "9px 0",
      "& label.Mui-focused": {},
      "& .MuiInput-underline:after": {
        borderBottomColor: "blue",
      },
      ".fieldset": {
        backgroundColor: "#f0eff1",
        overflow: "hidden",
        borderRadius: "12px",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          backgroundColor: "#f0eff1",
          overflow: "hidden",
          borderRadius: "12px",
        },
        "&.Mui-focused fieldset": {
          borderRadius: "12px",
          backgroundColor: "#f0eff1",
        },
      },
      "& .MuiOutlinedInput-input": {
        zIndex: 10,
        borderRadius: props.multiline ? 0 : "12px",
        color: "#333333",
        margin: "2px",
        padding: "14px 16px 14px 16px ",
        height: "20px",
      },
      "& .MuiInputLabel-outlined": {
        zIndex: 20,
        marginTop: -2,
      },
      "& .MuiInputLabel-shrink":{
        backgroundColor:"#fff",
        // marginTop:-3,
        padding: "2px 4px",

      },

      "& .MuiInputAdornment-positionEnd": {
        margin: -8,
      },
    };
  },
  
 
})(TextField);
