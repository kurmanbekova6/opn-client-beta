import React, { Component } from "react";
import { Field } from "redux-form";
import { renderInputUnderlined } from "../../ui_components/utils/inputsStyled/inputsStyled";

class AdditionalInfo extends Component {
  render() {
    const { submitting } = this.props;

    return (
      <div className="register-company__form-container">
        <div className="register-company__form-column">
          <div className="register-company__form">
            <Field
              name="companyPhone"
              label="Company phone (optional)"
              component={renderInputUnderlined}
              type="text"
            />
            <Field
              name="companySite"
              label="Company site (optional)"
              component={renderInputUnderlined}
              type="text"
            />
            <Field
              name="companyFacebook"
              label=" company profile (optional)"
              component={renderInputUnderlined}
              type="text"
              addonBefore="facebook"
            />
            <Field
              name="companyLinkedIn"
              label=" company profile (optional)"
              component={renderInputUnderlined}
              type="text"
              addonBefore="linkedin"
            />
            <div className="register-company__form-buttons-container">
              <button
                className="register-company__form-button"
                type="submit"
                disabled={submitting}
              >
                save
              </button>
              <button
                className="register-company__form-button"
                onClick={() => this.props.setStep("PersonalInfo")}
              >
                back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdditionalInfo;
