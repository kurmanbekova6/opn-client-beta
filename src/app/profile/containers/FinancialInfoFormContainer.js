import React from "react";
import { connect } from "react-redux";
import FinancialInfoForm from "../forms/FinancialInfoForm";

class FinancialInfoFormContainer extends React.Component {
  state = {
    wallet: "",
    balance: "",
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
    return (
      <FinancialInfoForm
        wallet={
          this.props.data && this.props.data.wallet
            ? this.props.data.wallet
            : null
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    financialInfo: state.form.profileForm,
    login: state.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  null
)(FinancialInfoFormContainer);
