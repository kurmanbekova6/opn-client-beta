import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import axios from "axios";
import moment from "moment";
/* Modal win */
import Toggle from "../../ui_components/utils/Toggle";
import Modal from "../../ui_components/utils/Modal";
import OrderModal from "../OrderModal";
import { changeToken, loginStatus } from "../../../redux/actions/userActions";

import RenderBreadcrumbs from "../../ui_components/utils/Breadcrumbs";
import productPhoto from "../../../assets/img/thumbBox.png";
// import Sidebar from "../../products/sidebar/Sidebar";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class CreateOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: null,
      product: null,
      clientId: "",
      access_token: "",
      isOpen: false,
      photos: [],
      photoIndex: 0,
    };
  }

  toggleLightbox = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentDidMount() {
    if (this.props.access_token.data) {
      this.setState({ loggedIn: true });
    } else {
      return this.setState({ loggedIn: false });
    }

    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          this.setState(
            {
              clientId: res.data.result.clientId,
              access_token: this.props.token,
            },
            () => this.getProduct()
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* Refresh access token */
  refreshToken = () => {
    axios
      .post(`/user/refresh`, {
        clientId: this.state.clientId,
        refresh_token: this.props.refresh,
      })
      .then(res => {
        if (res.status === 200) {
          this.props.changeToken(res.data.result.token);
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 400) {
          this.props.loginStatus(false);
        }
      });
  };

  getIdFromUrl = () =>
    location.pathname.substr(location.pathname.lastIndexOf("/") + 1);

  getProduct = () => {
    axios
      .post(`/orders/get/1/${this.getIdFromUrl()}`, {
        clientId: this.state.clientId,
        access_token: this.state.access_token,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ product: res.data.result[0] }, () =>
            this.getPhotos()
          );
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

  getPhotos = () => {
    this.state.product.photos.map(photo => {
      let src = `${location.protocol}//${
        location.hostname == "localhost"
          ? "dev.opnplatform.com"
          : location.hostname
      }/api/v1/file/${photo._id}`;

      this.setState({
        photos: [...this.state.photos, src],
      });
    });
  };

  render() {
    const { loggedIn, product, isOpen, photos, photoIndex } = this.state;
    const { loginStatus } = this.props;
    return (
      <div className="product-order">
        {!loggedIn || !loginStatus ? (
          <div className="product-order-login">
            <p>You must be logged in</p>
            <Link to="/login">Login</Link>
          </div>
        ) : !product ? (
          ""
        ) : (
          <Fragment>
            <RenderBreadcrumbs value="Products / Order" />
            <h1 className="product-order__title">
              {product.name ? product.name : "Untitled"}
            </h1>

            <div className="products-content">
              {/* <Sidebar /> */}
              {isOpen && (
                <Lightbox
                  mainSrc={photos[photoIndex]}
                  mainSrc={photos[photoIndex]}
                  nextSrc={photos[(photoIndex + 1) % photos.length]}
                  prevSrc={
                    photos[(photoIndex + photos.length - 1) % photos.length]
                  }
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex:
                        (photoIndex + photos.length - 1) % photos.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % photos.length,
                    })
                  }
                  onCloseRequest={this.toggleLightbox}
                />
              )}
              <div className="products-table">
                <div>
                  <p className="order-item__number">
                    <span>#{product.index}</span>
                  </p>

                  <div>
                    <Row>
                      <Col md="3">
                        <div>
                          {product.photos.length > 0 ? (
                            <Fragment>
                              <p className="order-item__title order-item__title_lite">
                                Product Photo:
                              </p>
                              <div className="order-item-photos">
                                {product.photos.map(photo => (
                                  <img
                                    onClick={this.toggleLightbox}
                                    key={photo._id}
                                    src={`${location.protocol}//${
                                      location.hostname == "localhost"
                                        ? "dev.opnplatform.com"
                                        : location.hostname
                                    }/api/v1/file/${photo._id}`}
                                    alt="Product Photo"
                                  />
                                ))}
                              </div>
                            </Fragment>
                          ) : null}

                          <div>
                            <p className="order-item__title order-item__title_lite">
                              Date of announcement:{" "}
                              <span>
                                {moment(product.auction.start).format(
                                  "DD | MM | YYYY"
                                )}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="order-item__title order-item__title_lite">
                              Delivery terms:{" "}
                              <span>
                                {moment(product.auction.start)
                                  .add(product.delivery.term, "days")
                                  .format("DD | MM | YYYY")}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="order-item__title order-item__title_lite">
                              Date closed:{" "}
                              <span>
                                {moment(product.auction.start)
                                  .add(60, "days")
                                  .format("DD | MM | YYYY")}
                              </span>
                            </p>
                          </div>

                          {product.documents.length > 0 ? (
                            <Fragment>
                              <br />
                              <div>
                                <p className="order-item__title order-item__title_lite">
                                  Documents to download
                                </p>
                                {product.documents.map(doc => (
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
                                ))}
                              </div>
                            </Fragment>
                          ) : null}
                        </div>
                      </Col>

                      <Col md="9">
                        <Row>
                          <Col>
                            <p
                              className="order-item__title order-item__title_lite"
                              style={{
                                paddingLeft: "0.7em",
                              }}
                            >
                              Title:{" "}
                              <span>
                                {product.name ? product.name : "Untitled"}
                              </span>
                            </p>

                            <div className="order-item-about">
                              <p className="order-item__title">Parameters:</p>
                              <p className="order-item-about__info">
                                {product.description
                                  ? product.description
                                  : "-"}
                              </p>
                            </div>
                          </Col>

                          <Col>
                            <p
                              className="order-item__title order-item__title_lite"
                              style={{
                                paddingLeft: "0.7em",
                              }}
                            >
                              Company / Organizer:
                            </p>

                            <div className="order-item-about">
                              <div className="order-item-about_inline">
                                <p className="order-item__title">
                                  {product.company &&
                                  product.company.profile.name
                                    ? product.company.profile.name
                                    : "-"}
                                </p>
                                <p className="product-item__checked">Prove</p>
                              </div>
                              <p className="order-item-about__info">
                                {product.company &&
                                product.company.profile.description
                                  ? product.company.profile.description
                                  : "-"}
                              </p>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <div className="order-item-about">
                              <p className="order-item__title">
                                Requirements for participants:
                              </p>
                              <p className="order-item-about__info">
                                {product.requirements
                                  ? product.requirements
                                  : "-"}
                              </p>
                            </div>
                          </Col>
                          <Col>
                            <p className="order-item__price-note">
                              <Toggle>
                                {({ on, toggle }) => (
                                  <React.Fragment>
                                    <button
                                      className="product-order__trans-btn product-order__trans-btn_lite"
                                      onClick={toggle}
                                    >
                                      {product.amount !== undefined
                                        ? `${product.amount.number} ${
                                            product.currency
                                          } per ${product.amount.unit}`
                                        : `${product.price / 100}   per/ton`}
                                      <p>Your price?</p>
                                    </button>
                                    <Modal on={on} toggle={toggle}>
                                      <OrderModal
                                        order={this.getIdFromUrl()}
                                        access_token={this.state.access_token}
                                        clientId={this.state.clientId}
                                        toggle={toggle}
                                      />
                                    </Modal>
                                  </React.Fragment>
                                )}
                              </Toggle>
                            </p>
                          </Col>
                        </Row>

                        {this.props.paidOrderId &&
                        product._id === this.props.paidOrderId ? (
                          <Row>
                            <div className="product-order-notice">
                              <p>Transaction successfully sent</p>
                              <a
                                href="https://dashboard.stripe.com/login"
                                target="_black"
                              >
                                Visit stripe account to check transaction
                              </a>
                            </div>
                          </Row>
                        ) : null}

                        <Row>
                          <Link
                            to={"/payment_order/" + product._id}
                            className="product-order__trans-btn product-order__trans-btn_fixed-width"
                          >
                            Order Now
                          </Link>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    paidOrderId: state.product.paidOrderId,
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
)(CreateOrder);
