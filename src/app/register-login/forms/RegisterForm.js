import React from "react";
import { Field } from "redux-form";
/* Custom ui */
import {
  renderInputStyled,
  renderSelectStyled,
} from "../../ui_components/utils/inputsStyled/inputsStyled";
import { MaterialOutlinedInput } from "../../ui_components/materialBased/materialBasedInputs";
import { MaterialPrimaryButton } from "../../ui_components/materialBased/materialBasedButtons";

const RegisterForm = props => {
  const { submitting, handleSubmit, onFormSubmit, countriesList } = props;

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Field
          name="email"
          label="Email"
          component={MaterialOutlinedInput}
          type="email"
        />
        <Field
          name="password"
          label="Password"
          component={MaterialOutlinedInput}
          type="password"
        />
        <Field
          name="cpassword"
          label="Confirm password"
          component={MaterialOutlinedInput}
          type="password"
        />
        <MaterialPrimaryButton
          label="SUBMIT"
          type="submit"
          disabled={submitting}
        />
      </form>
    </div>
  );
};

export default RegisterForm;
