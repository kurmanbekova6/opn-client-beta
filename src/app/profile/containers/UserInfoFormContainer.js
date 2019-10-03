import React from "react";
import UserInfoForm from "../forms/UserInfoForm";
import { connect } from "react-redux";
import { formNamesConst } from "../../../consts/index";

class UserInfoFormContainer extends React.Component {
  state = {
    chief_email: "",
    chief_full_name: "",
    chief_phone: "",
    department: "",
    email: "",
    fact_address: "",
    full_name: "",
    mobile: "",
    phone1: "",
    position: "",
    clientId: "",
    access_token: "",
    companyId: "",
  };

  componentWillUpdate = (nextProps, nextState) => {
    if (nextProps.data !== this.props.data) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    if (this.props.data.length !== 0 && this.props.data.userInfo) {
      const { userInfo } = this.props.data;
      return (
        <UserInfoForm
          chief_email={userInfo.chief ? userInfo.chief.email : null}
          chief_full_name={userInfo.chief ? userInfo.chief.name : null}
          chief_phone={userInfo.chief ? userInfo.chief.phone : null}
          email={userInfo.admin ? userInfo.admin.mail.id : null}
          full_name={userInfo.admin ? userInfo.admin.name : null}
          mobile={userInfo.admin ? userInfo.admin.mobile_phone.number : null}
          position={userInfo.admin ? userInfo.admin.position : null}
        />
      );
    } else {
      return <UserInfoForm />;
    }
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.form.profileForm,
    login: state.loggedIn,
    initialValues: {
      // userId: state.somethere.userId // Can also be calculated using props
    },
  };
};

export default connect(
  mapStateToProps,
  null
)(UserInfoFormContainer);
