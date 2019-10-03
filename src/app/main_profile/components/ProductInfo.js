import React from "react";

const ProductInfo = props => {
  const { description, photo, requirements } = props;
  return (
    <div className="product-info__container">
      <div className="product-info__desc-box">
        <div className="product-info__desc-box_title">Parameters</div>
        <div className="product-info__desc-box_text">
          {description.length !== 0
            ? description
            : "No description for this product"}
        </div>
      </div>

      <div className="product-info__desc-box">
        <div className="product-info__desc-box_title">
          Requirements for participants
        </div>
        <div className="product-info__desc-box_text">
          {requirements.length !== 0
            ? requirements
            : "No requirements for this product"}
        </div>
      </div>

      <div className="product-info__photos">
        <div className="product-info__desc-box_title">Product photo:</div>
        <div className="product-info__photo-cntnr">
          {photo.map((it, i) => (
            <div className="product-info__photo" key={i}>
              <img
                src={
                  it._id
                    ? `http://dev.opnplatform.com/api/v1/file/${it._id}`
                    : it
                }
                alt="prod"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
