import React from "react";
import moment from "moment";
import "../css/requestsList.scss";
import Flag from "react-world-flags";
import { getName } from "country-list";
import { MaterialFixedTextButton } from "../../../../ui_components/materialBased/materialBasedButtons";

const RequestsItem = props => {
  return (
    <li className="my-requests-list-item">
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

      <div className="my-requests-list-item-wrapper">
        <div className="my-requests-list-item-content">
          <p className="my-requests-list-item_category">
            {props.company ? props.company : ""}
          </p>
          <p className="my-requests-list-item_name">
            {!props.name
              ? ""
              : props.name.length > 50
              ? props.name.slice(0, 50) + " ..."
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

          <p className="my-requests-list-item_amount">
            Amount{" "}
            <span>
              {props.amount && props.amount.number ? props.amount.number : " "}
              {props.amount && props.amount.unit ? props.amount.unit : " - "}
            </span>
          </p>
        </div>

        <div className="my-requests-list-item-content my-requests-list-item-content__align-left">
          <p className="my-requests-list-item_details">
            {props.index ? props.index : ""} / {moment(props.date).format("LT")}
          </p>
          <div className="my-requests-list-item-activity">
            {/* <p className="my-requests-list-item_responses">
            <span>5</span>Responses
          </p> */}
            <div className="my-products-list-item_details">
              <MaterialFixedTextButton
                // disabled
                onClick={() => props.reqDetailsShow(props.product)}
                label="DETAILS"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RequestsItem;
