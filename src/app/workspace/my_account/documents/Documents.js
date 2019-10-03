import React from "react";
import { connect } from "react-redux";
import { loginStatus } from "../../../../redux/actions/userActions";
import axios from "axios";
import { Redirect } from "react-router-dom";
import DocumentItem from "./DocumentItem";
import { MaterialPrimaryButton } from "../../../ui_components/materialBased/materialBasedButtons";
import "./css/documents.scss";
// Errors
import { errorMessageParser } from "../../../utils/errorMessageParser";
import ResponseMessage from "../../../ui_components/responseMessage/ResponseMessage";
class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      errors: [],
    };
  }

  componentDidMount() {
    this.getDocuments();
  }

  getDocuments = () => {
    axios
      .post(`/file/my/doc`, {
        clientId: this.props.clientId,
        access_token: this.props.token !== "" ? this.props.token : "",
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
        if (error.response.status === 401) {
          this.props.changeLoginStatus(false);
        } else {
          this.setState({
            errors: errorMessageParser(error),
          });
        }
      });
  };

  addDocument = doc => {
    var formData = new FormData();
    formData.append("access_token", this.props.token);
    formData.append("clientId", this.props.clientId);
    formData.append("doc", doc);
    formData.append("name", doc.name);

    axios
      .post(`/file/public/doc`, formData)
      .then(res => {
        if (res.status === 200) {
          this.getDocuments();
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.changeLoginStatus(false);
        }
      });
  };

  removeDocument = docId => {
    event.stopPropagation();
    event.preventDefault();

    axios
      .delete(`/file/my/doc`, {
        data: {
          clientId: this.props.clientId,
          access_token: this.props.token !== "" ? this.props.token : "",
          file_id: docId,
        },
      })
      .then(res => {
        if (res.status === 200) {
          this.getDocuments();
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.changeLoginStatus(false);
        } else {
          this.setState({
            errors: errorMessageParser(error),
          });
        }
      });
  };

  uploadFile = e => {
    event.stopPropagation();
    event.preventDefault();
    return this.addDocument(e.target.files[0]);
  };

  render() {
    const { documents, errors } = this.state;
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <main className="documents">
          <div className="documents-header">
            {/* <div className="documents-tabs">
            <p className="documents-tabs_item documents-tabs_item__active">
              Certificates
            </p>
            <p className="documents-tabs_item">Licenses</p>
          </div> */}

            <input
              type="file"
              id="doc"
              ref="docUploader"
              style={{ display: "none" }}
              onChange={e => this.uploadFile(e)}
            />
            <MaterialPrimaryButton
              label="Add new document"
              type="button"
              onClick={() => this.refs.docUploader.click()}
              style={{
                outline: "none",
                width: "auto",
                height: 40,
                margin: 0,
                padding: "0 1.7em",
                fontSize: 16,
                boxShadow: "none",
                borderRadius: 20,
                textTransform: "none",
              }}
            />
          </div>

          <div className="documents-wrap">
            {errors.length !== 0
              ? errors.map((error, i) => (
                  <ResponseMessage
                    key={i}
                    textAlign="center"
                    message={error}
                    type="error"
                  />
                ))
              : null}
            {/* <p className="documents_date-separator">22 february</p> */}
            <ul className="documents-list">
              {documents.length > 0
                ? documents.map((doc, id) => (
                    <DocumentItem
                      key={id}
                      doc={doc}
                      removeDocument={this.removeDocument}
                    />
                  ))
                : null}
            </ul>
          </div>
        </main>
      );
    } else {
      return <Redirect to="/login" />;
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
const mapDispatchToProps = dispatch => {
  return {
    changeLoginStatus: value => {
      dispatch(loginStatus(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Documents);
