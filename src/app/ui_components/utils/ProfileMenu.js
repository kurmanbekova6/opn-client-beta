import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveProfileMenuItem } from "../../../redux/actions/profileMenuActions";
import { loginStatus, loginUser } from "../../../redux/actions/userActions";

class ProfileMenu extends React.Component {
  handleClick = () => {
    if (this.props.id === 8) {
      this.props.changeLoginStatus(false);
      this.props.clearLogin({});
    } else {
      this.props.setActive(this.props.id);
    }
  };

  render() {
    const { href, text, active } = this.props;
    return (
      <div>
        <Link
          to={href}
          onClick={this.handleClick}
          className={
            active
              ? "profile-menu-item profile-menu-item__active"
              : "profile-menu-item"
          }
        >
          {text}
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActive: id => {
      dispatch(setActiveProfileMenuItem(id));
    },
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
)(ProfileMenu);
