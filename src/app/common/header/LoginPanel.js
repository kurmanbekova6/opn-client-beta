import React from "react";

import { pathsConst } from "../../../consts";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function LoginPanel(props) {
  const classes = useStyles();

  return (
    <div className="login-wrapper">
      <Link
        {...props}
        className={classes.loginSignUpLink}
        replace
        to={{
          pathname: pathsConst.LOGIN,
          state: { viewState: pathsConst.LOGIN },
        }}
      >
        <Typography variant="button" component="h2">
          login
        </Typography>
      </Link>
      <Link
        {...props}
        className={classes.loginSignUpLinkInverted}
        replace
        to={{
          pathname: pathsConst.REGISTER,
          state: { viewState: pathsConst.REGISTER },
        }}
      >
        <Typography variant="button" component="h2">
          sign up
        </Typography>
      </Link>

      {/*<LoginControl label="login" page={pathsConst.LOGIN} {...props} />*/}
      {/*<LoginControl label="sign up" page={pathsConst.REGISTER} {...props} />*/}
    </div>
  );
}

function LoginControl(props) {
  const { /*switchPage, pushRoute,*/ page, label, src } = props;
  const classes = useStyles();
  return (
    <Link
      className={classes.loginSignUpLink}
      replace
      to={{
        pathname: page,
        state: { viewState: page },
      }}
    >
      <Typography variant="button" component="h2">
        {label}
      </Typography>
    </Link>
  );
}

export default LoginPanel;

const useStyles = makeStyles(theme => ({
  loginSignUpLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 107,
    color: theme.palette.primary.main,
    borderRadius: "12px",
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
      backgroundColor: "rgba(186, 206, 246, 0.3)",
    },
    "&:active": {
      backgroundColor: "rgba(186, 206, 246, 0.5)",
    },
  },
  loginSignUpLinkInverted: {
    display: "flex",
    marginLeft: 9,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 107,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "12px",
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.contrastText,
      backgroundColor: "#578fff",
    },
    "&:active": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
