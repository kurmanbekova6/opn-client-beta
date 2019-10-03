import React from "react";
import { Link } from "react-router-dom";
// Material ui
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
// Styles constant
const useStyles = makeStyles({
  card: {
    width: 272,
    minHeight: 272,
    margin: "auto",
    border: "1px solid #dddddd",
    boxShadow: "none",
    borderRadius: "12px",
  },
  card_name: {
    textAlign: "center",
    color: "#212121",
    fontSize: "20px",
    marginTop: 13,
    wordSpacing: "0.3px",
    fontWeight: 500,
  },
  listItemLink: {
    "&:hover": {
      textDecoration: "none",
    },
    "&:focus": {
      outline: "none",
      textDecoration: "none",
    },
    "&:active": {
      outline: "none",
      textDecoration: "none",
    },
  },
});

const Item = props => {
  const classes = useStyles();
  return (
    <Link
      to={{
        pathname: "/category",
        state: {
          id: props.product._id,
          categorys: props.product.children,
          name: props.product.name,
        },
      }}
      className={classes.listItemLink}
    >
      <Card className={classes.card} />
      <div className={classes.card_name}>{props.product.name}</div>
    </Link>
  );
};

export default Item;
