import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export const MaterialOutlinedInput = ({
  name,
  input,
  label,
  type,
  maxSymbols = 0,
  meta: { touched, error },
  ...custom
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const classes = useStyles();
  if (!!maxSymbols) {
    input.value = input.value.substr(0, maxSymbols);
  }
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {custom.multiline && !!maxSymbols ? (
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "12px",
            zIndex: 50,
            color: "#8d8d8d",
            fontSize: "10px",
          }}
        >
          {input.value.length}/{maxSymbols}
        </div>
      ) : null}
      <CssTextField
        {...input}
        {...custom}
        type={type === "password" && !showPassword ? "password" : "text"}
        id="outlined-helperText"
        label={label}
        error={touched && !!error}
        helperText={touched && !!error ? error : " "}
        className={classes.root}
        InputProps={
          type === "password" && (!touched || !error)
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : touched && !!error
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
            : {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{
                      zIndex: 100,
                      marginLeft: "12px",
                      color: "#80868b",
                    }}
                  >
                    {custom.adornment}
                  </InputAdornment>
                ),
              }
        }
        margin="none"
        variant="outlined"
        fullWidth
        autoComplete="new-password"
      />
    </div>
  );
};

const CssTextField = withStyles({
  root: {
    // width: 320,

    margin: "9px 0",
    "& label.Mui-focused": {},
    "& .MuiInput-underline:after": {
      borderBottomColor: "blue",
    },
    "& .MuiOutlinedInput-root": {
      // height: 48,
      "& fieldset": {
        borderColor: "#aaaaaa",
        borderRadius: "12px",
        backgroundColor: "#f0eff1 !important",
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
      fontSize: "14px",
      lineHeight: "20px",
      // fontWeight: 600,
    },
    "& .MuiOutlinedInput-multiline": {
      height: "96px",
    },
    "& .MuiOutlinedInput-inputMultiline": {
      height: 72,
      padding: 0,
      margin: "14px 32px 14px 4px",
      borderRadius: 0,
    },

    "& .MuiInputLabel-outlined": {
      zIndex: 20,
      marginTop: -2,
      "& textarea": {
        // height: "100%",
      },
    },
    "& .MuiInputLabel-shrink": {
      backgroundColor: "#fff",
      padding: "2px 4px",
    },
    "& .MuiInputAdornment-positionEnd": {
      margin: -8,
    },
  },
})(TextField);

// import React, { Fragment } from "react";
// import TextField from "@material-ui/core/TextField";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import IconButton from "@material-ui/core/IconButton";
// import ErrorOutline from "@material-ui/icons/ErrorOutline";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import { withStyles, makeStyles } from "@material-ui/styles";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   input: {
//     '& .MuiOutlinedInput-root': {
//       borderRadius: "12px",
//       background: "#f0eff1 !important",
//       "&:focus": {
//         background: "#f0eff1"
//       },
//       '& fieldset': {
//         background: "#f0eff1"
//       },
//     },
//   },
// }));

// export const MaterialOutlinedInput = ({
//   name,
//   input,
//   label,
//   type,
//   maxSymbols = 0,
//   meta: { touched, error },
//   ...custom
// }) => {
//   const [showPassword, setShowPassword] = React.useState(false);
//   const classes = useStyles();
//   if (!!maxSymbols) {
//     input.value = input.value.substr(0, maxSymbols);
//   }
//   return (
//     <div
//       style={{ position: "relative", width: "100%", }}
//       className={classes.root}
//     >
//       {custom.multiline && !!maxSymbols ? (
//         <div
//           style={{
//             position: "absolute",
//             top: "14px",
//             right: "12px",
//             zIndex: 50,
//             color: "#8d8d8d",
//             fontSize: "10px",
//           }}
//         >
//           {input.value.length}/{maxSymbols}
//         </div>
//       ) : null}

//       <TextField
//         className={classes.input}
//         {...input}
//         {...custom}
//         type={type === "password" && !showPassword ? "password" : "text"}
//         id="outlined-helperText"
//         label={label}
//         error={touched && !!error}
//         helperText={touched && !!error ? error : " "}
//         InputProps={
//           type === "password" && (!touched || !error)
//             ? {
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="Toggle password visibility"
//                       onClick={() => {
//                         setShowPassword(!showPassword);
//                       }}
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }
//             : touched && !!error
//             ? {
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <ErrorOutline
//                       style={{ zIndex: 20, margin: "14px 11px" }}
//                       color="error"
//                     />
//                   </InputAdornment>
//                 ),
//               }
//             : {
//                 endAdornment: (
//                   <InputAdornment
//                     position="end"
//                     style={{
//                       zIndex: 100,
//                       marginLeft: "12px",
//                       color: "#80868b",
//                     }}
//                   >
//                     {custom.adornment}
//                   </InputAdornment>
//                 ),
//               }
//         }
//         margin="none"
//         variant="outlined"
//         fullWidth
//         autoComplete="new-password"
//       />
//     </div>
//   );
// };
