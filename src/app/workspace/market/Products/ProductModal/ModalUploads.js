import React, { useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
// Material Ui
import { FileUploadIcon } from "../../../../ui_components/iconComponents/FileUploadIcon";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// Assets
import "../css/uploadsInputs.scss";
import pdf from "../img/pdf.png";
import doc from "../img/doc.png";
// Errors
import { errorMessageParser } from "../../../../utils/errorMessageParser";
import ResponseMessage from "../../../../ui_components/responseMessage/ResponseMessage";

class ModalUploads extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePreviewUrl: [],
      uploatedImgs: [],
      docUrl: [],
      documentsName: [],
      showErrorImage: [],
      showErrorDoc: [],
    };

    this.uploadImges = this.uploadImges.bind(this);
  }

  clear = () => {
    if (this.state.showErrorImage !== []) {
      this.setState({
        showErrorImage: [],
      });
    }
    if (this.state.showError !== []) {
      this.setState({
        showErrorDoc: [],
      });
    }
  };

  uploadImges = event => {
    this.clear();
    console.log(event.target);
    let formData = new FormData();
    formData.append("access_token", this.props.token);
    formData.append("clientId", this.props.clientId);
    let files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append("img", file);
    }
    axios
      .post("/file/public/img", formData)
      .then(res => {
        if (res.status === 200) {
          this.setState(
            {
              imagePreviewUrl: [
                ...this.state.imagePreviewUrl,
                res.data.result.url,
              ],
              uploatedImgs: [
                ...this.state.uploatedImgs,
                this.getHash(res.data.result.url),
              ],
            },
            () => this.props.setImages(this.state.uploatedImgs)
          );
        }
      })
      .catch(error => {
        this.setState({
          showErrorImage: errorMessageParser(error),
        });
      });
  };

  uploadDoc = event => {
    this.clear();
    event.preventDefault();
    let docData = new FormData();
    docData.append("access_token", this.props.token);
    docData.append("clientId", this.props.clientId);
    let files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log(file);
      docData.append("doc", file);
      docData.append("name", file.name);
      this.setState({
        documentsName: [...this.state.documentsName, file.name],
      });
    }
    axios
      .post("/file/public/doc", docData)
      .then(res => {
        this.setState(
          {
            docUrl: [...this.state.docUrl, res.data.result._id],
          },
          () => this.props.setDocuments(this.state.docUrl)
        );
      })
      .catch(error => {
        this.setState({
          showErrorDoc: errorMessageParser(error),
        });
      });
  };

  getHash = href => {
    let path = href.split("/");
    let res = path[path.length - 1];
    return res;
  };

  render() {
    const {
      imagePreviewUrl,
      documentsName,
      showErrorImage,
      showErrorDoc,
    } = this.state;
    return (
      <div>
        <div className="upload-img_holder">
          {imagePreviewUrl.length !== 0 ? (
            <div
              className="upload-img"
              style={{ background: `url(${imagePreviewUrl[0]})` }}
            />
          ) : (
            <div className="upload-img" style={{ background: "#f0eff1" }} />
          )}

          <div className="upload-img-container">
            <label className="upload-img_upload-zone">
              <FileUploadIcon className="upload-img_icon" />
              <input
                className="upload-img_input"
                type="file"
                id="img"
                onChange={this.uploadImges}
              />
            </label>
            {imagePreviewUrl.length !== 0
              ? imagePreviewUrl.map((img, i) => (
                  <div className="upload-img_mini" key={i}>
                    <img src={img} alt="prod img" />
                  </div>
                ))
              : null}
          </div>
          {showErrorImage.length !== 0
            ? showErrorImage.map((error, i) => (
                <ResponseMessage
                  key={i}
                  textAlign="center"
                  message={error}
                  type="error"
                />
              ))
            : null}
        </div>
        <div className="upload-document_holder">
          <div className="upload-document-container">
            <div className="upload-document_name">Documents</div>
            {documentsName.length !== 0
              ? documentsName.map((name, i) => (
                  <div className="upload-document_file-container" key={i}>
                    <div className="upload-document_file-type">
                      {name.split(".")[1] === "pdf" ? (
                        <img src={pdf} alt="pdf" />
                      ) : (
                        <img src={doc} alt="doc" />
                      )}
                      <p className="upload-document_file-type-name">
                        {name.split(".")[1]}
                      </p>
                    </div>
                    <div className="upload-document_file-name">
                      {name.split(".")[0]}
                    </div>
                    <MoreHorizIcon />
                  </div>
                ))
              : null}
            {showErrorDoc.length !== 0
              ? showErrorDoc.map((error, i) => (
                  <ResponseMessage
                    key={i}
                    textAlign="center"
                    message={error}
                    type="error"
                  />
                ))
              : null}
            <label className="upload-document_upload-zone">
              <div className="upload-document_content">
                <FileUploadIcon
                  className="upload-document_icon"
                  style={{ marginRight: 6 }}
                />
                <p>Upload document</p>
              </div>
              <input
                type="file"
                className="upload-document_input"
                onChange={this.uploadDoc}
                name="file"
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ModalUploads);
