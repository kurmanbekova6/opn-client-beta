import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import axios from "axios";
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";
import { changeToken, loginStatus } from "../../redux/actions/userActions";

import OrderPaymentForm from "./OrderPaymentForm";
import OrderItem from "./OrderItem";

class OrderPayment extends Component {
  constructor(props) {
    super(props);
    this.state = { productOrder: null, isAuthorized: null };
  }

  componentDidMount() {
    if (this.props.access_token.data) {
      this.setState({ isAuthorized: true });
    } else {
      return this.setState({ isAuthorized: false });
    }

    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          this.setState({ clientId: res.data.result.clientId }, () =>
            this.getProduct()
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
        this.props.changeToken(res.data.result.token);
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
        access_token: this.props.token,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ productOrder: res.data.result[0] });
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
    const { isAuthorized, productOrder } = this.state;
    const { loginStatus } = this.props;
    return (
      <div className="product-order">
        {!isAuthorized || !loginStatus ? (
          <div className="product-order-login">
            <p>You must be logged in</p>
            <Link to="/login">Login</Link>
          </div>
        ) : (
          <Fragment>
            <RenderBreadcrumbs value="Products / Make Order" />
            <h1 className="product-order__title">Payment order</h1>

            <Row>
              {productOrder && (
                <Fragment>
                  <Col md="4">
                    <ColumnHeader value="Product you are buying now" />
                    <div className="product-list">
                      <OrderItem product={productOrder} />
                    </div>
                  </Col>
                  <Col md="8">
                    <ColumnHeader value="Order payment" />
                    <OrderPaymentForm product={productOrder} />
                  </Col>
                </Fragment>
              )}
            </Row>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    token: state.token,
    refresh: state.refresh,
    loginStatus: state.loginStatus,
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
)(OrderPayment);
