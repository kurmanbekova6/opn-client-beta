import React from "react";

const OrderInfo = props => {
  const {
    operationNum,
    title,
    client,
    topBuyed,
    dateOfOperation,
    dateClosedOperation,
    countryFrom,
    logistic,
    price,
  } = props;
  return (
    <div className="order-info__content">
      <div className="order-info">
        <span className="order-info__bb">Number of operation:</span>{" "}
        <span className="order-info__numop">#{operationNum}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">Title:</span>{" "}
        <span className="order-info__tg">{title}</span>
      </div>
      <div className="order-info">
        <span className="order-info__tg client">Client: </span>{" "}
        <span className="order-info__bb client-name">{client}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">Top buyed:</span>{" "}
        <span className="order-info__tg">{topBuyed}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">Date of operation:</span>{" "}
        <span className="order-info__tg">{dateOfOperation.split("T")[0]}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">Delivery terms (days):</span>{" "}
        <span className="order-info__tg">{dateClosedOperation}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">Country sent from:</span>{" "}
        <span className="order-info__tg">{countryFrom}</span>
      </div>
      <div className="order-info">
        <span className="order-info__bb">Logistic:</span>{" "}
        <span className="order-info__tg">{logistic}</span>
      </div>
      <div className="order-info">
        <span className="order-info__price">Price:</span>{" "}
        <span className="order-info__price-num">{price}</span>
      </div>
    </div>
  );
};

export default OrderInfo;
