import React from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";
import { changeToken, loginStatus } from "../../redux/actions/userActions";
/* Custom ui */
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";
import MenuProfile from "../common/profileMenu/MenuProfile";
/* Components */
import OrderInfo from "./components/OrderInfo";
import OrderPaymentInfo from "./components/OrderPaymentInfo";
import OrderList from "./components/OrderList";
import ProductInfo from "./components/ProductInfo";
/* Data */
import { orderInfo, orderPaymentInfo, prodInfo } from "../../assets/makeOrder";

class OrdersHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      profile: true,
      clientId: "",
      access_token: "",
      orders: [],
      orderPaymentInfo: [],
      toOrder: false,
      message: "",
      errors: [],
      companyId: "",
    };
  }

  componentDidMount() {
    if (this.props.access_token.data) {
      this.setState({ loggedIn: true });
    } else {
      return this.setState({ loggedIn: false });
    }
    this.getId();
    setTimeout(this.getProduct, 500);
  }

  getId = () => {
    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          this.setState({
            clientId: res.data.result.clientId,
            access_token: this.props.token,
            companyId: this.props.access_token.data.result._id,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
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

  getProduct = () => {
    {
      this.props.location.state === {}
        ? this.setState({ toOrder: true })
        : axios
            .post(`/orders/get/1/${this.props.location.state._id}`, {
              clientId: this.state.clientId,
              access_token: this.state.access_token,
            })
            .then(res => {
              if (res.status === 200) {
                this.setState({ product: res.data.result[0] });
              }
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
    }
  };

  deleteProduct = () => {
    const host = `${location.protocol}//${
      location.hostname == "localhost"
        ? "dev.opnplatform.com"
        : location.hostname
    }/api/v1/orders/${this.state.product._id}`;

    fetch(host, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: this.state.clientId,
        access_token: this.state.access_token,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            message: "Delete successfully",
          });
        }
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

  render() {
    const { location } = this.props;
    const {
      loggedIn,
      orders,
      product,
      toOrder,
      message,
      errors,
      companyId,
    } = this.state;
    const { access_token } = this.props;
    return (
      <div className="product-order">
        {toOrder ? <Redirect to="/make_order" /> : <React.Fragment />}
        {!loggedIn || !loginStatus ? (
          <div className="product-order-login">
            <p>You must be logged in</p>
            <Link to="/login">Login</Link>
          </div>
        ) : product === undefined ? (
          ""
        ) : (
          <Container className="company-profile">
            <RenderBreadcrumbs value="Profile" />
            <Row>
              <Col className="profileChart" xs="12" md="4">
                <MenuProfile header="Profile" />
              </Col>

              <Col className="profileChart" xs="12" md="8">
                <ColumnHeader value="Order preview" />
                <div className="order-history__order-name">
                  #{product.index}
                </div>
                <Row>
                  <Col xs="12" md="5" className="order-history__container">
                    <div className="order-history__item eye-before">
                      <span className="blue-text">Title: </span>
                      <span className="grey-text">
                        {product.name} #{product.index}
                      </span>
                    </div>
                    <div className="order-history__item eye-before">
                      <span className="blue-text">Date of announcement: </span>
                      <span className="grey-text">
                        {moment(product.auction.start).format("DD | MM | YYYY")}
                      </span>
                    </div>
                    <div className="order-history__item eye-before">
                      <span className="blue-text">Delivery terms: </span>
                      <span className="grey-text">
                        {moment(product.auction.start)
                          .add(product.delivery.term, "days")
                          .format("DD | MM | YYYY")}
                      </span>
                    </div>
                    <div className="order-history__item eye-before">
                      <span className="blue-text">Date closed: </span>
                      <span className="grey-text">
                        {moment(product.auction.start)
                          .add(60, "days")
                          .format("DD | MM | YYYY")}
                      </span>
                    </div>
                    <div className="order-history__item eye-before">
                      <span className="grey-text">Organizer: </span>
                      <span className="blue-text upper">
                        {product.company.profile.name}
                      </span>
                    </div>
                    {/* <div className="eye-before">
                      <span className='blue-text'>Locaton:</span>
                      <span className='grey-text'>{product.location}</span>
                    </div> */}
                    {/* <div className="eye-before">
                      <span className='blue-text'>How much products want to realize:</span>
                      <span className='grey-text'></span>
                    </div> */}
                    <div className="order-history__item eye-before">
                      <span className="blue-text">
                        Delivery variant (logistic):{" "}
                      </span>
                      <span className="grey-text">
                        {product.delivery.variant}
                      </span>
                    </div>
                    {/* <div className="eye-before">
                      <span className='blue-text'>Price for delivery:</span>
                      <span className='grey-text'></span>
                    </div> */}
                    <div className="order-history__item eye-before">
                      <span className="blue-text">Payment currency: </span>
                      <span className="grey-text">
                        {product.currency !== null
                          ? product.currency
                          : "Have no price"}
                      </span>
                    </div>
                    <div className="order-history__item eye-before">
                      <span className="blue-text">Product photos: </span>
                      <div className="make-order__upload-photo_cntnr order-history__photos">
                        {product.photos !== [] ? (
                          product.photos.map(photo => (
                            <div className="make-order__upload-photo_item">
                              <img
                                key={photo._id}
                                src={`http://dev.opnplatform.com/api/v1/file/${
                                  photo._id
                                }`}
                                alt="Product Photo"
                              />
                            </div>
                          ))
                        ) : (
                          <div className="order-history__photos-text make-order__upload-photo_item">
                            This product have no photos
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" md="7" className="order-history__container">
                    <div className="order-history__item order-history__sec-row">
                      <span className="blue-text eye-before">Parameters: </span>
                      <div className="grey-text">
                        {product.description !== null
                          ? product.description
                          : "This product have no description"}
                      </div>
                    </div>
                    <div className="order-history__item order-history__sec-row">
                      <span className="blue-text eye-before">
                        Requirements for patisipants:
                      </span>
                      <div className="grey-text">
                        {product.requirements !== null
                          ? product.requirements
                          : "This product have no requirements"}
                      </div>
                    </div>
                    <div className="order-history__item order-history__sec-row">
                      <div className="blue-text eye-before">Documents:</div>
                      <div className="order-history__docs">
                        {product.documents.length !== 0 ? (
                          product.documents.map(doc => (
                            <a
                              className="order-item__doc"
                              key={doc._id}
                              target="_black"
                              href={`${location.protocol}//${
                                location.hostname == "localhost"
                                  ? "dev.opnplatform.com"
                                  : location.hostname
                              }/api/v1/file/${doc._id}`}
                            >
                              {doc.name}
                            </a>
                          ))
                        ) : (
                          <p className="order-item__doc">
                            This product have no documents
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="order-history__price">
                      <span className="blue-text">Price: </span>
                      <span className="grey-text">
                        {product.price !== null
                          ? product.price
                          : "This product have no price"}
                      </span>
                    </div>
                    {console.log(
                      product,
                      this.props.access_token.company_profile
                    )}
                    {console.log(this.props.access_token)}

                    {access_token.data.result.company_profile ===
                    product.company._id ? (
                      <div
                        className="order-history__delete"
                        onClick={this.deleteProduct}
                      >
                        delete order
                      </div>
                    ) : (
                      <React.Fragment />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Link
                    to="/make_order"
                    className="main-btn order-history__back"
                  >
                    BACK
                  </Link>
                  <div className="make-order__messages">
                    {message}
                    {errors !== []
                      ? errors.map(err => (
                          <span className="errorField">{err}</span>
                        ))
                      : ""}
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    loginStatus: state.loginStatus,
    token: state.token,
    refresh: state.refresh,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
)(OrdersHistory);
