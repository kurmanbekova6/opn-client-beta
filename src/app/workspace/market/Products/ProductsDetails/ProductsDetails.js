import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";
import { getName } from "country-list";
import { priceFormat } from "../../../../utils/priceFormat";
import axios from "axios";
import { connect } from "react-redux";
// Material UI
import { MaterialNotContainedButton } from "../../../../ui_components/materialBased/materialBasedButtons";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
// Styles
import "../css/productsDetails.scss";
import "../../../my_account/documents/css/documents.scss";
import "../css/productsDetails.scss";

// Components
import DocumentItems from "../../../my_account/documents/DocumentItem";
import MakeOrder from "../MakeOrderSteps/MakeOrder";

const ProductsDetails = props => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    window.scroll(0, 160);
    axios
      .post("/user/lookup", {
        access_token: props.token,
        clientId: props.clientId,
      })
      .then(res => {
        setUser(res.data.result);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="prod-detail-container">
      {console.log(props.product)}
      <div className="prod-detail-info">
        <div
          className="step-back-link"
          onClick={() => props.changeActiveTab(0)}
        >
          <NavigateBefore />
          ALL PRODUCTS
        </div>
        <p className="prod-detail-info_category">
          {props.product.category && props.product.category.stringified
            ? props.product.category.stringified.split("///")[0]
            : props.product.name
            ? props.product.name
            : "-"}
        </p>
        <p className="prod-detail-info_name">
          {props.product ? props.product.name : "-"}
        </p>
        <div className="prod-detail-info_info">
          {props.product.description ? props.product.description : "-"}
        </div>
        <ul className="prod-detail-info_details">
          <li>
            <span className="prod-detail-info_details__grey">
              company:
            </span>{" "}
            <span className="prod-detail-info_details__blue">
              {props.product.company ? props.product.company.profile.name : "-"}
            </span>
          </li>
          <li>
            <span className="prod-detail-info_details__grey">location:</span>{" "}
            {props.product.country ? (
              <span className="prod-detail-info_details__dark">
                <Flag
                  code={props.product.country}
                  className="my-products-list-item-country_flag"
                />
                {getName(props.product.country)}
              </span>
            ) : (
              <span className="prod-detail-info_details__dark">{"-"}</span>
            )}
          </li>
          <li>
            <span className="prod-detail-info_details__grey">
              delivery variant:
            </span>{" "}
            <span className="prod-detail-info_details__dark">
              {props.product.delivery ? props.product.delivery.variant : "-"}
            </span>
          </li>
          <li>
            <span className="prod-detail-info_details__grey">
              delivery terms (days):
            </span>{" "}
            <span className="prod-detail-info_details__dark">
              {props.product.delivery ? `${props.product.delivery.term} days` : "-"}
            </span>
          </li>
          <li>
            <span className="prod-detail-info_details__grey">status</span>{" "}
            <span className="prod-detail-info_details__dark">
              {props.product.status ? props.product.status : "-"}
            </span>
          </li>
        </ul>
        <div className="prod-detail-info_price">
          <span className="price">
            &euro;
            {props.product.price ? priceFormat(props.product.price) : " - "}
          </span>
          {props.product.amount ? (
            <React.Fragment>
              <span className="unit">per {props.product.amount.unit}</span>
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
            {user.length === 0 ||
            user.company_profile === props.product.company._id ? null : (
              <MakeOrder
                category={
                  props.product.category && props.product.category.stringified
                    ? props.product.category.stringified.split("///")[0]
                    : props.product.name
                    ? props.product.name
                    : "-"
                }
                name={props.product.name ? props.product.name : "-"}
                product={props.product}
              />
            )}
          </div>
        </div>
      </div>
      <div className="prod-detail-gallery">
        {props.product.photos
          ? props.product.photos.map((photo, i) => (
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
      {props.product.documents.length !== 0 ? (
        <div className="prod-detail-documents">
          <div className="prod-detail-documents_title">Product documents</div>
          <div className="prod-detail-documents_content">
            <ul className="documents-list">
              {props.product.documents.map((doc, i) => (
                <DocumentItems key={i} doc={doc} style={{ width: "100%" }} />
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
  };
};

export default connect(
  mapStateToProps,
  null
)(ProductsDetails);
