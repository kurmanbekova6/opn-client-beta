import React from "react";
import { /*Media,*/ Container, Col, Row } from "reactstrap";
/* Components */
import CompanyInfoFormContainer from "./containers/CompanyInfoFormContainer";
import FinancialInfoFormContainer from "./containers/FinancialInfoFormContainer";
import CommonFlatBtn from "../common/CommonFlatBtn";
import UserInfoFormContainer from "./containers/UserInfoFormContainer";
/* Other */
import { PdfIcon } from "../../consts/icons";
import { connect } from "react-redux";
import axios from "axios";
import { reset } from "redux-form";
import { Redirect } from "react-router-dom";
/* Custom ui */
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";
import ProfileLogo from "../ui_components/utils/ProfileLogo";
import Spinner from "../common/spinner/Spinner";
import MenuProfile from "../common/profileMenu/MenuProfile";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId: "",
      errors: "",
      logo: "",
      message: "",
      data: null,
      documents: [],
      companiesWorkedWith: [],
      orders: [],
      transactions: [],
      imgUrl: "",
      docUrl: "",
      docMes: "",
      imgMes: "",
      saved: false,
      updated: false,
      loggedIn: true,
      axiosErr: [],
      profile: false,
      disabled: false,
    };
  }

  componentDidMount = () => {
    setTimeout(this.getProfileInfo, 500);
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.userInfo.syncErrors ||
      nextProps.compInfo.syncErrors ||
      nextProps.finInfo.syncErrors
    ) {
      this.setState({
        disabled: true,
      });
    } else {
      this.setState({
        disabled: false,
      });
    }
  };

  getProfileInfo = () => {
    axios
      .post("/company/info/all", {
        access_token: this.props.access_token,
        clientId: this.props.clientId,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: res.data.result,
            documents: res.data.result.profile.documents.map(doc => ({
              url: `${process.env.API_URL}/file/${doc._id}`,
              name: doc.name,
            })),
            // documents: res.data.result.profile.documents.map(
            //   doc => `http://dev.opnplatform.com/api/v1/file/${doc}`
            // ),
            companiesWorkedWith: [
              ...this.state.companiesWorkedWith,
              res.data.result.financialInfo.companiesWorkedWith,
            ],
            orders: [
              ...this.state.orders,
              res.data.result.financialInfo.orders,
            ],
            transactions: [
              ...this.state.transactions,
              res.data.result.financialInfo.transactions,
            ],
            imgUrl: res.data.result.profile.logo_url,
            profile: true,
          });
        } else {
          this.setState({ data: [] }); // replacement empty data instead loader
        }
      })
      .catch(err => {
        if (err.response.status)
          this.setState({
            profile: false,
            data: [], // replacement empty data instead loader
          });
      });
  };

  saveProfile = () => {
    /* Declarating request data */
    let data;
    if (
      this.props.compInfo.values !== undefined &&
      this.props.finInfo.values !== undefined &&
      this.props.userInfo.values !== undefined
    ) {
      data = {
        profile: {
          name:
            this.props.compInfo.values.name !== undefined
              ? this.props.compInfo.values.name
              : this.setState({ message: "Fill in company name field" }),
          location: {
            address:
              this.props.compInfo.values.address !== undefined
                ? this.props.compInfo.values.address
                : this.setState({ message: "Fill in company address field" }),
            zip: this.props.compInfo.values.zip || "",
            country:
              this.props.compInfo.values.country !== undefined
                ? this.props.compInfo.values.country
                : this.setState({ message: "Fill in country field" }),
          },
          contacts: {
            site:
              this.props.compInfo.values.site !== undefined
                ? this.props.compInfo.values.site
                : this.setState({ message: "Fill in site field" }),
            email:
              this.props.compInfo.values.email !== undefined
                ? this.props.compInfo.values.email
                : this.setState({ message: "Fill in company email field" }),
            phone1: this.props.compInfo.values.phone1 || "",
            phone2: this.props.compInfo.values.phone2 || "",
          },
          description:
            this.props.compInfo.values.description !== undefined
              ? this.props.compInfo.values.description
              : this.setState({
                  message: "Fill in company profile description field",
                }),
        },
        financialInfo: {
          wallet:
            this.props.finInfo.values.wallet !== undefined
              ? this.props.finInfo.values.wallet
              : this.setState({ message: "Fill in wallet field" }),
        },
        userInfo: {
          chief: {
            email: this.props.userInfo.values.chief_email || "",
            name: this.props.userInfo.values.chief_full_name || "",
            phone: this.props.userInfo.values.chief_phone || "",
          },
          department: this.props.userInfo.values.department || "",
          email:
            this.props.userInfo.values.email !== undefined
              ? this.props.userInfo.values.email
              : this.setState({
                  message: "Fill in user information email field",
                }),
          address: this.props.userInfo.values.fact_address || "",
          name:
            this.props.userInfo.values.full_name !== undefined
              ? this.props.userInfo.values.full_name
              : this.setState({
                  message: "Fill in user information full name field",
                }),
          mobile_phone: this.props.userInfo.values.mobile || "",
          phone: this.props.userInfo.values.phone1 || "",
          position:
            this.props.userInfo.values.position !== undefined
              ? this.props.userInfo.values.position
              : this.setState({
                  message: "Fill in user information position field",
                }),
        },
        access_token: this.props.access_token,
        clientId: this.props.clientId,
      };

      /* Post data  */
      axios
        .post("/company", data)
        .then(res => {
          if (res.status === 200) {
            this.setState({ message: "Done" });
            reset("opn_financial_info");
            reset("opn_user_info");
            reset("opn_company_info");
            this.setState({ message: "Saved successfully!" });
            setTimeout(this.successSave, 3000);
          }
          if (this.state.message !== "") {
            this.setState({ message: "" });
          }
        })
        .catch(error => {
          if (error.response) {
            if (error.message === "Request failed with status code 400") {
              this.setState({
                message:
                  "It seems like you entered incorrect values. Please refresh page.",
              });
            }

            if (
              error.response.data !== undefined &&
              error.response.data.error_message !== undefined
            ) {
              for (
                let i = 0;
                i < error.response.data.error_message.length;
                i++
              ) {
                if (
                  error.response.data.error_message[i].type ===
                  "international_phone"
                ) {
                  let response = error.response.data.error_message[i].field
                    .toString()
                    .split(".");
                  let field = response[response.length - 1];

                  let res = `${
                    error.response.data.error_message[i].expected
                  } in field: ${field}`;
                  this.setState({ axiosErr: [...this.state.axiosErr, res] });
                } else if (
                  error.response.data.error_message[i].message !== undefined
                ) {
                  let resp = error.response.data.error_message.message;
                  this.setState({ axiosErr: [...this.state.axiosErr, resp] });
                } else {
                  console.log(error);
                }
              }
            }
          }
        });
    } else {
      this.setState({ message: "Please fill the form" });
    }
  };

  updateProfile = () => {
    if (this.state.data === []) {
      this.setState({ message: "Please fill the form" });
    } else if (
      this.props.finInfo.values !== undefined ||
      this.props.compInfo.values !== undefined ||
      (this.props.userInfo.values !== undefined && this.state.data !== [])
    ) {
      let data;
      data = {
        profile: {
          name:
            this.props.compInfo.values !== undefined &&
            this.props.compInfo.values.name !== undefined
              ? this.props.compInfo.values.name
              : this.state.data === []
              ? ""
              : this.state.data.profile.name,
          location: {
            address:
              this.props.compInfo.values !== undefined &&
              this.props.compInfo.values.address !== undefined
                ? this.props.compInfo.values.address
                : this.state.data === []
                ? ""
                : this.state.data.profile.location.address,
            // zip:
            //   this.props.compInfo.values !== undefined &&
            //   this.props.compInfo.values.zip !== undefined
            //     ? this.props.compInfo.values.zip
            //     : this.state.data === []
            //     ? ""
            //     : this.state.data.profile.location.zip,
            country:
              this.props.compInfo.values !== undefined &&
              this.props.compInfo.values.country !== undefined
                ? this.props.compInfo.values.country
                : this.state.data === []
                ? ""
                : this.state.data.profile.location.country,
          },
          contacts: {
            site:
              this.props.compInfo.values !== undefined &&
              this.props.compInfo.values.site !== undefined
                ? this.props.compInfo.values.site
                : this.state.data === []
                ? ""
                : this.state.data.profile.contacts.site,
            email:
              this.props.compInfo.values !== undefined &&
              this.props.compInfo.values.email !== undefined
                ? this.props.compInfo.values.email
                : this.state.data === []
                ? ""
                : this.state.data.profile.contacts.email,
            phone1:
              this.props.compInfo.values !== undefined &&
              this.props.compInfo.values.phone1 !== undefined
                ? this.props.compInfo.values.phone1
                : this.state.data === []
                ? ""
                : this.state.data.profile.contacts.phone1,
            //   phone2:
            //     this.props.compInfo.values !== undefined &&
            //     this.props.compInfo.values.phone2 !== undefined
            //       ? this.props.compInfo.values.phone2
            //       : this.state.data === []
            //       ? ""
            //       : this.state.data.profile.phone2,
          },
          description:
            this.props.compInfo.values !== undefined &&
            this.props.compInfo.values.description !== undefined
              ? this.props.compInfo.values.description
              : this.state.data === []
              ? ""
              : this.state.data.profile.description,
        },
        financialInfo: {
          wallet:
            this.props.finInfo.values !== undefined &&
            this.props.finInfo.values.wallet !== undefined
              ? this.props.finInfo.values.wallet
              : this.state.data === []
              ? ""
              : this.state.data.financialInfo.wallet,
        },
        userInfo: {
          chief: {
            email:
              this.props.userInfo.values !== undefined &&
              this.props.userInfo.values.chief_email !== undefined
                ? this.props.userInfo.values.chief_email
                : this.state.data === []
                ? ""
                : this.state.data.userInfo &&
                  this.state.data.userInfo.chief &&
                  this.state.data.userInfo.chief.email,
            name:
              this.props.userInfo.values !== undefined &&
              this.props.userInfo.values.chief_full_name !== undefined
                ? this.props.userInfo.values.chief_full_name
                : this.state.data === []
                ? ""
                : this.state.data.userInfo &&
                  this.state.data.userInfo.chief &&
                  this.state.data.userInfo.chief.name,
            phone:
              this.props.userInfo.values !== undefined &&
              this.props.userInfo.values.chief_phone !== undefined
                ? this.props.userInfo.values.chief_phone
                : this.state.data === []
                ? ""
                : this.state.data.userInfo &&
                  this.state.data.userInfo.chief &&
                  this.state.data.userInfo.chief.phone,
          },
          // department:
          //   this.props.userInfo.values !== undefined &&
          //   this.props.userInfo.values.department !== undefined
          //     ? this.props.userInfo.values.department
          //     : this.state.data === []
          //     ? ""
          //     : this.state.data.userInfo.department,
          email:
            this.props.userInfo.values !== undefined &&
            this.props.userInfo.values.email !== undefined
              ? this.props.userInfo.values.email
              : this.state.data === []
              ? ""
              : this.state.data.userInfo.email,
          address:
            this.props.userInfo.values !== undefined &&
            this.props.userInfo.values.fact_address !== undefined
              ? this.props.userInfo.values.fact_address
              : this.state.data === []
              ? ""
              : this.state.data.userInfo &&
                this.state.data.userInfo.fact_address,
          name:
            this.props.userInfo.values !== undefined &&
            this.props.userInfo.values.full_name !== undefined
              ? this.props.userInfo.values.full_name
              : this.state.data === []
              ? ""
              : this.state.data.userInfo.full_name,
          mobile_phone:
            this.props.userInfo.values !== undefined &&
            this.props.userInfo.values.mobile !== undefined
              ? this.props.userInfo.values.mobile
              : this.state.data === []
              ? ""
              : this.state.data.userInfo.mobile_phone,
          phone:
            this.props.userInfo.values !== undefined &&
            this.props.userInfo.values.phone1 !== undefined
              ? this.props.userInfo.values.phone1
              : this.state.data === []
              ? ""
              : this.state.data.userInfo && this.state.data.userInfo.phone1,
          position:
            this.props.userInfo.values !== undefined &&
            this.props.userInfo.values.position !== undefined
              ? this.props.userInfo.values.position
              : this.state.data === []
              ? ""
              : this.state.data.userInfo.position,
        },
        access_token: this.props.access_token,
        clientId: this.props.clientId,
      };
      axios
        .put("/company", data)
        .then(res => {
          if (res.status === 200 || res.status) {
            this.setState({ message: "Updated successfully!" });
            setTimeout(this.successUpdate, 3000);
          }
        })
        .catch(error => {
          if (error.response) {
            if (error.message === "Request failed with status code 400") {
              this.setState({ message: "Please enter correct values" });
            }

            if (
              error.response.data !== undefined &&
              error.response.data.error_message !== undefined
            ) {
              for (
                let i = 0;
                i < error.response.data.error_message.length;
                i++
              ) {
                if (
                  error.response.data.error_message[i].type ===
                  "international_phone"
                ) {
                  this.setState({
                    message: "Invalid number or has no country code",
                  });
                }
              }
            }
          }

          if (
            error.response.data !== undefined &&
            error.response.data.error_message !== undefined
          ) {
            for (let i = 0; i < error.response.data.error_message.length; i++) {
              this.setState({
                axiosErr: this.state.axiosErr.concat(
                  error.response.data.error_message[i].message
                ),
              });
            }
          }
        });
    } else {
      this.setState({ message: "Please fill the form" });
    }
  };

  handleSave = () => {
    this.clear();
    this.saveProfile();
  };

  handleUpdate = () => {
    this.clear();
    setTimeout(this.updateProfile, 500);
  };

  successUpdate = () => {
    this.setState({
      updated: !this.state.updated,
    });
  };

  successSave = () => {
    this.setState({
      saved: !this.state.saved,
    });
  };

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
        this.setState({
          imgUrl: res.data.result.url,
        });
      }
    });
  };

  getHash = href => {
    let path = href.split("/");
    let res = path[path.length - 1];
    return res;
  };

  saveImg = () => {
    let url = this.getHash(this.state.imgUrl);
    axios
      .put("/company/logo", {
        access_token: this.props.access_token,
        clientId: this.props.clientId,
        imageId: url,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            imgMes: "Logo uploated!",
          });
        }
      });
    const clear = () => {
      this.setState({
        imgMes: "",
        logo: "",
      });
    };
    setTimeout(clear, 2000);
  };

  uploadDoc = event => {
    event.preventDefault();
    var docData = new FormData();
    docData.append("doc", event.target.files[0]);
    docData.append("access_token", this.props.access_token);
    docData.append("clientId", this.props.clientId);
    docData.append("name", event.target.files[0].name);
    axios.post("/file/public/doc", docData).then(res => {
      this.setState(
        state => ({
          documents: [
            ...this.state.documents,
            {
              name: docData.get("name"),
              url: `${process.env.API_URL}/file/${res.data.result._id}`,
            },
          ],
          // docUrl: res.data.result._id,
        }),
        this.saveDoc(res.data.result._id)
      );
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
          this.setState({
            docMes: "Document uploated",
          });
        }
      });
    const clear = () => {
      this.setState({
        docMes: "",
        docUrl: "",
      });
    };
    setTimeout(clear, 2000);
  };

  clear = () => {
    if (this.state.axiosErr !== []) {
      this.setState({
        axiosErr: [],
      });
    }
    if (this.state.message !== "") {
      this.setState({
        message: "",
      });
    }
  };

  render() {
    if (!this.state.data && this.props.loginStatus) {
      return (
        <div style={{ minHeight: "500px", paddingTop: "100px" }}>
          <Spinner />
        </div>
      );
    }

    return (
      <Container className="company-profile">
        {!this.props.loginStatus ? (
          <Redirect push to="/login" />
        ) : (
          <React.Fragment />
        )}
        {this.state.saved ? (
          <Redirect push to="/tariff_plans" />
        ) : (
          <React.Fragment />
        )}
        {this.state.updated ? (
          <Redirect push to="/main_profile" />
        ) : (
          <React.Fragment />
        )}
        <RenderBreadcrumbs value="Profile" />

        <Row>
          {/* PROFILE MENU */}
          <Col className="profileChart" md="4">
            <MenuProfile header="Profile" editing={false} />
          </Col>

          {/* COMPANY FORM */}
          <Col className="profileChart" md="4">
            <ColumnHeader value="COMPANY PROFILE" comment="(visible to all)" />
            <Row>
              {/*<Col md="4">*/}
              {/*<ProfileLogo*/}
              {/*  src={*/}
              {/*    this.state.imgUrl !== ""*/}
              {/*      ? this.state.imgUrl*/}
              {/*      : "./assets/img/icons/ms-icon-144x144.png"*/}
              {/*  }*/}
              {/*  alt="Company Logo"*/}
              {/*  customClass=""*/}
              {/*/>*/}

              {/*<div className="profile__upload-logo">*/}
              {/*  <label className="profileLogoActiveLink ">*/}
              {/*    CHOOSE FILES*/}
              {/*    <input type="file" id="img" onChange={this.uploadImg} />*/}
              {/*  </label>*/}
              {/*  <p className="undrl-link">{this.state.logo}</p>*/}
              {/*  {this.state.logo.length !== 0 ? (*/}
              {/*    <button*/}
              {/*      className="make-order__upload-btn"*/}
              {/*      onClick={this.saveImg}*/}
              {/*    >*/}
              {/*      UPLOAD LOGO*/}
              {/*    </button>*/}
              {/*  ) : (*/}
              {/*    <React.Fragment />*/}
              {/*  )}*/}
              {/*  <span className="login-register-wrapper_messages">*/}
              {/*    {this.state.imgMes}*/}
              {/*  </span>*/}
              {/*</div>*/}
              {/*</Col>*/}
              <Col md="12">
                <CompanyInfoFormContainer data={this.state.data} />
                <div>
                  <span className="profileSubSectionLabel">Documents: *</span>
                  {/* Return documents list */}

                  {/* If documents are empty */}
                  {this.state.documents !== [] ? (
                    this.state.documents.map(doc => (
                      <div key={doc.id} className="profileDocumentWrapper">
                        <PdfIcon active={true} />{" "}
                        <a href={doc.url} className="profileDocumentActiveLink">
                          Document: {doc.name}
                        </a>
                      </div>
                    ))
                  ) : (
                    <span className="profileSubSectionLabelAnswer">
                      You have no documents uploaded
                    </span>
                  )}
                  {/* Upload docs link */}
                  <label className="profileDocumentUploadLink">
                    Upload one more document (*.pdf)
                    <input type="file" id="doc" onChange={this.uploadDoc} />
                  </label>
                  {this.state.docUrl.length !== 0 ? (
                    <button
                      className="make-order__upload-btn"
                      onClick={this.saveDoc}
                    >
                      UPLOAD DOCS
                    </button>
                  ) : (
                    <React.Fragment />
                  )}
                  <div className="login-register-wrapper_messages">
                    {this.state.docMes}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          {/* USER INFO FORM */}
          <Col className="profileChart" md="4">
            <ColumnHeader value="USER INFO" comment="(visible only to you)" />
            <Row>
              <Col xs="auto" sm="auto" md="12">
                <UserInfoFormContainer data={this.state.data} />
                <FinancialInfoFormContainer data={this.state.data} />
              </Col>
            </Row>
          </Col>
        </Row>
        {/* SUBMIT BUTTON */}
        <Row className="submissionRow">
          <Col md={{ size: 1, offset: 5 }}>
            <CommonFlatBtn
              className={`login-form-button ${
                this.state.disabled ? "disabled" : ""
              }`}
              type="button"
              onClick={this.handleUpdate}
              disabled={this.state.disabled}
            >
              UPDATE
            </CommonFlatBtn>

            {/*{this.state.profile ? (*/}
            {/*  <CommonFlatBtn*/}
            {/*    className={`login-form-button ${*/}
            {/*      this.state.disabled ? "disabled" : ""*/}
            {/*    }`}*/}
            {/*    type="button"*/}
            {/*    onClick={this.handleUpdate}*/}
            {/*    disabled={this.state.disabled}*/}
            {/*  >*/}
            {/*    UPDATE*/}
            {/*  </CommonFlatBtn>*/}
            {/*) : (*/}
            {/*  <CommonFlatBtn*/}
            {/*    className={`login-form-button ${*/}
            {/*      this.state.disabled ? "disabled" : ""*/}
            {/*    }`}*/}
            {/*    type="button"*/}
            {/*    onClick={this.handleSave}*/}
            {/*    disabled={this.state.disabled}*/}
            {/*  >*/}
            {/*    SAVE*/}
            {/*  </CommonFlatBtn>*/}
            {/*)}*/}
          </Col>
        </Row>
        {/* MESSAGES AND ERRORS */}
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="login-register-wrapper_messages">
              <p>{this.state.message}</p>
              {this.state.axiosErr !== []
                ? this.state.axiosErr.map((err, index) => (
                    <p key={index}>{err}</p>
                  ))
                : ""}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    finInfo: state.form.opn_financial_info,
    userInfo: state.form.opn_user_info,
    compInfo: state.form.opn_company_info,
    access_token: state.token,
    loginStatus: state.loginStatus,
    clientId: state.clientId,
  };
};

export default connect(
  mapStateToProps,
  null
)(Profile);
