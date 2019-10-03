import React from "react";
// Components
import PaymentsItem from "./PaymentsItem";

const PaymentsList = props => {
  const sortedList = [];

  switch (props.activeTab) {
    case 3:
      props.payments.map(item => {
        if (item.status === "REJECTED") {
          console.log(item);
          sortedList.push(item);
        }
      });
      break;
    case 2:
      props.payments.map(item => {
        if (item.status === "CLOSED") {
          sortedList.push(item);
        }
      });
      break;
    case 1:
      props.payments.map(item => {
        if (item.status === "PLACED") {
          sortedList.push(item);
        }
      });
      break;
    default:
      sortedList.push(...props.payments);
  }

  return (
    <React.Fragment>
      {sortedList.map((payment, i) => (
        <PaymentsItem key={i} payment={payment} />
      ))}
    </React.Fragment>
  );
};

export default PaymentsList;
