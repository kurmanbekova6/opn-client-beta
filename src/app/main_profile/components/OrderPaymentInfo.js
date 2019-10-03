import React from "react";

const OrderPaymentInfo = props => {
  const {
    yourWallet,
    opnWallet,
    operationTime,
    verification,
    paymentSysUsed,
    currency,
    ammount,
  } = props;
  return (
    <div className="order-info__content">
      <div className="order-info">
        <span className="order-info__bb">Your wallet:</span>{" "}
        <span className="order-info__tg">{yourWallet}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">OPN wallet:</span>{" "}
        <span className="order-info__tg">{opnWallet}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">Operation time:</span>{" "}
        <span className="order-info__tg">{operationTime.split("T")[0]}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">Verification:</span>{" "}
        <span className="order-info__tg">{verification}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">Payment system used:</span>{" "}
        <span className="order-info__tg">{paymentSysUsed}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">Currency:</span>{" "}
        <span className="order-info__tg">{currency}</span>
      </div>
      <div className="order-info">
        <span className="order-info__price">Ammount:</span>{" "}
        <span className="order-info__price-num">
          {ammount} {currency}
        </span>
      </div>
    </div>
  );
};

export default OrderPaymentInfo;
