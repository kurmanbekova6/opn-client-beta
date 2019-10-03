import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Menu from "../../common/menu/Menu";
import MenuWorkspace from "../../common/menu/MenuWorkspace";
import LoginPanel from "./LoginPanel";
import LogoutPanel from "./LogoutPanel";
import UserPanel from "./UserPanel";

// import logo from "../../../assets/img/logo_opn.png";
import logo from "../../../assets/img/logo_opn_beta.svg";

import "./css/header.scss";

function Header(props) {
  const { loginStatus, loggedIn } = props;
  return (
    <div className="header">
      <Link to="/" className="logo__wrapper">
        <img className="logo" src={logo} />
      </Link>
      {loginStatus ? <MenuWorkspace /> : <Menu />}

      {!loginStatus || loggedIn === {} ? (
        <LoginPanel />
      ) : (
        <div className="header-panel-wrapper">
          <UserPanel
            companyName={
              loggedIn !== []
                ? loggedIn.data !== undefined
                  ? loggedIn.data.result.company_name
                  : ""
                : ""
            }
          />
          <LogoutPanel />
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus,
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps)(Header);
