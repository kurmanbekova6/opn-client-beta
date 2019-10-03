import React, { Fragment } from "react";
import { Field } from "redux-form";
// Custom Ui
import { MaterialPrimaryButton } from "../../../../../ui_components/materialBased/materialBasedButtons";
import { MaterialOutlinedSelect } from "../../../../../ui_components/materialBased/materialBasedSelectInputs";
import { MaterialOutlinedInput } from "../../../../../ui_components/materialBased/materialBasedInputs";
import { MaterialDatePicker } from "../../../../../ui_components/materialBased/materialBasedDatePicker";
// Data
//import { deliveryMethods } from "./data";
//import { deliveryCompany } from "./data";

const StepTwoForm = props => {
  const { setStep } = props;
  return (
    <Fragment>
      <Field
        name="destination"
        label="Destination"
        component={MaterialOutlinedInput}
        type="text"
      />
      <Field
        name="date"
        label="Date"
        component={MaterialDatePicker}
        type="datetime-local"
        placeholder="Date"
      />
      <Field
        name="deliveryVariant"
        label="Delivery variant"
        component={MaterialOutlinedSelect}
        type="text"
        placeholder="Delivery variant"
        menuItems={deliveryMethods}
      />
      <Field
        name="deliveryCompany"
        label="Delivery company"
        component={MaterialOutlinedSelect}
        type="text"
        placeholder="Delivery variant"
        menuItems={deliveryCompany}
      />
      <MaterialPrimaryButton
        label="NEXT"
        disabled={!props.valid}
        onClick={() => {
          setStep(3);
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
    </Fragment>
  );
};

export default StepTwoForm;
