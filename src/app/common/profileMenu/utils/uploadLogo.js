import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ProfileLogo from "../../../ui_components/utils/ProfileLogo";
import logo from "../../../../assets/img/icons/ms-icon-144x144.png";

class UploadLogo extends Component {
  state = {
    imgUrl: this.props.imgUrl,
    isLoading: false,
  };
  uploadImage = event => {
    this.setState({ logoIsLoading: true });
    event.preventDefault();
    let formData = new FormData();
    formData.append("img", event.target.files[0]);
    formData.append("access_token", this.props.access_token);
    formData.append("clientId", this.props.clientId);
    axios
      .post("/file/public/img", formData)
      .then(res => {
        if (res.status === 200) {
          this.saveImg(res.data.result.url);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getHash = href => {
    let path = href.split("/");
    let res = path[path.length - 1];
    return res;
  };

  saveImg = imgUrl => {
    let hashName = this.getHash(imgUrl);
    // this.props.change("logo", hashName);
    // this.setState({
    //   logo: imgUrl,
    //   logoIsLoading: false,
    // });

    axios
      .put("/company/logo", {
        access_token: this.props.access_token,
        clientId: this.props.clientId,
        imageId: hashName,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            logo: imgUrl,
            logoIsLoading: false,
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ logoIsLoading: false });
      });
  };

  render() {
    return (
      <Fragment>
        <ProfileLogo
          src={this.state.imgUrl}
          linkUrl=""
          linkText=""
          alt="Company Logo"
          customClass="bordered-logo"
          isLoading={this.state.isLoading}
        />
        <br />
        <label className="register-company__img-button">
          Upload logo (150 Kb)
          <input type="file" hidden onChange={this.uploadImage} />
        </label>
      </Fragment>
    );
  }
}

const mapStatToProps = state => ({
  access_token: state.token,
  clientId: state.clientId,
});
export default connect(mapStatToProps)(UploadLogo);
