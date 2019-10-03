import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./css/deals-chat-message.scss";
// Material UI
import IconButton from "@material-ui/core/IconButton";
import AttachFile from "@material-ui/icons/AttachFile";

class DropdownChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: [],
      docUrl: [],
    };
  }

  uploadDoc = event => {
    event.preventDefault();
    let docData = new FormData();
    docData.append("access_token", this.props.token);
    docData.append("clientId", this.props.clientId);
    let files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      docData.append("doc", file);
      docData.append("name", file.name);
    }
    axios
      .post("/file/public/doc", docData)
      .then(res => {
        this.setState(
          {
            docUrl: [...this.state.docUrl, res.data.result._id],
          },
          this.sendDocs
        );
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

  getDocuments = () => {
    axios
      .post(`/file/my/doc`, {
        clientId: this.props.clientId,
        access_token: this.props.token,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState(
            {
              documents: res.data.result,
            },
            this.sendDocs
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendDocs = () => {
    axios
      .post(`/msg/send`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
        attachments: this.state.docUrl,
        chat: this.props.chat.id,
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="chat-message_files">
        <IconButton
          aria-label="More"
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          style={{ outline: "none" }}
        >
          <label className="chat-message_files_upload-zone">
            <AttachFile style={{ color: "#80868b" }} />
            <input
              className="upload-doc_input"
              type="file"
              id="img"
              onChange={this.uploadDoc}
            />
          </label>
        </IconButton>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
  };
};

export default connect(
  mapStateToProps,
  null
)(DropdownChatInput);
