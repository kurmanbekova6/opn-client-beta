import React from "react";
import { Field } from "redux-form";

import { MaterialOutlinedInput } from "../../../ui_components/materialBased/materialBasedInputs";
import { MaterialPrimaryButton } from "../../../ui_components/materialBased/materialBasedButtons";

const InviteCarrierForm = props => {
  const { submitting, handleSubmit, onFormSubmit } = props;

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Field
          name="email"
          label="Email"
          component={MaterialOutlinedInput}
          type="text"
        />
        <MaterialPrimaryButton
          label="Send invitation"
          type="submit"
          style={{
            outline: "none",
            width: "100%",
            height: 48,
            margin: 0,
            padding: 0,
            fontSize: 14,
            letterSpacing: 1,
            boxShadow: "none",
            borderRadius: 12,
            textTransform: "uppercase",
          }}
        />
      </form>
    </div>
  );
};

export default InviteCarrierForm;
