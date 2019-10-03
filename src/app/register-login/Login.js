import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import LoginForm from "./forms/LoginForm";
import SocialAuthForm from "./forms/SocialAuthForm";
import validateFunc from "./forms/registerValidation";
/* Actions */
import {
  loginUser,
  loginStatus,
  setToken,
  setTokenRefresh,
} from "../../redux/actions/userActions";
import { setProfileActive } from "../../redux/actions/profileMenuActions";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "./registerLogin.scss";
import { Typography } from "@material-ui/core";
import { errorMessageParser } from "../utils/errorMessageParser";
import ResponseMessage from "../ui_components/responseMessage/ResponseMessage";
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import { Col, Row } from "reactstrap";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";

class Login extends Component {
  state = {
    messages: "",
    errors: [],
    access_token: "",
    companyId: "",
  };

  // componentDidMount() {
  //   if (window.location.host === "opnplatform.com") {
  //     window.analytics.page("Sign In");
  //   }
  // }

  onFormSubmit = values => {
    this.props.handleSubmit(values);
    axios
      .post(`/user/login`, {
        clientId: this.props.clientId,
        email: values.email,
        password: values.password,
      })
      .then(res => {
        if (res.status === 200) {
          /* Redux actions -> locals */
          this.props.setToken(res.data.result.access_token.token);
          this.props.setTokenRefresh(res.data.result.refresh_token.token);
          this.props.userInformation(res);
          this.props.loginStatus(true);
          this.props.setProfileActive();

          /* TODO: old (worcked version) */
          // window.intercomSettings = {
          //   app_id: "ulueqf5y",
          //   name: res.data.result.name, // Full name
          //   email: res.data.result.mail.id, // Email address
          //   created_at: res.data.result.created_at, // Signup date as a Unix timestamp
          // };
          if (window.location.host === "opnplatform.com") {
            analytics.identify(res.data.result._id, {
              name: res.data.result.name,
              email: res.data.result.mail.id,
            });
          }

          window.Intercom("boot", {
            app_id: "ulueqf5y",
            name: res.data.result.name, // Full name
            email: res.data.result.mail.id, // Email address
            created_at: res.data.result.created_at, // Signup date as a Unix timestamp
          });
        }
      })
      .catch(error => {
        this.setState({ errors: errorMessageParser(error) });
      });
  };

  render() {
    const {
      submitting,
      handleSubmit,
      isLoggedIn,
      position,
      regCompFormSkipped,
    } = this.props;
    const { message, errors } = this.state;
    if (isLoggedIn) {
      if (position || regCompFormSkipped) {
        return <Redirect push to="/categories" />;
      } else {
        return <Redirect push to="/register_company" />;
      }
    }
    return (
      <div className="login-form_wrapper">
        <Typography
          variant="h5"
          component="h2"
          style={{ alignSelf: "start", marginBottom: "18px" }}
        >
          Login
        </Typography>

        <LoginForm
          onFormSubmit={this.onFormSubmit}
          handleSubmit={handleSubmit}
          submitting={submitting}
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
        {message ? <ResponseMessage message={message} type="message" /> : null}
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
  if (state.loggedIn && state.loggedIn.data) {
    return {
      access_token: state.loggedIn,
      position: state.loggedIn.data.result.position,
      isLoggedIn: state.loginStatus,
      clientId: state.clientId,
      regCompFormSkipped: state.regCompFormSkipped,
    };
  }
  return {
    access_token: state.loggedIn,
    isLoggedIn: state.loginStatus,
    clientId: state.clientId,
    regCompFormSkipped: state.regCompFormSkipped,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userInformation: payload => {
      dispatch(loginUser(payload));
    },
    loginStatus: payload => {
      dispatch(loginStatus(payload));
    },
    setProfileActive: () => {
      dispatch(setProfileActive());
    },
    setToken: token => {
      dispatch(setToken(token));
    },
    setTokenRefresh: token => {
      dispatch(setTokenRefresh(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "loginForm",
    validate: validateFunc,
  })(Login)
);
