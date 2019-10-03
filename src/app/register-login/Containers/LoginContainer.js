import React from "react";
import { connect } from "react-redux";

import { loginUser } from "../../../redux/actions/userActions";
import Login from "../Login";

class LoginFormContainer extends React.Component {
  render() {
    return <Login />;
  }
}

const mapStateToProps = state => {
  return {
    loginForm: state.form.loginForm,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userInformation: payload => {
      dispatch(loginUser(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
