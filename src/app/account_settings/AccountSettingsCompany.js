import React, { Component } from "react";
import Documents from "./Documents";
import AccountSettingsLogo from "./AccountSettingsLogo";
import AccountSettingsItem from "./AccountSettingsItem";
import countriesList from "../../consts/countries";
import axios from "axios";

class AccountSettingsCompany extends Component {
  state = {};
  uploadImg = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("img", event.target.files[0]);
    formData.append("access_token", this.props.access_token);
    formData.append("clientId", this.props.clientId);
    this.setState({
      logo: event.target.files[0].name,
    });
    axios.post("/file/public/img", formData).then(res => {
      if (res.status === 200) {
        this.saveImg(res.data.result.url);
      }
    });
  };

  getHash = href => {
    let path = href.split("/");
    let res = path[path.length - 1];
    return res;
  };

  saveImg = imgUrl => {
    let url = this.getHash(imgUrl);
    axios
      .put("/company/logo", {
        access_token: this.props.access_token,
        clientId: this.props.clientId,
        imageId: url,
      })
      .then(res => {
        if (res.status === 200) {
          this.props.getProfileInfo();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  removeDocument = () => {};
  getCountry = code => {
    let country = countriesList.find(item => {
      return item.code === code;
    });
    if (country) {
      return country.name;
    }
    return code;
  };
  uploadDoc = event => {
    event.preventDefault();
    var docData = new FormData();
    docData.append("doc", event.target.files[0]);
    docData.append("access_token", this.props.access_token);
    docData.append("clientId", this.props.clientId);
    docData.append("name", event.target.files[0].name);
    axios.post("/file/public/doc", docData).then(res => {
      this.saveDoc(res.data.result._id);
    });
  };

  saveDoc = documentId => {
    axios
      .put("/company/document", {
        access_token: this.props.access_token,
        clientId: this.props.clientId,
        documentId,
      })
      .then(res => {
        if (res.status === 200) {
          this.props.getProfileInfo();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {
      logo_url,
      companyInfo,
      documents,
      editTextField,
      access_token,
      clientId,
    } = this.props;
    return (
      <div className="account-settings__company">
        <AccountSettingsLogo logo_url={logo_url} editLogo={this.uploadImg} />
        <AccountSettingsItem
          name="companyName"
          label="Company name"
          value={companyInfo.companyName}
          editField={editTextField}
        />
        <AccountSettingsItem
          name="companyDescription"
          label="Description"
          value={companyInfo.companyDescription}
          editField={editTextField}
        />
        <AccountSettingsItem
          name="country"
          label="Country"
          value={this.getCountry(companyInfo.country)}
          editField={editTextField}
        />
        <AccountSettingsItem
          name="address"
          label="Address"
          value={companyInfo.address}
          editField={editTextField}
        />
        <AccountSettingsItem
          name="email"
          label="Company Email"
          value={companyInfo.email}
          editField={editTextField}
        />
        <AccountSettingsItem
          name="phone1"
          label="Phone"
          value={companyInfo.phone1}
          editField={editTextField}
        />
        <AccountSettingsItem
          name="site"
          label="Website"
          value={companyInfo.site}
          editField={editTextField}
        />
        <Documents
          documents={documents}
          removeDocument={this.removeDocument}
          access_token={access_token}
          clientId={clientId}
          uploadDoc={this.uploadDoc}
        />
      </div>
    );
  }
}

export default AccountSettingsCompany;
