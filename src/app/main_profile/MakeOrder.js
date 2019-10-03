import React, { Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { reset } from "redux-form";
import { Redirect } from "react-router-dom";
import { changeToken, loginStatus } from "../../redux/actions/userActions";
/* Custom ui */
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";
import MenuProfile from "../common/profileMenu/MenuProfile";

/* Components */
import OrderList from "./components/OrderList";
import MakeOrderForm from "./components/MakeOrderForm";
import DropdownContainer from "./components/DropdownContainer";
import DraftOrderList from "./components/DraftOrderList";

class MakeOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      access_token: "",
      companyId: "",

      loggedIn: true,

      orders: [],
      drafts: [],
      ordersMes: "",

      uploatedImgs: [],
      imagePreviewUrl: [],

      docUrl: [],
      documents: { comp: "", commod: "", tender: "", contract: "" },

      message: "",
      messages: [],
      errors: [],
      companyProfileIsEmpty: true,

      deliveryVars: [
        { code: "EXW", name: "EXW" },
        { code: "FCA", name: "FCA" },
        { code: "CPT", name: "CPT" },
        { code: "CIP", name: "CIP" },
        { code: "DAT", name: "DAT" },
        { code: "DAP", name: "DAP" },
        { code: "DDP", name: "DDP" },
        { code: "FAS", name: "FAS" },
        { code: "FOB", name: "FOB" },
        { code: "CFR", name: "CFR" },
        { code: "CIF", name: "CIF" },
      ],
      formUnits: [
        { code: "kg", name: "Kilogram" },
        { code: "tn", name: "Tonn" },
        { code: "l", name: "Liters" },
        { code: "cm3", name: "Cubic centimeters" },
        { code: "m2", name: "Square meters" },
        { code: "m3", name: "Cubic meters" },
      ],
      delivTime: [{ code: 30, name: 30 }, { code: 60, name: 60 }],
      bySell: [{ code: "BUY", name: "BUY" }, { code: "SELL", name: "SELL" }],
      curr: [{ code: "USD", name: "USD" }, { code: "EUR", name: "EUR" }],
      countriesList: [],
      tree: [],
      categories: [],
      orderCategory: "",
    };
  }

  componentDidMount = () => {
    this.getId();
    setTimeout(this.getPlacedOrders, 500);
    setTimeout(this.updateList, 1000);
    setTimeout(this.getCategoryList, 1500);
    setTimeout(this.getDraftOrders, 2000);
  };

  // Fetches list for specified? field
  updateList = () => {
    axios
      .post(`/geo/countries`, {
        clientId: this.state.clientId,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            countriesList: res.data.result,
            countriesListIsLoading: false,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.checkCompanyProfileData();
  };

  getId = () => {
    if (this.props.access_token.length < 0) {
      this.setState({ loggedIn: !this.state.loggedIn });
    } else if (!this.props.loginStatus) {
      this.setState({ loggedIn: !this.state.loggedIn });
    } else {
      axios
        .get("/client/id")
        .then(res => {
          if (res.status === 200) {
            this.setState({
              clientId: res.data.result.clientId,
              access_token: this.props.token,
              companyId: this.props.access_token.data.result.access_token._id,
            });
          }
        })
        .catch(error => {
          this.setState({
            loggedIn: !this.state.loggedIn,
          });
        });
    }
  };

  /* Refresh access token */
  refreshToken = () => {
    axios
      .post(`/user/refresh`, {
        clientId: this.state.clientId,
        refresh_token: this.props.refresh,
      })
      .then(res => {
        this.props.changeToken(res.data.result.token);
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 400) {
          this.props.loginStatus(false);
        }
      });
  };

  getPlacedOrders = () => {
    let ordersGetdata = {
      access_token: this.state.access_token,
      clientId: this.state.clientId,
      count: 40,
      orrset: 0,
    };
    axios
      .post("/orders/get/0/all", ordersGetdata)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.result);
          this.setState({
            orders: res.data.result,
          });
        }
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data !== undefined &&
          error.response.data.error_message !== undefined
        ) {
          if (error.response.status === 401 || error.response.status === 400) {
            this.refreshToken();
          } else {
            for (let i = 0; i < error.response.data.error_message.length; i++) {
              if (error.response.data.error_message[i].message !== undefined) {
                let resp = error.response.data.error_message.message;
                this.setState({ orders: [...this.state.orders, resp] });
                console.log(error.response.data.error_message);
              } else if (
                error.response.data.error_message &&
                error.response.data.error_message !== undefined
              ) {
                console.log(error.response.data.error_message);
              }
            }
          }
        }
      });
  };

  getDraftOrders = () => {
    let ordersGetdata = {
      access_token: this.state.access_token,
      clientId: this.state.clientId,
      count: 40,
      offset: 0,
    };
    axios
      .post("/orders/drafts", ordersGetdata)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.result);
          this.setState({
            drafts: res.data.result,
          });
        }
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data !== undefined &&
          error.response.data.error_message !== undefined
        ) {
          if (error.response.status === 401 || error.response.status === 400) {
            this.refreshToken();
          } else {
            for (let i = 0; i < error.response.data.error_message.length; i++) {
              if (error.response.data.error_message[i].message !== undefined) {
                let resp = error.response.data.error_message.message;
                this.setState({ drafts: [...this.state.orders, resp] });
                console.log(error.response.data.error_message);
              } else if (
                error.response.data.error_message &&
                error.response.data.error_message !== undefined
              ) {
                console.log(error.response.data.error_message);
              }
            }
          }
        }
      });
  };

  clear = () => {
    if (this.state.message !== "") {
      this.setState({
        message: "",
        messages: [],
      });
    }

    if (this.state.errors !== []) {
      this.setState({
        errors: [],
      });
    }
  };

  postOrder = () => {
    this.clear();
    let data;
    if (this.props.form.values !== undefined) {
      let announce = Date.parse(this.props.form.values.announce);
      data = {
        title: this.props.form.values.title,
        price: Number(this.props.form.values.price),
        photos: this.state.uploatedImgs || [],
        documents: this.state.docUrl,
        purpose: this.props.form.values.want,
        description: this.props.form.values.parameters,
        requirements: this.props.form.values.requirements,
        announce: announce,
        product: this.state.orderCategory,
        id: this.state.orderCategory,
        delivery: {
          term: Number(this.props.form.values.delivTerms),
          variant: this.props.form.values.delivVar,
        },
        country: this.props.form.values.country,
        currency: this.props.form.values.currency,
        access_token: this.state.access_token,
        clientId: this.state.clientId,
        amount: {
          number: Number(this.props.form.values.price),
          unit: this.props.form.values.units,
        },
      };
      axios
        .post("/orders", data)
        .then(res => {
          if (res.status === 200) {
            this.props.onSuccess();
            if (res.data.result.status === "DRAFT") {
              this.setState({
                messages: [
                  ...this.state.messages,
                  "Order successfully placed to drafts",
                  "To public orders you need to:",
                  // !this.props.access_token.data.result.customAccountId &&
                  //   "- connect your account to Stripe",
                  this.state.companyProfileIsEmpty &&
                    "- fill your company profile",
                ],
              });
              this.getDraftOrders();
            } else {
              this.setState({ message: "Order successfully placed" });
            }
          }
        })
        .catch(error => {
          console.log(error);
          if (
            error.response &&
            error.response !== undefined &&
            error.response.data &&
            error.response.data !== undefined &&
            error.response.status === 400
          ) {
            this.setState({ message: "Invalid order category was given" });
          }
          if (
            error.response &&
            error.response !== undefined &&
            error.response.data &&
            error.response.data !== undefined &&
            error.response.data.error_message !== undefined
          ) {
            if (error.response.status === 401) {
              this.refreshToken();
            }

            for (var i = 0; i < error.response.data.error_message.length; i++) {
              if (error.response.data.error_message[i].message !== undefined) {
                this.setState({
                  errors: [
                    ...this.state.errors,
                    error.response.data.error_message[i].message,
                  ],
                });
              } else if (
                error.response.data.error_message[i].actual !== undefined
              ) {
                this.setState({
                  errors: [
                    ...this.state.errors,
                    error.response.data.error_message[i].actual,
                  ],
                });
              }
            }
            if (typeof error.response.data.error_message === "string") {
              if (
                (error.response && error.response.status === 401) ||
                error.response.status === 400
              ) {
                this.refreshToken();
              } else {
                this.setState({
                  message: error.response.data.error_message,
                });
              }
            }
          }
        });
    } else {
      this.setState({
        message: "Please fill the form",
      });
    }
  };

  getHash = href => {
    let path = href.split("/");
    let res = path[path.length - 1];
    return res;
  };

  uploadImges = event => {
    event.preventDefault();
    this.clear();
    let formData = new FormData();

    formData.append("access_token", this.state.access_token);
    formData.append("clientId", this.state.clientId);
    let files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append("img", file);
    }
    axios
      .post("/file/public/img", formData)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            imagePreviewUrl: [
              ...this.state.imagePreviewUrl,
              res.data.result.url,
            ],
            uploatedImgs: [
              ...this.state.uploatedImgs,
              this.getHash(res.data.result.url),
            ],
          });
        }
      })
      .catch(error => {
        if (error.response !== undefined && error.response.data !== undefined) {
          switch (error.response.status) {
            case 401:
              this.refreshToken();
              break;
            case 400:
              this.refreshToken();
              break;
            default:
              console.log(error);
          }
        }
      });
  };

  renderImages = () => {
    for (let i = 0; i < this.state.imagePreviewUrl.length; i++) {
      {
        this.state.imagePreviewUrl.map(img => (
          <div
            className={
              this.state.imagePreviewUrl.length === 0
                ? "make-order__upload-photo_item grey-bg"
                : "make-order__upload-photo_item"
            }
          >
            <img src={img} />
          </div>
        ));
      }
    }
  };

  uploadDoc = event => {
    event.preventDefault();
    let docData = new FormData();
    docData.append("access_token", this.state.access_token);
    docData.append("clientId", this.state.clientId);
    let files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      docData.append("doc", file);
      docData.append("name", file.name);
      switch (event.target.id) {
        case "comp_doc":
          this.setState({
            documents: Object.assign(this.state.documents, { comp: file.name }),
          });
          break;
        case "commod_doc":
          this.setState({
            documents: Object.assign(this.state.documents, {
              commod: file.name,
            }),
          });
          break;
        case "tender_doc":
          this.setState({
            documents: Object.assign(this.state.documents, {
              tender: file.name,
            }),
          });
          break;
        case "contract_doc":
          this.setState({
            documents: Object.assign(this.state.documents, {
              contract: file.name,
            }),
          });
          break;
      }
    }
    axios
      .post("/file/public/doc", docData)
      .then(res => {
        this.setState({
          docUrl: [...this.state.docUrl, res.data.result._id],
        });
      })
      .catch(error => {
        switch (error.response.status) {
          case 401:
            this.refreshToken();
            break;
          case 400:
            this.refreshToken();
            break;
          default:
            console.log(error);
        }
      });
  };

  /* Categories functions */

  getCategoryList = () => {
    axios
      .post(`/category/list/all`, {
        clientId: this.state.clientId,
        access_token: this.state.access_token,
      })
      .then(res => {
        this.setState(
          {
            categories: res.data.result,
          },
          this.setCatToData
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  setCatToData = () => {
    let res = [];
    let children = [];
    let subCh = [];
    this.state.categories.map(cat => {
      children = [];
      cat.children !== []
        ? cat.children.map(ch => {
            subCh = [];
            ch.children !== []
              ? ch.children.map(sub => {
                  subCh = [
                    ...subCh,
                    {
                      label: sub.name,
                      value: sub._id,
                      disabled: false,
                    },
                  ];
                })
              : [];
            children = [
              ...children,
              {
                label: ch.name,
                value: ch._id,
                children: subCh,
                disabled: subCh.length !== 0 ? true : false,
              },
            ];
          })
        : [];
      res = [
        ...res,
        {
          label: cat.name,
          value: cat._id,
          children: children,
          disabled: children.length !== 0 ? true : false,
        },
      ];
    });
    this.setState({
      tree: res,
    });
  };

  onChangeDropdown = (currentNode, selectedNodes) => {
    this.setState({
      orderCategory: currentNode.value,
    });
  };

  checkCompanyProfileData = () => {
    const {
      company_name,
      position,
      country,
      address,
    } = this.props.access_token.data.result;
    if (company_name && position && country && address) {
      this.setState({ companyProfileIsEmpty: false });
    } else {
      this.setState({ companyProfileIsEmpty: true });
    }
  };

  render() {
    const { isLoggedIn } = this.props;
    const {
      imagePreviewUrl,
      message,
      messages,
      errors,
      loggedIn,
      tree,
    } = this.state;
    return (
      <Container className="company-profile">
        {!loggedIn ? <Redirect to="login" /> : <React.Fragment />}
        {!isLoggedIn ? <Redirect to="login" /> : <React.Fragment />}
        <RenderBreadcrumbs value="Profile" />

        <Row>
          <Col className="profileChart" xs="12" md="4">
            <MenuProfile header="Profile" />
          </Col>

          <Col className="profileChart" xs="12" md="4">
            <ColumnHeader value="Make order" />

            <MakeOrderForm
              deliveryVars={this.state.deliveryVars}
              countriesList={this.state.countriesList}
              bySell={this.state.bySell}
              delivTime={this.state.delivTime}
              curr={this.state.curr}
              formUnits={this.state.formUnits}
            />

            <div className="custom-tree">
              <div className="customProfileLabelFieldWrapper">
                <label className="profileLabelField">Category</label>
              </div>
              <DropdownContainer
                data={tree}
                onChange={this.onChangeDropdown}
                keepTreeOnSearch={true}
                radioSelect={true}
                showPartiallySelected={true}
              />
            </div>

            <div className="make-order__upload-photo">
              <Row>
                <Col xs="12" md="7">
                  <div className="grey-headings">Photos of product</div>
                  <div className="make-order__upload-photo_cntnr">
                    {imagePreviewUrl.length === 0 ? (
                      <React.Fragment>
                        <div className="make-order__upload-photo_item grey-bg" />
                        <div className="make-order__upload-photo_item grey-bg" />
                        <div className="make-order__upload-photo_item grey-bg" />
                        <div className="make-order__upload-photo_item grey-bg" />
                        <div className="make-order__upload-photo_item grey-bg" />
                        <div className="make-order__upload-photo_item grey-bg" />
                      </React.Fragment>
                    ) : (
                      imagePreviewUrl.map((it, i) => {
                        return (
                          <div
                            className="make-order__upload-photo_item"
                            key={i}
                          >
                            <img src={`${it}`} />
                          </div>
                        );
                      })
                    )}
                  </div>
                </Col>
                <Col xs="12" md="5">
                  <div className="make-order__upload-text">
                    <p>Upload photos</p>
                    <p>(*.jpg / *.png / *.gif not more 250 kB)</p>
                  </div>
                  <label id="#bb" className="make-order__upload-btn">
                    {" "}
                    CHOOSE FILE
                    <input type="file" id="img" onChange={this.uploadImges} />
                  </label>
                </Col>
              </Row>
              <Row>
                <Col xs="12" className="make-order__upload-docs">
                  <div className="grey-headings">Documents for upload</div>
                  <p className="undrl-link">
                    <label>
                      Company document (*.pdf)
                      <input
                        id="comp_doc"
                        onChange={this.uploadDoc}
                        type="file"
                      />
                    </label>
                  </p>
                  {this.state.documents.comp !== "" ? (
                    <p>{this.state.documents.comp}</p>
                  ) : (
                    <React.Fragment />
                  )}
                  <p className="undrl-link">
                    <label>
                      Commodities specifications (*.pdf)
                      <input
                        id="commod_doc"
                        onChange={this.uploadDoc}
                        type="file"
                      />
                    </label>
                  </p>
                  {this.state.documents.commod !== "" ? (
                    <p>{this.state.documents.commod}</p>
                  ) : (
                    <React.Fragment />
                  )}
                  <p className="undrl-link">
                    <label>
                      Tender document (*.pdf)
                      <input
                        id="tender_doc"
                        onChange={this.uploadDoc}
                        type="file"
                      />
                    </label>
                  </p>
                  {this.state.documents.tender !== "" ? (
                    <p>{this.state.documents.tender}</p>
                  ) : (
                    <React.Fragment />
                  )}
                  <p className="undrl-link">
                    <label>
                      Contract (*.pdf)
                      <input
                        id="contract_doc"
                        onChange={this.uploadDoc}
                        type="file"
                      />
                    </label>
                  </p>
                  {this.state.documents.contract !== "" ? (
                    <p>{this.state.documents.contract}</p>
                  ) : (
                    <React.Fragment />
                  )}

                  <button
                    className="make-order__upload-btn"
                    onClick={this.postOrder}
                  >
                    PLACE ORDER
                  </button>
                  <div className="make-order__messages">
                    {message}
                    {messages !== []
                      ? messages.map(item => (
                          <Fragment>
                            <span className="make-order__messages">{item}</span>
                            <br />
                          </Fragment>
                        ))
                      : ""}
                    {errors !== []
                      ? errors.map(err => (
                          <span className="errorField">{err}</span>
                        ))
                      : ""}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col className="profileChart" xs="12" md="4">
            <ColumnHeader value="Orders list" />

            <OrderList
              link=""
              src="./assets/img/pdf.png"
              text="Download list"
              access_token={this.state.access_token}
              clientId={this.state.clientId}
              orders={this.state.orders}
            />
            <div style={{ height: "40px" }} />
            <ColumnHeader value="Your draft orders" />
            <DraftOrderList
              link=""
              src="./assets/img/pdf.png"
              text="Download list"
              access_token={this.state.access_token}
              clientId={this.state.clientId}
              orders={this.state.drafts}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    form: state.form.make_order_form,
    access_token: state.loggedIn,
    isLoggedIn: state.loginStatus,
    token: state.token,
    refresh: state.refresh,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSuccess: () => dispatch(reset("make_order_form")),
    changeToken: token => {
      dispatch(changeToken(token));
    },
    loginStatus: status => {
      dispatch(loginStatus(status));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeOrder);
