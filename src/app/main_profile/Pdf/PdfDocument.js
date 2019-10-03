import React from "react";

const PdfDocument = ({ orders }) => {
  return (
    <div>
      <h3>Orders list</h3>
      {orders.map(order => (
        <p>{order.name}</p>
      ))}
    </div>
  );
};

export default PdfDocument;
