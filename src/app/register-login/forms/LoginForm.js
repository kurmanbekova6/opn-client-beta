import React from "react";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import "../registerLogin.scss";
/* Custom ui */
// import { renderInputField } from '../../ui_components/utils/Inputs';
// import CommonFlatBtn from "../../common/CommonFlatBtn";
import { renderInputStyled } from "../../ui_components/utils/inputsStyled/inputsStyled";
import { MaterialOutlinedInput } from "../../ui_components/materialBased/materialBasedInputs";
import { Typography } from "@material-ui/core";
import { MaterialPrimaryButton } from "../../ui_components/materialBased/materialBasedButtons";

const LoginForm = props => {
  const { submitting, handleSubmit, onFormSubmit } = props;
  return (
    <div className="login-form-wrapper">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        // autoComplete="off"
        // autoCorrect="off"
        // spellCheck="off"
      >
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

        <Link to="/reset-password" className="reset-link">
          <Typography
            variant="caption"
            color="primary"
            // component="h2"
            // style={{ alignSelf: "start", marginBottom: "9px" }}
          >
            Forgot password?
          </Typography>
        </Link>
        <MaterialPrimaryButton
          label="SUBMIT"
          type="submit"
          disabled={submitting}
        />
      </form>
    </div>
  );
};

export default LoginForm;
