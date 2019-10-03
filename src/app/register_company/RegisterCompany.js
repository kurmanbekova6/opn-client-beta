import React, { Component, Fragment } from "react";
/* import forms */
import CompanyInfo from "./forms/CompanyInfo";
import PersonalInfo from "./forms/PersonalInfo";

import axios from "axios";
import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import validateFunc from "./forms/formValidation";
import Info from "./forms/Info";
import { Redirect } from "react-router-dom";

import countriesList from "../../consts/countries";
import {
  loginUser,
  hubspotData,
  setRegCompFormSkipped,
} from "../../redux/actions/userActions";

import "./RegisterCompany.scss";

class RegisterCompany extends Component {
  state = {
    activeStep: "CompanyInfo",
    errors: [],
    message: "",
    isLoading: true,
    clientId: "",
  };
  componentDidMount = () => {
    this.fillFormFromHubspot();
  };
  fillFormFromHubspot = () => {
    const { change } = this.props;
    axios
      .post("/company/profile/sync", {
        clientId: this.props.clientId,
        access_token: this.props.token,
      })
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          if (res.data && res.data.result) {
            this.props.hubspotData(res.data.result);
            const result = res.data.result;
            if (result.name) {
              change("companyName", result.name);
            }
            if (result.description) {
              change("companyDescription", result.description);
            }
            if (result.location.country) {
              change("country", result.location.country);
            }
            if (result.location.JurisdictionOfIncorporation) {
              change(
                "jurisdiction",
                result.location.JurisdictionOfIncorporation
              );
            }
            if (result.location.address) {
              change("address", result.location.address);
            }
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  // Clear messages and errors
  clear = () => {
    this.setState({ errors: [], message: "", isLoading: true });
  };

  setStep = step => {
    this.setState({ activeStep: step });
  };
  // getCountryCode = name => {
  //   let country = countriesList.find(item => {
  //     return item.name === name;
  //   });
  //   if (country) {
  //     return country.code;
  //   }
  //   return name;
  // };
  //
  onFormSubmit = values => {
    this.clear();
    this.setStep("Info");
    const {
      companyName,
      companyDescription,
      country,
      address,
      jurisdiction,
      email,
      userName,
      userPosition,
      userEmail,
      wallet,
      companyPhone,
      site,
      companyFacebook,
      companyLinkedIn,
    } = values;

    const data = {
      clientId: this.props.clientId,
      access_token: this.props.token,
      profile: {
        contacts: { email, phone1: companyPhone, site },
        location: {
          country: getCountryCode(country) || country,
          address,
          JurisdictionOfIncorporation: jurisdiction,
        },
        name: companyName,
        description: companyDescription,
        facebook: companyFacebook,
        linkedin: companyLinkedIn,
      },
      userInfo: {
        name: userName,
        position: userPosition,
        email: userEmail,
      },
      //************* ETH wallet**********//
      // financialInfo: {
      //   wallet,
      // },
      //************* ETH wallet**********//
    };
    /* Request */
    axios
      .put("/company", data)
      .then(res => {
        if (res.status === 200) {
          if (window.location.host === "opnplatform.com") {
            /* intercom event */
            window.Intercom("update", {
              app_id: "ulueqf5y",
              name: this.props.loggedIn.data.result.name, // Full name
              email: this.props.loggedIn.data.result.mail.id, // Email address
              "Button clicked": "Submit the profile",
            });
          }

          this.updateStore();
          this.setState({ message: "Saved successfully", isLoading: false });
          /* Reset form */
          this.props.reset("registerCompanyForm");
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.error_message) {
            if (typeof error.response.data.error_message !== "string") {
              error.response.data.error_message.map(err => {
                if (err.message) {
                  this.setState(state => ({
                    errors: [...state.errors, err.message],
                    isLoading: false,
                  }));
                }
              });
            } else {
              this.setState(state => ({
                errors: [...state.errors, error.response.data.error_message],
                isLoading: false,
              }));
            }
          } else {
            this.setState({ errors: ["Error"], isLoading: false });
            console.log(error);
          }
        } else {
          this.setState({ errors: [error.message], isLoading: false });
          console.log(error);
        }
      });
  };
  updateStore = () => {
    axios
      .post(`/user/lookup`, {
        clientId: this.props.clientId,
        access_token: this.props.token,
      })
      .then(res => {
        this.props.userInformation(res);
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    const { handleSubmit, valid, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <Fragment>
        <div className="register-company_container">
          <form onSubmit={handleSubmit(this.onFormSubmit)}>
            {this.state.activeStep === "CompanyInfo" ? (
              <CompanyInfo
                {...this.props}
                setStep={this.setStep}
                countryValue={this.props.countryValue}
                setRegCompFormSkipped={this.props.setRegCompFormSkipped}
              />
            ) : (
              <Fragment />
            )}
            {this.state.activeStep === "PersonalInfo" ? (
              <PersonalInfo
                {...this.props}
                setStep={this.setStep}
                setRegCompFormSkipped={this.props.setRegCompFormSkipped}
              />
            ) : (
              <Fragment />
            )}
            {this.state.activeStep === "Info" ? (
              <Info
                message={this.state.message}
                errors={this.state.errors}
                isLoading={this.state.isLoading}
                setStep={this.setStep}
                userInformation={this.props.userInformation}
              />
            ) : (
              <Fragment />
            )}
          </form>
        </div>
      </Fragment>
    );
  }
}

const getCountry = code => {
  let country = countriesList.find(item => {
    return item.code === code;
  });
  if (country) {
    return country.name;
  }
  return code;
};
const getCountryCode = name => {
  let country = countriesList.find(item => {
    return item.name === name;
  });
  if (country) {
    return country.code;
  }
  return name;
};

const mapStateToProps = state => {
  if (state.loggedIn && state.loggedIn.data) {
    return {
      clientId: state.clientId,
      token: state.token,
      loggedIn: state.loggedIn,
      isLoggedIn: state.loginStatus,
      initialValues: {
        companyName:
          (!!state.loggedIn.data.result.company_name &&
            state.loggedIn.data.result.company_name) ||
          state.hubspotData.name,
        companyDescription: state.hubspotData.description,
        userName: state.loggedIn.data.result.name,
        userEmail: state.loggedIn.data.result.mail.id,
        country:
          getCountryCode(state.loggedIn.data.result.country) ||
          (state.hubspotData.location && state.hubspotData.location.country),
      },
      countryValue: countrySelector(state, "country"),
    };
  }
  return {
    loggedIn: state.loggedIn,
    isLoggedIn: state.loginStatus,
    clientId: state.clientId,
    token: state.token,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userInformation: payload => {
      dispatch(loginUser(payload));
    },
    hubspotData: payload => {
      dispatch(hubspotData(payload));
    },
    setRegCompFormSkipped: () => {
      dispatch(setRegCompFormSkipped());
    },
  };
};
const countrySelector = formValueSelector("registerCompanyForm");
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "registerCompanyForm",
    validate: validateFunc,
  })(RegisterCompany)
);
