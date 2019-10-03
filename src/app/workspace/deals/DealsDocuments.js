import React from "react";
import { connect } from "react-redux";
import axios from "axios";
// Components
import DealsDocument from "./DealsDocument";
import Add from "@material-ui/icons/Add";
import "./css/deals-documents.scss";
// Errors
import { errorMessageParser } from "../../utils/errorMessageParser";
import ResponseMessage from "../../ui_components/responseMessage/ResponseMessage";
class DealsDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null,
      documents: [],
      documentsName: [],
      docUrl: [],
      showErrorDoc: [],
    };
  }

  componentDidMount() {
    if (this.props.chat) {
      this.getDocuments();
    }
  }

  getDocuments = () => {
    axios
      .post(`/msg/chat/attachments`, {
        clientId: this.props.clientId,
        access_token: this.props.token,
        chat: this.props.chat.id,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            documents: res.data.result,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

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
          () => this.setDocuments(this.state.docUrl)
        );
      })
      .catch(error => {
        this.setState({
          showErrorDoc: errorMessageParser(error),
        });
      });
  };

  setDocuments = () => {
    axios
      .post(`/msg/send`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
        attachments: this.state.docUrl,
        chat: this.props.chat.id,
      })
      .then(res => {
        if (res.status === 200) {
          this.getDocuments();
          this.props.refreshData(this.props.chat.id);
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

  render() {
    const { documents, showErrorDoc } = this.state;
    const { chat, currUser } = this.props;
    if (chat !== null) {
      return (
        <ul className="deals-documents">
          {showErrorDoc.length > 0
            ? showErrorDoc.map((error, i) => (
                <ResponseMessage
                  key={i}
                  textAlign="center"
                  message={error}
                  type="error"
                />
              ))
            : null}
          <li className="deals-documents_upload">
            <label className="deals-documents_upload-zone">
              <div className="deals-documents_upload_content">
                <Add className="deals-documents_upload_icon" />
                <p>Add document</p>
              </div>
              <input
                type="file"
                className="deals-documents_upload_input"
                onChange={this.uploadDoc}
                name="file"
              />
            </label>
          </li>
          {this.state.documents.length !== 0 ? (
            documents.map((doc, id) => (
              <DealsDocument key={id} doc={doc} currUser={currUser} />
            ))
          ) : (
            <div className="deals-documents__empty">
              <div className="deals-documents__empty-title">Notification</div>
              <div className="deals-documents__empty-body">
                You have no documents
              </div>
            </div>
          )}
        </ul>
      );
    } else {
      return (
        <div className="deals-documents__empty">
          <div className="deals-documents__empty-title">Notification</div>
          <div className="deals-documents__empty-body">Please, select chat</div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
  };
};

export default connect(mapStateToProps)(DealsDocuments);
