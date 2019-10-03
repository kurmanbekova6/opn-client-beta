import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { MaterialOutlinedInput } from "../../ui_components/materialBased/materialBasedInputs";
import validateFunc from "../../utils/formFieldsValidation";
import { MaterialPrimaryButton } from "../../ui_components/materialBased/materialBasedButtons";
import axios from "axios";
import { errorMessageParser } from "../../utils/errorMessageParser";
import ResponseMessage from "../../ui_components/responseMessage/ResponseMessage";

class ResetForm extends Component {
  state = {
    message: "",
    errors: [],
  };

  onFormSubmit = values => {
    this.setState({ message: "", errors: [] });

    axios
      .post("/user/reset_password", {
        clientId: this.props.clientId,
        email: values.email,
      })
      .then(res => {
        this.setState({
          message: res.data.result,
        });
      })
      .catch(error => {
        this.setState({ errors: errorMessageParser(error) });
      });
  };
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Fragment>
        <form onSubmit={handleSubmit(this.onFormSubmit)}>
          <Field
            name="email"
            label="Email address"
            component={MaterialOutlinedInput}
          />
          <MaterialPrimaryButton
            label="SUBMIT"
            type="submit"
            disabled={submitting}
          />
          <br />
          {this.state.message ? (
            <ResponseMessage message={this.state.message} type="message" />
          ) : null}
          {this.state.errors
            ? this.state.errors.map((item, index) => {
                return <ResponseMessage key={index} message={item} />;
              })
            : null}
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  clientId: state.clientId,
});
export default connect(mapStateToProps)(
  reduxForm({
    form: "reset_form",
    validate: validateFunc,
  })(ResetForm)
);
