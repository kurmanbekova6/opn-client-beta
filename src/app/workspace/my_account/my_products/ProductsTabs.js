import React, { Component } from "react";
import { connect } from "react-redux";

import "./css/my_products.scss";

class ProductsTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isActiveTab, onChangeTab } = this.props;

    return (
      <div className="my-products-tabs">
        <p
          className={
            isActiveTab === "published"
              ? "my-products-tabs_item my-products-tabs_item__active"
              : "my-products-tabs_item"
          }
          onClick={() => onChangeTab("published")}
        >
          Published
        </p>
        <p
          className={
            isActiveTab === "draft"
              ? "my-products-tabs_item my-products-tabs_item__active"
              : "my-products-tabs_item"
          }
          onClick={() => onChangeTab("draft")}
        >
          Draft
        </p>
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

export default connect(mapStateToProps)(ProductsTabs);
