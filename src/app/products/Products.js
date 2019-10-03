import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { changeToken, loginStatus } from "../../redux/actions/userActions";

import Sidebar from "./sidebar/Sidebar";
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import Table from "./table/Table";
import { saveProducts } from "../../redux/actions/productActions";
import Spinner from "../common/spinner/Spinner";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      isLoading: true,
      purpose: null,
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          this.setState({ clientId: res.data.result.clientId }, () =>
            this.getProducts()
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
      .then(() => {
        this.getProducts();
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 400) {
          this.props.loginStatus(false);
        }
      });
  };

  setFilter = purpose => {
    if (this.state.purpose === purpose) {
      this.setState(state => ({ purpose: null }), () => this.getProducts());
    } else {
      this.setState(state => ({ purpose }), () => this.getProducts(purpose));
    }
  };

  getProducts = (purpose = null) => {
    this.getCategoryList();
    this.setState({ isLoading: true, purpose });
    // 0 - unauthorized, 1 - authorized
    axios
      .post(`/orders/get/${this.props.isLoggedIn ? 1 : 0}/all`, {
        clientId: this.state.clientId,
        access_token: this.props.token !== "" ? this.props.token : "",
        count: 200,
        offset: 0,
        purpose,
      })
      .then(res => {
        if (res.status === 200) {
          // get filtered orders. You could get only APPROVED orders here
          const approvedOrders = [];
          res.data.result.map(item => {
            if (
              // item.status.toUpperCase() === "APPROVED" &&
              item.company &&
              item.company.profile.name
            ) {
              approvedOrders.push(item);
            }
          });
          this.props.saveProducts(approvedOrders);
          this.setState({ isLoading: false });
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

  getCategoryList = () => {
    axios
      .post(`/category/list/all`, {
        clientId: this.state.clientId,
        access_token: this.props.token,
      })
      .then(res => {
        this.setState({
          categories: res.data.result,
        });
      })
      .catch(error => {
        if (error.response && error.response.data) {
          if (error.response.status === 401 || error.response.status === 400) {
            this.setState({
              loggedIn: !this.state.loggedIn,
            });
          } else {
            console.log(error);
          }
        } else {
          console.log(error);
        }
      });
  };

  render() {
    const { productList } = this.props;
    const { categories } = this.state;
    return (
      <div className="products">
        {productList && (
          <Fragment>
            <RenderBreadcrumbs value="Products" />

            <h1 className="products__title">Products</h1>
            <div className="products-content">
              <Sidebar categories={categories} />
              {this.state.isLoading ? (
                <Spinner />
              ) : (
                <div className="products-table">
                  <Table products={productList} setFilter={this.setFilter} />
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    productList: state.product.productList,
    isLoggedIn: state.loginStatus,
    token: state.token,
    refresh: state.refresh,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveProducts: products => {
      dispatch(saveProducts(products));
    },
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
)(Products);
