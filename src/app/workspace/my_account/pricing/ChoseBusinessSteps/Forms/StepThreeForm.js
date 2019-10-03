import React, { Fragment } from "react";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
// Custom Ui
import { MaterialRadio } from "../../../../../ui_components/materialBased/materialBasedRadio";
import { MaterialPrimaryButton } from "../../../../../ui_components/materialBased/materialBasedButtons";
//import { paymentVariant } from "./data";

const StepThreeForm = props => {
  const { product } = props;
  return (
    <Fragment>
      <div className="make-order_step-one_body-variant">Payment variant</div>

      <Field
        name="paymentVariant"
        value="stripe"
        component={MaterialRadio}
        menuItems={paymentVariant}
      />
      <Link
        to={{
          pathname: "/deals",
          state: { product: product },
        }}
      >
        <MaterialPrimaryButton
          disabled={!props.valid}
          type="submit"
          label="SEND THE ORDER"
          style={{
            outline: "none",
            borderRadius: "12px",
            margin: 0,
            boxShadow: "none",
            color: "#ffffff",
            height: "48px",
            width: "320px",
            letterSpacing: "1px",
          }}
        />
      </Link>
    </Fragment>
  );
};

export default StepThreeForm;
