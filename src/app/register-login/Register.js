import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reset } from "redux-form";
import axios from "axios";

//Material ui
import { Typography } from "@material-ui/core";

import SocialAuthForm from "./forms/SocialAuthForm";
import ResponseMessage from "../ui_components/responseMessage/ResponseMessage";
import { errorMessageParser } from "../utils/errorMessageParser";
import countriesList from "../../consts/countries";
import RegisterForm from "./forms/RegisterForm";
import validateFunc from "./forms/registerValidation";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesList: countriesList,
      messages: [],
      errors: [],
      err: "",
    };
  }

  // componentDidMount() {
  //   if (window.location.host === "opnplatform.com") {
  //     window.analytics.page("Sign Up");
  //   }
  // }

  clear = () => {
    if (this.state.errors !== []) {
      this.setState({
        errors: [],
      });
    }
    if (this.state.messages !== []) {
      this.setState({
        messages: [],
      });
    }
    if (this.state.err !== "") {
      this.setState({
        err: "",
      });
    }
  };

  onFormSubmit = values => {
    this.clear();
    this.props.handleSubmit(values);
    axios
      .post(`/user`, {
        clientId: this.props.clientId,
        email: values.email,
        password: values.password,
        c_password: values.cpassword,
      })
      .then(res => {
        if (res.status === 200) {
          analytics.identify(res.data.result._id, {
            name: res.data.result.name,
            email: res.data.result.mail.id,
            plan: "Basic",
          });

          this.setState({
            messages: [
              ...this.state.messages,
              "Registered successfully, please check your email",
            ],
          });
          reset("registerForm");
        }
      })
      .catch(error => {
        this.setState({ errors: errorMessageParser(error) });
      });
  };

  render() {
    const { submitting, handleSubmit, isLoggedIn, position } = this.props;
    const { messages, errors, err } = this.state;
    if (isLoggedIn) {
      if (position) {
        return <Redirect push to="/" />;
      } else {
        return <Redirect push to="/register_company" />;
      }
    }

    return (
      <div className="login-form_wrapper">
        <div className="signup-caption-container">
          <Typography
            variant="h5"
            component="h2"
            style={{ alignSelf: "start", marginBottom: "9px" }}
          >
            Sign Up
          </Typography>
        </div>
        <RegisterForm
          onFormSubmit={this.onFormSubmit}
          handleSubmit={handleSubmit}
          submitting={submitting}
          countriesList={this.state.countriesList}
        />
        <Typography
          variant="subtitle2"
          component="h2"
          style={{
            alignSelf: "start",
            marginTop: "17px",
            marginBottom: "6px",
            textAlign: "center",
          }}
        >
          Or sign up with social
        </Typography>
        <SocialAuthForm clientId={this.props.clientId} />

        {messages.length !== 0 ? (
          messages.map((item, index) => (
            <ResponseMessage key={index} message={item} type="message" />
          ))
        ) : (
          <React.Fragment />
        )}
        {errors
          ? errors.map((item, index) => {
              return <ResponseMessage key={index} message={item} />;
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
  };
};
export default connect(mapStateToProps)(
  reduxForm({
    form: "registerForm",
    validate: validateFunc,
  })(Register)
);
