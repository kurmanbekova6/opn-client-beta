import React, { Component, Fragment } from "react";
import { auth } from "../../../api/firebase";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import IconButton from "@material-ui/core/IconButton";

import {
  loginStatus,
  loginUser,
  setToken,
  setTokenRefresh,
} from "../../../redux/actions/userActions";
import { setProfileActive } from "../../../redux/actions/profileMenuActions";

import "./SocialAuthForm.scss";
import ResponseMessage from "../../ui_components/responseMessage/ResponseMessage";

class SocialAuthForm extends Component {
  state = { error: null };

  componentDidMount() {
    const search = this.props.location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    const access_token = params.get("access_token"); // bar
    const refresh_token = params.get("refresh_token"); // bar
    const error = params.get("error"); // bar
    if (error) {
      this.setState({ error });
    } else if (access_token && refresh_token) {
      this.loginWithLinkedIn(access_token, refresh_token);
    }
  }

  loginToOPN = credential => {
    this.setState({ error: null });
    axios
      .post("/user/oauth/callback", {
        clientId: this.props.clientId,
        auth: credential,
      })
      .then(res => {
        if (res.status === 200) {
          /* Redux actions -> locals */
          this.props.setToken(res.data.result.access_token.token);
          this.props.setTokenRefresh(res.data.result.refresh_token.token);
          this.props.userInformation(res);
          this.props.loginStatus(true);
          this.props.setProfileActive();
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          this.setState({ error: error.response.data.error_message });
        } else {
          console.log(error);
        }
      });
  };

  handleClick = provider => {
    this.setState({ error: null });
    auth
      .getAuth()
      .signInWithPopup(provider)
      .then(data => {
        this.setState({ error: null });
        this.loginToOPN(data);
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  linkedInOAuth = () => {
    window.location.href = `${process.env.API_URL}/user/oauth/linkedin`;
  };

  loginWithLinkedIn = (accessToken, refreshToken) => {
    axios
      .post(`/user/lookup`, {
        clientId: this.props.clientId,
        access_token: accessToken,
      })
      .then(res => {
        this.props.userInformation(res);
        this.props.setToken(accessToken);
        this.props.setTokenRefresh(refreshToken);
        this.props.loginStatus(true);
        this.props.setProfileActive();
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <div className="social-auth__item-row">
          <IconButton
            color="primary"
            onClick={() => this.handleClick(auth.googleOAuth())}
          >
            <div className="social-auth__icon social-auth__icon-google" />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => this.handleClick(auth.facebookOAuth())}
          >
            <div className="social-auth__icon social-auth__icon-facebook" />
          </IconButton>
          <IconButton color="primary" onClick={this.linkedInOAuth}>
            <div className="social-auth__icon social-auth__icon-linkedin" />
          </IconButton>
        </div>
        {this.state.error ? (
          <ResponseMessage message={this.state.error} />
        ) : (
          <Fragment />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.loggedIn && state.loggedIn.data) {
    return {
      access_token: state.loggedIn,
      companyName: state.loggedIn.data.result.company_name,
      isLoggedIn: state.loginStatus,
      clientId: state.clientId,
    };
  }
  return {
    access_token: state.loggedIn,
    isLoggedIn: state.loginStatus,
    clientId: state.clientId,
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SocialAuthForm)
);
