import React from "react";
import { withStyles } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import "../css/catSelect.scss";

export const MaterialOutlinedSelectCategory = ({
  name,
  input,
  label,
  type,
  placeholder,
  menuItems,
  meta: { touched, error },
  ...custom
}) => {
  console.log(`%c menu items: `, "color: magenta;", menuItems);
  return (
    <FormControl className="select-category">
      <InputLabel htmlFor="name-native-error" className="label">
        {label}
      </InputLabel>
      <CssTextField
        input={
          <OutlinedInput
            {...input}
            {...custom}
            id="outlined-helperText"
            label={label}
            error={touched && !!error}
            helperText={touched && !!error ? error : " "}
            placeholder={placeholder}
          />
        }
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
      >
        <option value="" disabled style={{ display: "none" }} />
        {menuItems.map((tree, i) => {
          return (
            <React.Fragment key={i}>
              {tree.children.length > 0 ? (
                <optgroup label={tree.name}>
                  {tree.children.map((cat, j) => (
                    <option value={cat._id} key={j}>
                      {cat.name}
                    </option>
                  ))}
                </optgroup>
              ) : null}
            </React.Fragment>
          );
        })}
      </CssTextField>
    </FormControl>
  );
};

const CssTextField = withStyles({
  root: props => {
    return {
      width: "320px",
      borderRadius: "12px !important",
      backgroundColor: "#f0eff1",

      "& label.Mui-focused": {
        top: "-6px !important",
        left: "14px !important",
        position: "absolute",
        transform: "translate(0, 24px) scale(1)",
        zIndex: "100 !important",
        background: "#fff !important",
        padding: "0 4px !important",
      },
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
      "& .MuiInputLabel-shrink": {
        backgroundColor: "#fff",
        // marginTop:-3,
        padding: "2px 4px",
      },

      "& .MuiInputAdornment-positionEnd": {
        margin: -8,
      },
    };
  },
})(NativeSelect);
