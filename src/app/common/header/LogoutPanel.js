import React from "react";

import { logOut } from "react-icons-kit/ionicons/logOut";
import { colorsConst } from "../../../consts/index";
import Icon from "react-icons-kit";
import { loginStatus, loginUser } from "../../../redux/actions/userActions";
import { connect } from "react-redux";

function LogoutPanel(props) {
  const logout = () => {
    props.changeLoginStatus(false);
    props.clearLogin({});
  };
  return null;
  // (
  //   {/*<div className="login-wrapper">*/}
  //   {/*  <div className="login-btn-wrapper" onClick={() => logout()}>*/}
  //   {/*    <button className="logout-btn">log out</button>*/}
  //   {/*    <Icon style={{ color: colorsConst.DANUBE }} icon={logOut} size={20} />*/}
  //   {/*  </div>*/}
  //   {/*</div>*/}
  // );
}

const mapDispatchToProps = dispatch => {
  return {
    changeLoginStatus: payload => {
      dispatch(loginStatus(payload));
    },
    clearLogin: payload => {
      dispatch(loginUser(payload));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogoutPanel);
