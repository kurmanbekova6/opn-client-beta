import React from "react";
import Button from "@material-ui/core/Button";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import { makeStyles } from "@material-ui/styles";

import { withStyles } from "@material-ui/styles";

export const MaterialPrimaryButton = ({ label, ...rest }) => {
  return (
    <CssButton
      {...rest}
      variant="contained"
      color="primary"
      className={rest.className ? `${rest.className} Button` : "Button"}
      fullWidth
      onClick={rest.onClick ? rest.onClick : null}
    >
      {label}
    </CssButton>
  );
};
export const MaterialTextButton = ({ label, ...rest }) => {
  const classes = useStylesText();

  return (
    <TextButton
      {...rest}
      variant="contained"
      // color="primary"
      className={rest.className ? `${rest.className} Button` : "Button"}
      fullWidth
      onClick={rest.onClick ? rest.onClick : null}
    >
      {label}
    </TextButton>
  );
};
export const MaterialFixedTextButton = ({ label, ...rest }) => {
  return (
    <FixedTextButton
      {...rest}
      className={rest.className ? `${rest.className} Button` : "Button"}
      fullWidth
      onClick={rest.onClick ? rest.onClick : null}
    >
      {label}
    </FixedTextButton>
  );
};
export const MaterialVerifiedButton = ({ label, ...rest }) => {
  const classes = useStylesVerified();

  return (
    <CssButton
      {...rest}
      variant="contained"
      color="primary"
      className={classes.button}
      fullWidth
    >
      <VerifiedUser className={classes.leftIcon} />
      {label}
    </CssButton>
  );
};
export const MaterialNotContainedButton = ({ label, ...rest }) => {
  return (
    <CssButtonNot
      {...rest}
      className={rest.className ? `${rest.className} Button` : "Button"}
      fullWidth
      onClick={rest.onClick ? rest.onClick : null}
    >
      {label}
    </CssButtonNot>
  );
};
export const MaterialNotErrorContainedButton = ({ label, ...rest }) => {
  return (
    <CssButtonNotError
      {...rest}
      className={rest.className ? `${rest.className} Button` : "Button"}
      fullWidth
      onClick={rest.onClick ? rest.onClick : null}
    >
      {label}
    </CssButtonNotError>
  );
};

const CssButton = withStyles(theme => ({
  root: {
    width: "100%",
    height: 48,
    borderRadius: "12px",
    marginTop: 9,
    color: "#fff",
    // backgroundColor: theme.palette.primary.main,
    "&:hover": {
      color: "#fff",
      backgroundColor: "#578fff",
      textDecoration: "none",
    },
    "&:focus": {
      outline: "none",
      color: "#fff",
      backgroundColor: "#578fff",
      textDecoration: "none",
    },
    "&:active": {
      outline: "none",
      color: "#fff",
      backgroundColor: "#194bb0",
      textDecoration: "none",
    },
  },
  label: {
    color: "#fff",
    width: "100% !important",
  },
}))(Button);

const FixedTextButton = withStyles(theme => ({
  root: {
    height: 48,
    borderRadius: "12px",
    padding: "14px 20px",
    "&:hover": {
      backgroundColor: "rgba(186, 206, 246, 0.3)",
      textDecoration: "none",
    },
    "&:focus": {
      outline: "none",
      backgroundColor: "rgba(186, 206, 246, 0.3)",
      textDecoration: "none",
    },
    "&:active": {
      outline: "none",
      backgroundColor: "rgba(186, 206, 246, 0.5)",
      textDecoration: "none",
    },
    "&:disabled span": {
      color: "#aaaaaa",
    },
  },
  label: {
    color: theme.palette.primary.main,
    width: "100% !important",
  },
}))(Button);

const CssButtonNot = withStyles(theme => ({
  root: {
    width: "100%",
    height: 48,
    borderRadius: "12px",
    marginTop: 9,
    color: "#3d7efd",
    "& .MuiButton-label": {
      color: "#3d7efd",
    },
    "&:hover": {
      "& .MuiButton-label": {
        color: "#fff",
      },
      color: "#ffffff !important",
      backgroundColor: "#3d7efd",
      textDecoration: "none",
    },
    "&:focus": {
      "& .MuiButton-label": {
        color: "#fff",
      },
      outline: "none",
      color: "#ffffff !important",
      backgroundColor: "#3d7efd",
      textDecoration: "none",
    },
    "&:active": {
      "& .MuiButton-label": {
        color: "#ffffff !important",
      },
      outline: "none",
      color: "#ffffff !important",
      backgroundColor: "#3d7efd",
      textDecoration: "none",
    },
    label: {
      color: "#3d7efd !important",
    },
  },
}))(Button);
const CssButtonNotError = withStyles(theme => ({
  root: {
    width: "100%",
    height: 48,
    borderRadius: "12px",
    marginTop: 9,
    color: "#da2f40",
    "& .MuiButton-label": {
      color: "#da2f40",
    },
    "&:hover": {
      "& .MuiButton-label": {
        color: "#fff",
      },
      color: "#ffffff !important",
      backgroundColor: "#da2f40",
      textDecoration: "none",
    },
    "&:focus": {
      "& .MuiButton-label": {
        color: "#fff",
      },
      outline: "none",
      color: "#ffffff !important",
      backgroundColor: "#da2f40",
      textDecoration: "none",
    },
    "&:active": {
      "& .MuiButton-label": {
        color: "#ffffff !important",
      },
      outline: "none",
      color: "#ffffff !important",
      backgroundColor: "#da2f40",
      textDecoration: "none",
    },
    label: {
      color: "#da2f40 !important",
    },
  },
}))(Button);

const TextButton = withStyles(theme => ({
  root: {
    width: "100%",
    height: 48,
    borderRadius: "12px",
    // backgroundColor: theme.palette.primary.main,
  },
  input: {
    display: "none",
  },
  label: {
    // color: "#aaaaaa",
  },
}))(Button);

const useStylesVerified = makeStyles(theme => {
  return {
    leftIcon: {
      marginRight: theme.spacing(1),
    },
  };
});

const useStylesText = makeStyles(theme => ({
  button: {
    display: "none",
  },
  label: {
    color: "#aaa",
  },
}));
