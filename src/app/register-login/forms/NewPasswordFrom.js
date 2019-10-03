import React from "react";
import { Field, reduxForm } from "redux-form";
import { Dispatch } from "redux";
import { renderInputStyled } from "../../ui_components/utils/inputsStyled/inputsStyled";
import { MaterialOutlinedInput } from "../../ui_components/materialBased/materialBasedInputs";
import { MaterialPrimaryButton } from "../../ui_components/materialBased/materialBasedButtons";
import validateFunc from "../../utils/formFieldsValidation";
const NewPasswodForm = props => {
  const { submitting, handleSubmit, onFormSubmit } = props;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Field
        name="password"
        label="Password"
        component={MaterialOutlinedInput}
        type="password"
      />
      <Field
        name="confirmPassword"
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
  );
};
export default reduxForm({
  form: "new_password_form",
  validate: validateFunc,
})(NewPasswodForm);
