import React, { Fragment } from "react";
import { Field } from "redux-form";
// Custom Ui
import { MaterialPrimaryButton } from "../../../../../ui_components/materialBased/materialBasedButtons";
import { MaterialOutlinedSelect } from "../../../../../ui_components/materialBased/materialBasedSelectInputs";
// Data
//import { amount } from "./data";

const StepOneForm = props => {
  const { category, name, setStep } = props;
  return (
    <Fragment>
      <div className="make-order_step-one_body-category">{category}</div>
      <div className="make-order_step-one_body-name">{name}</div>
      <div className="make-order_step-one_body-form">
        <Field
          name="paymentMethod"
          label="Payment Method"
          type="text"
          placeholder="Payment Method"
          component={MaterialRadio}
          menuItems={paymentVariant}
        />

        <MaterialPrimaryButton
          label="APPLY"
          disabled={!props.valid}
          onClick={() => {
            setStep(2);
          }}
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
      </div>
    </Fragment>
  );
};

export default StepOneForm;
