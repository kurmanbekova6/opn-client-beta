import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Flag from "react-world-flags";
import { getName } from "country-list";
import { Link } from "react-router-dom";
import { priceFormat } from "../../utils/priceFormat";
import { MaterialNotContainedButton } from "../../ui_components/materialBased/materialBasedButtons";
import "../css/categoryItem.scss";

const categoryItem = props => {
  return (
    <div className="category-item">
      <div className="category-item_img">
        {props.category.photos && props.category.photos.length !== 0 ? (
          <img
            className="category-item_img-img"
            src={`${location.protocol}//${
              location.hostname == "localhost"
                ? "dev.opnplatform.com"
                : location.hostname
            }/api/v1/file/${props.category.photos[0]._id}`}
            alt=""
          />
        ) : (
          <div className="category-item_img-grey" />
        )}
      </div>
      <div className="category-item_content">
        <div className="category-item_content-company">IKESERANG</div>
        <div className="category-item_content-name"> {props.category.name}</div>
        <div className="category-item_content-flag">
          <div className="my-products-list-item-country">
            <Flag
              code={props.category.country}
              className="my-products-list-item-country_flag"
            />
            <p className="my-products-list-item-country_name">
              {getName(props.category.country)}
            </p>
          </div>
        </div>
        <div className="category-item_content-price">
          <div className="category-item_content-price-number">
            $ {props.category ? priceFormat(props.category.price) : 0}
          </div>
          <Link to={`/category-product/${props.category._id}`}>
            <MaterialNotContainedButton
              className="category-item_content-price-button"
              label="DETAILS"
              style={{
                outline: "none",
                borderRadius: "12px",
                margin: 0,
                boxShadow: "none",
                color: "#ffffff",
                height: "40px",
                maxWidth: "107px",
                letterSpacing: "1px",
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default categoryItem;
