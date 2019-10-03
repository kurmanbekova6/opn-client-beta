import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import axios from "axios";

import { MaterialOutlinedInput } from "../../ui_components/materialBased/materialBasedInputs";
import { MaterialPrimaryButton } from "../../ui_components/materialBased/materialBasedButtons";
import validateFunc from "../../utils/formFieldsValidation";
import "../contacts.scss";

class FeedbackForm extends Component {
  state = {
    clientId: "",
    userName: "",
    companyName: "",
    userEmail: "",
    message: "",
  };

  handleInputs = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onFormSubmit = values => {
    if (window.location.host === "opnplatform.com") {
      window.Intercom("update", { email: values.email, name: values.name });
      window.Intercom("showNewMessage", values.message);
    }
    // axios
    //   .post("/feedback", {
    //     clientId: this.props.clientId,
    //     name: values.name,
    //     email: values.email,
    //     message: values.message,
    //   })
    //   .then(res => {
    //     if (res.status === 200) {
    //       this.setState({
    //         userName: "",
    //         companyName: "",
    //         userEmail: "",
    //         message: "",
    //         response: "Thank you for your message",
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  render() {
    const { submitting, handleSubmit } = this.props;

    return (
      <div className="form_wrapper">
        <form
          onSubmit={handleSubmit(this.onFormSubmit)}
          // autoComplete="off"
          // autoCorrect="off"
          // spellCheck="off"
        >
          <Field
            name="name"
            label="Name"
            component={MaterialOutlinedInput}
            type="text"
          />
          <Field
            name="email"
            label="Email"
            component={MaterialOutlinedInput}
            type="email"
          />
          <Field
            name="message"
            label="Message"
            component={MaterialOutlinedInput}
            multiline
            rows={4}
          />
          <MaterialPrimaryButton
            label="SEND MESSAGE"
            type="submit"
            disabled={submitting}
          />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    clientId: state.clientId,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "feedbackForm",
    validate: validateFunc,
  })(FeedbackForm)
);
