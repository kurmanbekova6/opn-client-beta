import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
//  Redux
import { connect } from "react-redux";
import { loginStatus } from "../../../../redux/actions/userActions";
//  Material Ui
import { MaterialPrimaryButton } from "../../../ui_components/materialBased/materialBasedButtons";
// Components
import UpgradeTariff from "../../modals/upgradeTariff/upgradeTariff";
import ProductModal from "../../market/Products/ProductModal/ProductModal";
import ProductsList from "./ProductsList";
import ProductsTabs from "./ProductsTabs";
import "./css/my_products.scss";
// Errors
import { errorMessageParser } from "../../../utils/errorMessageParser";
import ResponseMessage from "../../../ui_components/responseMessage/ResponseMessage";
class MyProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myRequestsAmount: [],
      productType: "published",
      products: [],
      draftProducts: [],
      openModal: false,
      categories: [],
      errors: [],
    };
  }

  componentDidMount() {
    this.getMyProducts();
    this.getMyRequest();
    this.getDraftProducts();
    this.getCategoryList();
  }

  getMyProducts = () => {
    axios
      .post(`/orders/get/${this.props.isLoggedIn ? 1 : 0}/my`, {
        clientId: this.props.clientId,
        access_token: this.props.token !== "" ? this.props.token : "",
        count: 200,
        offset: 0,
        purpose: "BUY",
      })
      .then(res => {
        if (res.status === 200) {
          const publishedProducts = res.data.result.filter(item => {
            item.status !== "DRAFT";
          });
          this.setState({
            products: publishedProducts,
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

  getDraftProducts = () => {
    axios
      .post("/orders/drafts", {
        clientId: this.props.clientId,
        access_token: this.props.token !== "" ? this.props.token : "",
        count: 200,
        offset: 0,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            draftProducts: res.data.result,
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

  changeProductsType = type => {
    /**
     * type: published or draft
     */

    this.setState({
      productType: type,
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
                if (productsLength >= 15) {
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
      openModal,
      upgradeTariffModalIsOpen,
      categories,
      errors,
    } = this.state;
    const { clientId, token, isLoggedIn } = this.props;

    if (isLoggedIn) {
      return (
        <main className="my-products">
          <div className="my-products-header">
            <ProductsTabs
              onChangeTab={this.changeProductsType}
              isActiveTab={this.state.productType}
            />

            <MaterialPrimaryButton
              label="Create new product"
              type="button"
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
              disabled
              onClick={this.checkTariffPlan}
            />
          </div>

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

          <ProductsList
            products={
              this.state.productType === "published"
                ? this.state.products
                : this.state.draftProducts
            }
            actionButton={this.state.productType}
          />

          <ProductModal
            open={openModal}
            toggleModal={this.toggleModal}
            categories={categories}
            token={token}
            clientId={clientId}
            purpose="SELL"
          />

          <UpgradeTariff
            title="Need more product for publishing?"
            open={upgradeTariffModalIsOpen}
            toggleModal={this.toggleUpgradeTariffModal}
          />
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
)(MyProducts);
