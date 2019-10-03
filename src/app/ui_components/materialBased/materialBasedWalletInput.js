import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/styles";

export const MaterialWalletInput = ({
  name,
  input,
  label,
  type,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <CssTextField
      {...input}
      {...custom}
      type={type === "password" && !showPassword ? "password" : "text"}
      id="outlined-helperText"
      label={label}
      error={touched && !!error}
      helperText={touched && !!error ? error : " "}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" style={{ zIndex: "250" }}>
            <IconButton
              onClick={() => {
                window.open("https://metamask.io/");
              }}
            >
              CREATE WALLET
            </IconButton>
          </InputAdornment>
        ),
      }}
      margin="none"
      variant="outlined"
      fullWidth
      autoComplete="new-password"
      rows="2"
    />
  );
};

const CssTextField = withStyles({
  root: {
    // width: 320,
    height: 63,
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
      borderRadius: "12px",
      color: "#333333",
      margin: "2px",
      padding: "14px 16px 14px 16px ",
      height: "20px",
    },
    // "& .MuiFormHelperText-root": {
    // },
    "& .MuiInputLabel-outlined": {
      zIndex: 20,
      marginTop: -2,
    },
    // "& .MuiInputAdornment-positionEnd": {
    //   margin: -8,
    // },
    "& .MuiIconButton-label ": {
      fontSize: "10px",
      fontWeight: 600,
      color: "#8d8d8d",
    },
    "& .MuiIconButton-root": {
      right: 22,
      borderRadius: 8,
      padding: 6,
    },
  },
})(TextField);
