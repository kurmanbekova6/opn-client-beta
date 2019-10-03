import React from "react";
import { Row, Col } from "reactstrap";

import RenderBreadcrumbs from "../../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../../ui_components/Titles/ColumnHeader";

import productPhoto from "../../../assets/img/thumbBox.png";
import BuyerInfoForm from "./BuyerInfoForm";
import OrderInfoForm from "./OrderInfoForm";

const ConfirmOrder = () => {
  return (
    <div className="product-order">
      <RenderBreadcrumbs value="Products / Make Order" />
      <h1 className="product-order__title">Make order</h1>

      <Row>
        <Col md="4">
          <ColumnHeader value="product INFO" />
          <div>
            <div className="order-item_inline">
              <div>
                <div className="order-item__number order-item_mb">
                  <span>#43562</span>
                </div>
                <img
                  className="order-item__img"
                  src={productPhoto}
                  alt="product photo"
                />
              </div>

              <div className="order-item-details">
                <div className="order-item_mb">
                  <span className="order-item__title">Title:</span>
                  <span>Acetone #43562</span>
                </div>

                <div>
                  <span className="order-item__title">
                    Date of announcement:
                  </span>
                  <span>12 | 12 | 2019</span>
                </div>

                <div>
                  <span className="order-item__title order-item__title_align">
                    Delivery terms:
                  </span>
                  <span>12 | 12 | 2019</span>
                </div>

                <div>
                  <span className="order-item__title">Date closed:</span>
                  <span>12 | 12 | 2019</span>
                </div>

                <div>
                  <span className="order-item__title order-item__title_reverse">
                    Organizer:
                  </span>
                  <span>OPEN PACKAGING NETWORK</span>
                </div>

                <div>
                  <span className="product-item__checked">Prove</span>
                </div>
              </div>
            </div>

            <div className="order-item-about">
              <p className="order-item__title">Parameters:</p>
              <p className="order-item-about__info">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fug
                iat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt.
              </p>
            </div>

            <div className="order-item-about">
              <p className="order-item__title">
                Requirements for participants:
              </p>
              <p className="order-item-about__info">
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <br />
                2. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. <br />
                3. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>

            <div>
              <p className="order-item__price">
                <span>Price:</span> 2 000 per/ton
              </p>
            </div>
          </div>
        </Col>

        <Col md="4">
          <BuyerInfoForm />
        </Col>

        <Col md="4">
          <OrderInfoForm />
        </Col>
      </Row>
    </div>
  );
};

export default ConfirmOrder;
