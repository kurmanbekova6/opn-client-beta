import React from "react";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

const DateDisplay = ({ style }) => {
  const classes = useStyles();
  return (
    <div className={classes.dateDisplay} style={style}>
      {moment().format("D MMMM")}
    </div>
  );
};

export default DateDisplay;

const useStyles = makeStyles({
  dateDisplay: {
    height: 20,
    width: 117,
    color: "#8D8D8D",
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: " 0.2px",
    lineHeight: "20px",
    textTransform: "uppercase",
  },
});
