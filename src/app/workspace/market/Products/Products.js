import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { loginStatus } from "../../../../redux/actions/userActions";
// Components
//import Search from "../../Search/Search";
import UpgradeTariff from "../../modals/upgradeTariff/upgradeTariff";
import Filters from "../Filters/Filters";
import ProductsList from "./ProductsList/ProductsList";
import ProductModal from "./ProductModal/ProductModal";
import DateDisplay from "./DateDisplay";
import Search from "../../../ui_components/search/Search";

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myRequestsAmount: [],
      products: [],
      noFiltered: [],
      openModal: false,
      categories: [],
      loggedIn: true,
      upgradeTariffModalIsOpen: false,
    };
  }

  componentDidMount() {
    this.getAllProducts();
    this.getCategoryList();
    this.getMyRequest();
  }

  getAllProducts = () => {
    axios
      .post(`/orders/get/${this.props.isLoggedIn ? 1 : 0}/all`, {
        clientId: this.props.clientId,
        access_token: this.props.token !== "" ? this.props.token : "",
        count: 200,
        offset: 0,
        purpose: "BUY",
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            products: res.data.result,
            noFiltered: res.data.result,
          });
        }
      })
      .catch(error => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          this.props.changeLoginStatus(false);
        }
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

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  getFilteredProducts = products => {
    let result = [];
    console.log("F", products);
    products.map(product => {
      product.map(prod => {
        result.push(prod);
      });
    });
    console.log("Res", result);
    this.setState({
      products: result,
    });
  };

  getMyRequest = () => {
    axios
      .post(`/msg/box/chats`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
        count: 250,
        offset: 0,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ myRequestsAmount: res.data.result.length });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

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
                // if (productsLength >= 1 || this.state.myRequestsAmount >= 1)
                if (productsLength >= 1) {
                  return this.toggleUpgradeTariffModal();
                }
              }

              if (
                res.data.result.tariff === "BUSINESS" ||
                res.data.result.tariff === "BUSINESS_DEMO"
              ) {
                // if (productsLength >= 15 || this.state.myRequestsAmount >= 15)
                if (this.state.myRequestsAmount >= 15) {
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
      categories,
    } = this.state;
    const { isLoggedIn, userInfo, token, clientId } = this.props;
    if (isLoggedIn) {
      return (
        <div>
          <Search
            returnSearchResult={this.returnResult}
            products={products}
            getFilteredProducts={this.getFilteredProducts}
            clearFilter={this.getAllProducts}
          />
          <Filters
            returnAllProducts={this.returnAllProducts}
            returnResult={this.returnResult}
            products={this.state.products}
            person={userInfo.data.result.mail.id}
            token={token}
            clientId={clientId}
            toggleModal={this.checkTariffPlan}
            buttonValue="Create new product"
            page="products"
          />
          <DateDisplay style={{ marginLeft: "31px", marginBottom: "20px" }} />
          <ProductsList
            products={products}
            prodDetailsShow={this.props.prodDetailsShow}
          />

          <ProductModal
            open={openModal}
            toggleModal={this.toggleModal}
            categories={categories}
            token={token}
            clientId={clientId}
            purpose="BUY"
          />

          <UpgradeTariff
            title="Need more product for publishing?"
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
)(Products);
