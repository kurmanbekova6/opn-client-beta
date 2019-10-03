import React from "react";
import { makeStyles, withTheme } from "@material-ui/styles";

import "./ResponseMessage.scss";

const ResponseMessage = ({ message, type = "error", textAlign = "center" }) => {
  const classes = useStyles();
  return (
    <div
      className={type === "error" ? classes.error : classes.message}
      style={{ textAlign: textAlign, width: "100%", margin: "10px, auto" }}
    >
      {message}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  message: {
    color: "#3d7efd",
  },
  error: {
    color: "#f44336",
  },
}));
export default ResponseMessage;
