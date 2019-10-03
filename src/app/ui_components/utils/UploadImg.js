import React, { Component } from "react";
import axios from "axios";

class UploadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      clientId: "",
    };
  }

  /* Getting clientId prop */
  componentDidMount = () => {
    axios
      .get("/client/id")
      .then(res => {
        this.setState({
          clientId: res.data.result.clientId,
        });
      })
      .catch(err => console.log(err));
  };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    axios
      .put("/company/logo", {
        access_token: this.props.access_token,
        clientId: this.state.clientId,
        imageId: this.state.selectedFile,
        company_id: this.props.companyId,
      })
      .then(res => console.log(res));
  };

  render() {
    return (
      <div className="uploadLogo">
        <input
          type="file"
          name="logo"
          onChange={this.fileChangedHandler}
          className="inputField"
        />
        <button className="login-form-button" onClick={this.uploadHandler}>
          Upload!
        </button>
      </div>
    );
  }
}

export default UploadImg;
