import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Dispatch } from "redux";
import { formNamesConst } from "../../../consts/index";
import { renderInputField } from "./components/customComponents";
import { EditIcon } from "../../../consts/icons";
import { connect } from "react-redux";

const wallet = value =>
  (value && value.length < 3) || (value && /\s/i.test(value))
    ? "Wallet fied length must be greater than or equal to 3 characters long!"
    : undefined;

let FinancialInfoForm = props => {
  return (
    <form className="wallet-inline-wrapper">
      <Field
        name="wallet"
        validate={wallet}
        label="ETH Wallet: *"
        placeholder={props.wallet ? props.wallet : "ETH Wallet #"}
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      {!props.wallet && (
        <a
          href="https://metamask.io/"
          className="create-wallet__btn"
          target="_blank"
        >
          Create wallet
        </a>
      )}
    </form>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      ...ownProps,
    },
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: formNamesConst.FINANCIAL_INFO_FORM,
  })(FinancialInfoForm)
);
