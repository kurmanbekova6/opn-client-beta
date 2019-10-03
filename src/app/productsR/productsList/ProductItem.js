import React from "react";
// Material ui
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
// Styles constant
const useStyles = makeStyles({
  prodItemContainer: {
    maxWidth: 272,
    margin: "0 auto 56px auto",
  },
  card: {
    width: "100%",
    minHeight: 272,
    margin: "auto",
    boxShadow: "none",
    border: "1px solid #dddddd",
    borderRadius: "12px",
    boxShadow: "none",
  },
  card_name: {
    textAlign: "center",
    color: "#212121",
    fontSize: "20px",
    marginTop: "13px",
    wordSpacing: "0.3px",
    fontWeight: 500,
  },
});

const ProductItem = props => {
  const classes = useStyles();
  return (
    <div className={classes.prodItemContainer}>
      <Card className={classes.card} />
      <div className={classes.card_name}>{props.product.name}</div>
    </div>
  );
};

export default ProductItem;
