import React, { Component, Fragment } from "react";
import { Field } from "redux-form";
import "../RegisterCompany.scss";
import { MaterialOutlinedInput } from "../../ui_components/materialBased/materialBasedInputs";
import { Typography } from "@material-ui/core";
import { MaterialVerifiedButton } from "../../ui_components/materialBased/materialBasedButtons";
import Button from "@material-ui/core/Button";

class PersonalInfo extends Component {
  onNextClick = () => {
    if (this.props.valid) {
      this.props.setStep("AdditionalInfo");
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
            Personal info
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
            STEP 3/3
          </Typography>
        </div>
        <Field
          name="userName"
          label="Full name"
          component={MaterialOutlinedInput}
          type="text"
        />
        <Field
          name="userEmail"
          label="Corporate email address"
          component={MaterialOutlinedInput}
          type="text"
        />
        <Field
          name="userPosition"
          label="Position"
          component={MaterialOutlinedInput}
          type="text"
        />
        <MaterialVerifiedButton
          label="CONFIRM"
          type="submit"
          disabled={!this.props.valid}
        />

        <Button
          color="#aaaaaa"
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
export default PersonalInfo;
