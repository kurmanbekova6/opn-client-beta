import React, { Component } from "react";
import { Link } from "react-router-dom";

import { CloseCross } from "../../consts/icons";

class OrderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return "";
    }

    return (
      <div className="order-item">
        {product.photos.length > 0 ? (
          <img
            className="order-item__img"
            src={`${location.protocol}//${
              location.hostname == "localhost"
                ? "dev.opnplatform.com"
                : location.hostname
            }/api/v1/file/${product.photos[0]._id}`}
            alt="Product"
          />
        ) : null}
        <div className="order-item-details">
          <div className="order-item__number">
            <span>#{product.index}</span>
          </div>

          <div>
            <span className="order-item__title">Title:</span>
            <span>
              {product.name ? product.name : "-"} #{product.index}
            </span>
          </div>

          <div>
            <span className="order-item__title">How much:</span>
            <span>-</span>
          </div>

          <div>
            <span className="order-item__title order-item__title_align">
              Delivery to:
            </span>
            <span>-</span>
          </div>

          <div>
            <span className="order-item__title">Price:</span>
            <span>{product.price / 100} per/ton</span>
          </div>
          <div className="order-item-actions">
            <Link
              to={`/create_order/${product._id}`}
              id="CommonBtn"
              className="order-item__btn"
            >
              delete order
            </Link>
            <Link
              to={`/create_order/${product._id}`}
              id="CommonBtn"
              className="order-item__btn order-item__btn_icon"
            >
              <CloseCross />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderItem;
