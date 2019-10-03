import React, { Component, Fragment } from "react";
import { Field, formValues } from "redux-form";
import { withRouter } from "react-router";
import { MaterialOutlinedInput } from "../../ui_components/materialBased/materialBasedInputs";
import { MaterialWalletInput } from "../../ui_components/materialBased/materialBasedWalletInput";
import { Typography } from "@material-ui/core";
import "../RegisterCompany.scss";
import {
  MaterialPrimaryButton,
  MaterialVerifiedButton,
} from "../../ui_components/materialBased/materialBasedButtons";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { MaterialOutlinedSelect } from "../../ui_components/materialBased/materialBasedSelectInputs";
import countries from "../../../consts/countries.js";
import MenuItem from "@material-ui/core/MenuItem";

class CompanyInfo extends Component {
  state = {
    warnOffset: "-150px",
  };
  onNextClick = () => {
    if (this.props.valid) {
      this.props.setStep("PersonalInfo");
    }
  };
  render() {
    return (
      <Fragment>
        <div className="signup-caption-container">
          <Typography
            variant="h5"
            component="h2"
            style={{ alignSelf: "start", marginBottom: "9px" }}
          >
            Company info
          </Typography>
          <Typography
            variant="caption"
            component="h2"
            color="primary"
            style={{
              fontWeight: 900,
              alignSelf: "flex-end",
              marginBottom: "9px",
            }}
          >
            STEP 2/3
          </Typography>
        </div>
        <Field
          name="companyName"
          label="Company name"
          component={MaterialOutlinedInput}
          type="text"
        />
        <Field
          name="companyDescription"
          label="Company description"
          component={MaterialOutlinedInput}
          type="text"
          multiline
          rows="4"
          maxSymbols={80}
        />
        <Divider variant="fullWidth" style={{ marginBottom: "24px" }} />
        <Field
          name="country"
          label="Country"
          component={MaterialOutlinedSelect}
          type="text"
          placeholder="Select country"
          menuItems={countries}
        />
        {this.props.countryValue === "US" ||
        this.props.countryValue === "CA" ? (
          <Field
            name="jurisdiction"
            label="Jurisdiction Of Incorporation"
            component={MaterialOutlinedInput}
            type="text"
          />
        ) : null}
        <Field
          name="address"
          label="Address"
          component={MaterialOutlinedInput}
          type="text"
        />
        <Field
          name="email"
          label="Company Email"
          component={MaterialOutlinedInput}
          type="text"
        />
        {/*********ETH WALLET FIELD START *************/}
        {/*<Divider variant="fullWidth" />*/}
        {/*<Field*/}
        {/*  name="wallet"*/}
        {/*  label="Wallet Ethereum ERC20"*/}
        {/*  component={MaterialWalletInput}*/}
        {/*  type="text"*/}
        {/*/>*/}
        {/*********ETH WALLET FIELD END *************/}
        <MaterialVerifiedButton
          label="YES, THIS IS MY COMPANY"
          type="button"
          onClick={this.onNextClick}
          disabled={!this.props.valid}
        />
        <Button
          className="register-company_skip-button"
          onClick={e => {
            e.preventDefault();
            this.props.setRegCompFormSkipped();
            this.props.history.push("/categories");
          }}
        >
          SKIP THIS STEP
        </Button>
      </Fragment>
    );
  }
}
export default withRouter(CompanyInfo);
