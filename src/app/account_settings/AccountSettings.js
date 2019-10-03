import React, { Component } from "react";
import AccountSettingsTabSelector from "./AccountSettingsTabSelector";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../common/spinner/Spinner";
import AccountSettingsCompany from "./AccountSettingsCompany";
import AccountSettingsModal from "./modal/AccountSettingsModal";
import countriesList from "../../consts/countries";
import AccountSettingsPersonal from "./AccountSettingsPersonal";
import { errorMessageParser } from "../utils/errorMessageParser";

class AccountSettings extends Component {
  state = {
    selectedTab: "company",
    profileInfo: {
      documents: [],
      logo_url: "",
      companyInfo: {
        companyName: "",
        companyDescription: "",
        country: "",
        address: "",
        email: "",
        phone1: "",
        site: "",
      },
      personalInfo: {
        fullName: "",
        userEmail: "",
        position: "",
        userPhone: "",
      },
    },
    isLoading: true,
    openModal: false,
    textField: { name: "", label: "" },
    errors: [],
  };

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/login");
    }

    this.getProfileInfo();
  }

  getProfileInfo = () => {
    axios
      .post("/company/info/all", {
        access_token: this.props.access_token,
        clientId: this.props.clientId,
      })
      .then(res => {
        if (res.status === 200) {
          const { result } = res.data;

          this.setState({
            profileInfo: {
              documents: result.profile.documents || [],
              logo_url: result.profile.logo_url || "",
              companyInfo: {
                companyName: result.profile.name || "",
                companyDescription: result.profile.description || "",
                country: result.profile.location.country || "",
                address: result.profile.location.address || "",
                email: result.profile.contacts.email || "",
                phone1: result.profile.contacts.phone1 || "",
                site: result.profile.contacts.site || "",
              },
              personalInfo: {
                fullName: result.userInfo.admin.name || "",
                userEmail: result.userInfo.admin.mail.id || "",
                position: result.userInfo.admin.position || "",
                userPhone: result.userInfo.admin.mobile_phone.number || "",
              },
            },
            isLoading: false,
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };
  putProfileInfo = data => {
    let api = "/company";
    if (data.profile === undefined) {
      api = "/user";
    }
    axios
      .put(api, {
        ...data,
        access_token: this.props.access_token,
        clientId: this.props.clientId,
      })
      .then(res => {
        this.getProfileInfo();
        this.setOpenModal(false);
      })
      .catch(error => {
        console.log(
          "%c putProfileInfo ERROR:",
          "color: orange",
          error.response
        );
        this.setState(
          () => ({ errors: errorMessageParser(error) }),
          () => {
            console.log(
              "%c Errs in state",
              "color: magenta;",
              this.state.errors
            );
          }
        );
      });
  };

  editTextField = (name, label, value) => {
    this.setState({
      textField: {
        name,
        label,
        value,
      },
      openModal: true,
    });
  };

  setSelectedTab = tabName => {
    this.setState({ selectedTab: tabName });
  };
  setOpenModal = open => {
    this.setState({ openModal: open, errors: [] });
  };
  getCountryCode = name => {
    let country = countriesList.find(item => {
      return item.name === name;
    });
    if (country) {
      return country.code;
    }
    return name;
  };
  onFormSubmit = values => {
    let data;
    switch (Object.keys(values)[0]) {
      case "companyName":
        data = { profile: { name: values.companyName } };
        break;
      case "companyDescription":
        data = { profile: { description: values.companyDescription } };
        break;
      case "country":
        data = {
          profile: {
            location: {
              country: values.country,
              JurisdictionOfIncorporation: values.jurisdiction || null,
            },
          },
        };
        break;
      case "address":
        data = { profile: { location: { address: values.address } } };
        break;
      case "email":
        data = { profile: { contacts: { email: values.email } } };
        break;
      case "phone1":
        data = { profile: { contacts: { phone1: values.phone1 } } };
        break;
      case "site":
        data = { profile: { contacts: { site: values.site } } };
        break;
      case "fullName":
        data = { name: values.fullName };
        break;
      case "userPhone":
        data = { mobile_phone: values.userPhone };
        break;
      case "userEmail":
        data = { email: values.userEmail };
        break;
      case "position":
        data = { position: values.position };
        break;
      case "password":
        data = {
          password: {
            value: values.password,
            // repeat: values.cPassword
          },
        };
        break;
    }
    this.putProfileInfo(data);
  };
  render() {
    const {
      profileInfo: { documents, logo_url, companyInfo, personalInfo },
      openModal,
      textField,
      errors,
    } = this.state;
    return (
      <div className="account-settings">
        <AccountSettingsTabSelector
          selected={this.state.selectedTab}
          setSelectedTab={this.setSelectedTab}
        />
        {this.state.isLoading ? (
          <div className="account-settings__info">
            <Spinner />
          </div>
        ) : this.state.selectedTab === "company" ? (
          <AccountSettingsCompany
            logo_url={logo_url}
            companyInfo={companyInfo}
            documents={documents}
            editTextField={this.editTextField}
            access_token={this.props.access_token}
            clientId={this.props.clientId}
            getProfileInfo={this.getProfileInfo}
          />
        ) : this.state.selectedTab === "personal" ? (
          <AccountSettingsPersonal
            personalInfo={personalInfo}
            documents={documents}
            editTextField={this.editTextField}
          />
        ) : null}
        <AccountSettingsModal
          openModal={openModal}
          setOpenModal={this.setOpenModal}
          textField={textField}
          initialValues={
            textField.name === "country"
              ? { [textField.name]: this.getCountryCode(textField.value) }
              : { [textField.name]: textField.value }
          }
          onFormSubmit={this.onFormSubmit}
          errors={errors}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    access_token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
  };
};

export default connect(mapStateToProps)(AccountSettings);
