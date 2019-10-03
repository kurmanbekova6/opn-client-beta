import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { loginStatus } from "../../../../redux/actions/userActions";

// Components
import UpgradeTariff from "../../modals/upgradeTariff/upgradeTariff";
import Search from "../../../ui_components/search/Search";
import Filters from "../Filters/Filters";
import RequestsList from "./RequestsList/RequestsList";
import ProductModal from "../../market/Products/ProductModal/ProductModal";

class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myOrdersAmount: [],
      products: [],
      openModal: false,
      categories: [],
      displayList: false,
      upgradeTariffModalIsOpen: false,
    };
  }

  componentDidMount() {
    this.getMyOrders();
    this.getAllProducts();
    this.getCategoryList();
  }

  getAllProducts = () => {
    axios
      .post(`/orders/get/${this.props.isLoggedIn ? 1 : 0}/all`, {
        clientId: this.props.clientId,
        access_token: this.props.token !== "" ? this.props.token : "",
        count: 200,
        offset: 0,
        purpose: "SELL",
      })
      .then(res => {
        if (res.status === 200) {
          if (res.data.result.length !== 0) {
            this.setState({
              products: res.data.result,
              noFiltered: res.data.result,
              displayList: true,
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.changeLoginStatus(false);
        }
      });
  };

  getMyOrders = () => {
    axios
      .post(`/msg/box/chats`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
        count: 250,
        offset: 0,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ myOrdersAmount: res.data.result.length });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getCategoryList = () => {
    axios
      .post(`/category/list/all`, {
        clientId: this.props.clientId,
        access_token: this.props.token,
      })
      .then(res => {
        let flattenCategories = [];
        res.data.result.map((grandCategory, index) => {
          flattenCategories[index] = grandCategory;
          grandCategory.children.map(subCategory => {
            if (subCategory.children.length > 0) {
              subCategory.children.map(product => {
                flattenCategories[index].children = [
                  ...flattenCategories[index].children,
                  product,
                ];
              });
            } else {
              flattenCategories[index].children = [
                ...flattenCategories[index].children,
                subCategory,
              ];
            }
          });
        });
        this.setState({
          categories: flattenCategories,
        });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.changeLoginStatus(false);
        }
      });
  };

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  returnAllProducts = () => {
    this.setState({
      products: this.state.noFiltered,
    });
  };

  returnResult = products => {
    this.setState({
      products,
    });
  };

  toggleUpgradeTariffModal = () =>
    this.setState({
      upgradeTariffModalIsOpen: !this.state.upgradeTariffModalIsOpen,
    });

  checkTariffPlan = () => {
    axios
      .post(`/orders/get/1/my`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
        count: 250,
        offset: 0,
      })
      .then(res => {
        if (res.status === 200) {
          return res.data.result.length;
        }
      })
      .then(productsLength => {
        axios
          .post(`/company/${this.props.companyId}/all`, {
            access_token: this.props.token,
            clientId: this.props.clientId,
          })
          .then(res => {
            if (res.status === 200) {
              if (res.data.result.tariff === "BASIC") {
                // if (productsLength >= 1 || this.state.myOrdersAmount >= 1)
                if (productsLength >= 1) {
                  return this.toggleUpgradeTariffModal();
                }
              }

              if (
                res.data.result.tariff === "BUSINESS" ||
                res.data.result.tariff === "BUSINESS_DEMO"
              ) {
                // if (productsLength >= 15 || this.state.myOrdersAmount >= 15)
                if (this.state.myOrdersAmount >= 15) {
                  return this.toggleUpgradeTariffModal();
                }
              }

              return this.toggleModal();
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {
      products,
      openModal,
      upgradeTariffModalIsOpen,
      displayList,
      categories,
    } = this.state;
    const { isLoggedIn, userInfo, token, clientId } = this.props;
    if (isLoggedIn) {
      return (
        <div>
          <Search
            returnSearchResult={this.returnSearchResult}
            categories={categories}
          />
          <Filters
            returnAllProducts={this.returnAllProducts}
            returnResult={this.returnResult}
            products={this.state.products}
            person={userInfo.data.result.mail.id}
            token={token}
            clientId={clientId}
            purpose="BUY"
            toggleModal={this.checkTariffPlan}
            buttonValue="Create new request"
            page="requests"
          />
          <RequestsList
            products={products}
            reqDetailsShow={this.props.reqDetailsShow}
            displayList={displayList}
          />
          <ProductModal
            open={openModal}
            toggleModal={this.toggleModal}
            categories={categories}
            token={token}
            clientId={clientId}
            purpose="BUY"
            buttonText="REQUEST"
          />
          <UpgradeTariff
            title="Need more request for publishing?"
            open={upgradeTariffModalIsOpen}
            toggleModal={this.toggleUpgradeTariffModal}
          />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
    userInfo: state.loggedIn,
    companyId: state.loggedIn.data.result.company_profile,
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
)(Requests);
