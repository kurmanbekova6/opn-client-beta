import React from "react";
import { connect } from "react-redux";
import { formNamesConst } from "../../../consts/index";
import CompanyInfoForm from "../forms/CompanyInfoForm.js";

class CompanyInfoFormContainer extends React.Component {
  state = {
    name: "",
    address: "",
    country: "",
    description: "",
    email: "",
    phone1: "",
    phone2: "",
    site: "",
    zip: "",
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
    if (this.props.data.length !== 0) {
      return (
        <CompanyInfoForm
          name={this.props.data.profile.name}
          address={this.props.data.profile.location.address}
          country={this.props.data.profile.location.country}
          description={this.props.data.profile.description}
          email={this.props.data.profile.contacts.email}
          phone1={this.props.data.profile.contacts.phone1}
          site={this.props.data.profile.contacts.site}
        />
      );
    } else {
      return <CompanyInfoForm />;
    }
  }
}

const mapStateToProps = state => {
  return {
    companyInfo: state.form.profileForm,
    login: state.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  null
)(CompanyInfoFormContainer);
