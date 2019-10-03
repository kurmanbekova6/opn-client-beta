import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import NewPasswordForm from "./forms/NewPasswordFrom";
import { Redirect } from "react-router";
import "./registerLogin.scss";
/* Custom ui */
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";
import { Typography } from "@material-ui/core";
import { MaterialPrimaryButton } from "../ui_components/materialBased/materialBasedButtons";
import { errorMessageParser } from "../utils/errorMessageParser";
import ResponseMessage from "../ui_components/responseMessage/ResponseMessage";

class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      errors: [],
      clientId: "",
      goToProfile: false,
    };
  }

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
  };

  componentDidMount() {
    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200) {
          this.setState({
            clientId: res.data.result.clientId,
          });
        }
      })
      .catch(error => {
        this.clear();
        if (error.response) {
          if (
            this.state.errors[this.state.errors.length - 1] !==
            error.response.data.error_message
          ) {
            if (typeof error.response.data.error_message !== "string") {
              error.response.data.error_message.map(err => {
                if (err.message) {
                  this.setState({
                    errors: [...this.state.errors, err.message],
                  });
                }
              });
            } else {
              this.setState({
                errors: [
                  ...this.state.errors,
                  error.response.data.error_message,
                ],
              });
            }
          } else {
            this.setState({
              errors: [...this.state.errors, error.response.data.error_message],
            });
          }
        } else {
          console.log(error);
        }
      });
  }

  handleReset = () => {
    let hash = window.location.search.split("?");
    let token = hash[1];
    axios
      .post(`/user/reset_password/${token}`, {
        clientId: this.state.clientId,
        password: this.props.form.values.password,
        c_password: this.props.form.values.confirmPassword,
      })
      .then(res => {
        console.log(res);
        this.setState({
          message: res.data.result,
        });
        if (res.status === 502) {
          this.goToProfile();
        }
        setTimeout(this.goToProfile, 2000);
      })
      .catch(error => {
        this.setState({ errors: errorMessageParser(error) });
      });
  };

  goToProfile = () => {
    this.setState({
      goToProfile: true,
    });
  };

  render() {
    const { goToProfile } = this.state;
    return (
      <div className="login-form_wrapper">
        {goToProfile ? <Redirect to="/categories" /> : <React.Fragment />}
        <Typography
          variant="h5"
          component="h2"
          style={{ alignSelf: "start", marginBottom: "9px" }}
        >
          Create password
        </Typography>

        <NewPasswordForm onFormSubmit={this.handleReset} />
        <br />

        {this.state.message ? (
          <ResponseMessage message={this.state.message} type="message" />
        ) : null}
        {this.state.errors
          ? this.state.errors.map((item, index) => {
              return <ResponseMessage key={index} message={item} />;
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    form: state.form.new_password_form,
    access_token: state.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  null
)(NewPassword);
