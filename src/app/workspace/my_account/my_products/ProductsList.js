import React, { Component } from "react";
import { connect } from "react-redux";
import Flag from "react-world-flags";
import { getName } from "country-list";
import { priceFormat } from "../../../utils/priceFormat";
import { MaterialPrimaryButton } from "../../../ui_components/materialBased/materialBasedButtons";
import "./css/my_products.scss";

class ProductsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { products, actionButton } = this.props;

    if (!products.length) {
      return null;
    }

    return (
      <div className="my-products-wrapper">
        {/* <p className="my-products_date-separator">22 february</p> */}
        <ul className="my-products-list">
          {products.length > 0
            ? products.map((item, id) => (
                <li className="my-products-list-item" key={id}>
                  {item.photos !== null && item.photos !== undefined ? (
                    <div className="my-products-list-item_product-img">
                      <img
                        key={item.photos[0]._id}
                        src={`${location.protocol}//${
                          location.hostname == "localhost"
                            ? "dev.opnplatform.com"
                            : location.hostname
                        }/api/v1/file/${item.photos[0]._id}`}
                        alt="Product Photo"
                      />
                    </div>
                  ) : (
                    <div className="my-products-list-item_img" />
                  )}
                  <div className="my-products-list-item-wrapper">
                    <div className="my-products-list-item-content">
                      <p className="my-products-list-item_category">
                        {item.company.profile.name}
                      </p>
                      <p className="my-products-list-item_name">
                        {!item.name
                          ? ""
                          : item.name.length > 40
                          ? item.name.slice(0, 40) + " ..."
                          : item.name}
                      </p>
                      <div className="my-products-list-item-country">
                        <Flag
                          code={item.country}
                          className="my-products-list-item-country_flag"
                        />
                        <p className="my-products-list-item-country_name">
                          {getName(item.country)}
                        </p>
                      </div>
                      <p className="my-products-list-item_price">
                        &euro;{priceFormat(item.price)}
                      </p>
                    </div>
                    <div className="my-products-list-item-actions">
                      <p className="my-products-list-item_setting">Setting</p>
                      <MaterialPrimaryButton
                        label={
                          actionButton === "published" ? "Draft" : "Publish"
                        }
                        type="button"
                        style={{
                          outline: "none",
                          width: "auto",
                          height: 40,
                          margin: "0 0 0 2em",
                          padding: "0 1.5em",
                          fontSize: 14,
                          boxShadow: "none",
                          borderRadius: 12,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}
                      />
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
  };
};

export default connect(mapStateToProps)(ProductsList);
