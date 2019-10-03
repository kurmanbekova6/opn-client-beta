import React from "react";
import { Field } from "redux-form";

/* Custom ui */
import { MaterialPrimaryButton } from "../ui_components/materialBased/materialBasedButtons";
import { MaterialOutlinedInput } from "../ui_components/materialBased/materialBasedInputs";

const InviteForm = props => {
  const { submitting, handleSubmit, onFormSubmit } = props;

  return (
    <div className="invite-form">
      <p className="invite-form_title">Company info</p>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Field
          name="email"
          label="Email address"
          component={MaterialOutlinedInput}
          type="email"
        />
        <Field
          name="company"
          label="Company name"
          component={MaterialOutlinedInput}
          type="text"
        />
        <Field
          name="manager"
          label="Manager name"
          component={MaterialOutlinedInput}
          type="text"
        />
        <Field
          name="password"
          label="Password"
          component={MaterialOutlinedInput}
          type="password"
        />
        <MaterialPrimaryButton
          label="Get started"
          type="submit"
          disabled={submitting}
        />
      </form>
    </div>
  );
};

export default InviteForm;
