import React from "react";

const TransactionItem = props => {
  return (
    <div className="transaction-item">
      <div className="transaction-item__info">
        <div className="transaction-item__info_date">{props.date}</div>
        <div
          className={`transaction-item__info_status ${
            props.status === "Sent" ? "violet-txt" : "blue-txt"
          }`}
        >
          {props.status}
        </div>
      </div>
      <div className="transaction-item__cost">
        <div
          className={`transaction-item__cost_item ${
            props.status === "Sent" ? "violet-btn" : "blue-btn"
          }`}
        >
          {props.curr} {props.num}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
