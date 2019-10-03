import React, { Component } from "react";
import Flag from "react-world-flags";
import { getName } from "country-list";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// Material UI
import Grid from "@material-ui/core/Grid";

import { priceFormat } from "../../utils/priceFormat";
// Components
import DocumentItems from "../../workspace/my_account/documents/DocumentItem";
import MakeOrder from "../../workspace/market/Products/MakeOrderSteps/MakeOrder";

// Custom Ui
import { MaterialNotContainedButton } from "../../ui_components/materialBased/materialBasedButtons";
import { MaterialPrimaryButton } from "../../ui_components/materialBased/materialBasedButtons";
import Spinner from "../../common/spinner/Spinner";

// Styles
import "../../workspace/my_account/documents/css/documents.scss";
import "../../workspace/market/Products/css/productsDetails.scss";

class CategoryItemSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      product: [],
    };
  }

  componentDidMount() {
    let url = window.location.toString().split("/");
    let id = window.location.toString().split("/")[url.length - 1];
    this.getProductInfo(id);
    this.getUserInfo();
  }

  getUserInfo = () => {
    axios
      .post("/user/lookup", {
        access_token: this.props.token,
        clientId: this.props.clientId,
      })
      .then(res => {
        this.setState({
          user: res.data.result,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getProductInfo = id => {
    axios
      .post(`/orders/get/1/${id}`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
      })
      .then(res => {
        this.setState({
          product: res.data.result,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { user, product } = this.state;
    const { isLoggedIn } = this.props;
    if (product[0] && isLoggedIn) {
      return (
        <Grid container justify="center">
          <Grid item xs={10}>
            <div className="prod-detail-container">
              <div className="prod-detail-info">
                {/* <div
            className="step-back-link"
            onClick={() => props.changeActiveTab(0)}
          >
            <NavigateBefore />
            ALL PRODUCTS
          </div> */}
                <p className="prod-detail-info_category">
                  {product[0] && product[0].category
                    ? product[0].category.stringified.split("///")[0]
                    : "-"}
                </p>
                <p className="prod-detail-info_name">
                  {product[0] && product[0].name ? product[0].name : "-"}
                </p>
                <div className="prod-detail-info_info">
                  {product[0] && product[0].description
                    ? product[0].description
                    : "-"}
                </div>
                <ul className="prod-detail-info_details">
                  <li>
                    <span className="prod-detail-info_details__grey">
                      company:
                    </span>{" "}
                    <span className="prod-detail-info_details__blue">
                      {product[0] && product[0].company
                        ? product[0].company.profile.name
                        : "-"}
                    </span>
                  </li>
                  <li>
                    <span className="prod-detail-info_details__grey">
                      location:
                    </span>{" "}
                    {product[0] && product[0].country ? (
                      <span className="prod-detail-info_details__dark">
                        <Flag
                          code={product[0].country}
                          className="my-products-list-item-country_flag"
                        />
                        {getName(product[0].country)}
                      </span>
                    ) : (
                      <span className="prod-detail-info_details__dark">
                        {"-"}
                      </span>
                    )}
                  </li>
                  <li>
                    <span className="prod-detail-info_details__grey">
                      delivery variant:
                    </span>{" "}
                    <span className="prod-detail-info_details__dark">
                      {product[0] && product[0].delivery
                        ? product[0].delivery.variant
                        : "-"}
                    </span>
                  </li>
                  <li>
                    <span className="prod-detail-info_details__grey">
                      status
                    </span>{" "}
                    <span className="prod-detail-info_details__dark">
                      {product[0] && product[0].status
                        ? product[0].status
                        : "-"}
                    </span>
                  </li>
                </ul>
                <div className="prod-detail-info_price">
                  <span className="price">
                    &euro;
                    {product[0] && product[0].price
                      ? priceFormat(product[0].price)
                      : " - "}
                  </span>
                  {product[0] && product[0].amount ? (
                    <React.Fragment>
                      <span className="unit">per {product[0].amount.unit}</span>
                    </React.Fragment>
                  ) : null}

                  <div className="prod-detail-info_price_buttons">
                    {/* <MaterialNotContainedButton
              label="START CHAT"
              style={{
                outline: "none",
                borderRadius: "12px",
                marginRight: "8px",
                padding: "12px 20px ",
                height: "48px",
                boxShadow: "none",
                fontSize: "14px",
                width: "139px",
                letterSpacing: "1px",
                color: "#3d7efd !important",
              }}
            /> */}
                    {product[0] &&
                    user.company_profile === product[0].company._id ? null : (
                      <MakeOrder
                        category={
                          product[0].category
                            ? product[0].category.stringified.split("///")[0]
                            : "-"
                        }
                        name={product[0].name ? product[0].name : "-"}
                        product={product[0]}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="prod-detail-gallery">
                {product[0] && product[0].photos
                  ? product[0].photos.map((photo, i) => (
                      <div key={photo._id} className="prod-detail-gallery_img">
                        <img
                          src={`${location.protocol}//${
                            location.hostname == "localhost"
                              ? "dev.opnplatform.com"
                              : location.hostname
                          }/api/v1/file/${photo._id}`}
                          alt="Product Photo"
                        />
                      </div>
                    ))
                  : null}
              </div>
              {product[0] && product[0].documents.length !== 0 ? (
                <div className="prod-detail-documents">
                  <div className="prod-detail-documents_title">
                    Product documents
                  </div>
                  <div className="prod-detail-documents_content">
                    <ul className="documents-list">
                      {product[0].documents.map((doc, i) => (
                        <DocumentItems
                          key={i}
                          doc={doc}
                          style={{ width: "688px" }}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          </Grid>
        </Grid>
      );
    } else if (!product[0] && isLoggedIn) {
      return (
        <div style={{ height: window.innerHeight / 2 }}>
          <Spinner />
        </div>
      );
    } else {
      return (
        <Grid container justify="center">
          <div
            style={{
              fontSize: "30px",
              margin: "30px auto",
              textAlign: "center",
              fonyWeight: "600",
              width: "100%",
            }}
          >
            Please sign in to see the products
          </div>
          <Link to="/login">
            <MaterialPrimaryButton
              label="Log in"
              type="button"
              style={{
                outline: "none",
                width: "auto",
                height: 40,
                margin: 0,
                padding: "0 1.7em",
                fontSize: 16,
                boxShadow: "none",
                borderRadius: 12,
                textTransform: "none",
              }}
            />
          </Link>
        </Grid>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
  };
};

export default connect(
  mapStateToProps,
  null
)(CategoryItemSingle);
