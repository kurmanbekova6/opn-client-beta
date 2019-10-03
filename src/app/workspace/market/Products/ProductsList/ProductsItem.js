import React from "react";
import Flag from "react-world-flags";
import { getName } from "country-list";

import { priceFormat } from "../../../../utils/priceFormat";
import { MaterialFixedTextButton } from "../../../../ui_components/materialBased/materialBasedButtons";

import "../css/productList.scss";

const ProductsItem = props => {
  return (
    <li className="my-products-list-item">
      {props.photo !== null && props.photo !== undefined ? (
        <div className="my-products-list-item_product-img">
          <img
            key={props.photo._id}
            src={`${location.protocol}//${
              location.hostname == "localhost"
                ? "dev.opnplatform.com"
                : location.hostname
            }/api/v1/file/${props.photo._id}`}
            alt="Product Photo"
          />
        </div>
      ) : (
        <div className="my-products-list-item_img" />
      )}

      <div className="my-products-list-item-wrapper">
        <div className="my-products-list-item-content">
          <p className="my-products-list-item_category">
            {props.company ? props.company : ""}
          </p>
          <p className="my-products-list-item_name">
            {!props.name
              ? ""
              : props.name.length > 40
              ? props.name.slice(0, 40) + " ..."
              : props.name}
          </p>
          <div className="my-products-list-item-country">
            <Flag
              code={props.country}
              className="my-products-list-item-country_flag"
            />
            <p className="my-products-list-item-country_name">
              {getName(props.country)}
            </p>
          </div>
          <p className="my-products-list-item_price">
            &euro;{priceFormat(props.price)}
          </p>
        </div>

        <div className="my-products-list-item_details">
          <MaterialFixedTextButton
            onClick={() => props.prodDetailsShow(props.product)}
            label="DETAILS"
          />
        </div>
      </div>
    </li>
  );
};

export default ProductsItem;
