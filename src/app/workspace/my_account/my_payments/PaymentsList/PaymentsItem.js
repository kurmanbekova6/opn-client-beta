import React from "react";
import moment from "moment";
// Material UI
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

import { priceFormat } from "../../../../utils/priceFormat";
import "../css/myPayments.scss";

const useStyles = makeStyles(theme => ({
  itemChip: {
    padding: "3px 10px",
    color: "#ffffff",
    fontSize: "10px",
    letterSpacing: "1px",
    textTransform: "lowercase",
    maxHeight: "19px",
    marginBottom: "13px",
  },
  yellow: {
    background: "#f29c36",
  },
  green: {
    background: "#12be89",
  },
  red: {
    background: "#da2f40",
  },
}));

const PaymentsItem = props => {
  const classes = useStyles();
  return (
    <li className="mypayments-list_item">
      <div>
        <Chip
          label={
            props.payment.status === "REJECTED"
              ? "Canceled"
              : props.payment.status === "CLOSED"
              ? "Confirmed"
              : props.payment.status === "PLACED"
              ? "Pending"
              : " - "
          }
          className={
            props.payment.status === "REJECTED"
              ? `${classes.itemChip} ${classes.red}`
              : props.payment.status === "CLOSED"
              ? `${classes.itemChip} ${classes.green}`
              : props.payment.status === "PLACED"
              ? `${classes.itemChip} ${classes.yellow}`
              : `${classes.itemChip} ${classes.yellow}`
          }
        />
        <p className="mypayments-list_item-name">
          {props.payment.offerData && props.payment.offerData.name
            ? props.payment.offerData.name
            : " - "}
        </p>
      </div>
      <div>
        <p className="mypayments-list_item-time">
          {moment(props.payment.created_at).format("DD.MM.YYYY, LT")}
        </p>
        <p className="mypayments-list_item-price">
          {props.payment.offerData && props.payment.offerData.currency === "EUR"
            ? "€"
            : "$"}
          {props.payment.offerData && props.payment.offerData.price
            ? priceFormat(props.payment.offerData.price)
            : " - "}
        </p>
      </div>
    </li>
  );
};

export default PaymentsItem;
