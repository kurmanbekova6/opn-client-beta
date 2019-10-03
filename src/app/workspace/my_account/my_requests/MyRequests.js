import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
// Custom UI
import { MaterialPrimaryButton } from "../../../ui_components/materialBased/materialBasedButtons";
// Components
import UpgradeTariff from "../../modals/upgradeTariff/upgradeTariff";
import RequestsResponses from "./RequestsResponses";
import ProductModal from "../../market/Products/ProductModal/ProductModal";
import RequestsTabs from "./RequestsTabs";
import RequestsList from "./RequestsList";
import "./css/my_requests.scss";

class MyRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myOrdersAmount: [],
      requestType: "incoming",
      requests: [],
      allResponses: false,
      openModal: false,
      categories: [],
    };
  }

  componentDidMount() {
    this.getMyOrders();
    this.getMyRequests();
    this.getCategoryList();
  }

  getMyRequests = () => {
    axios
      .post(`/orders/get/${this.props.isLoggedIn ? 1 : 0}/my`, {
        clientId: this.props.clientId,
        access_token: this.props.token !== "" ? this.props.token : "",
        count: 200,
        offset: 0,
        purpose: "SELL",
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            requests: res.data.result,
          });
        }
      })
      .catch(error => {
        console.log(error);
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

  showResponses = () => {
    this.setState({ allResponses: !this.state.allResponses });
  };

  changeRequestType = type => {
    /**
     * type: incoming or sent
     */

    this.setState({
      requestType: type,
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
                if (this.state.myOrdersAmount >= 1) {
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
      allResponses,
      openModal,
      upgradeTariffModalIsOpen,
      categories,
      myRequestsAmount,
    } = this.state;
    const { clientId, token } = this.props;

    return allResponses ? (
      <RequestsResponses showResponses={this.showResponses} />
    ) : (
      <main className="my-requests">
        <div className="my-requests-header">
          <RequestsTabs
            onChangeTab={this.changeRequestType}
            isActiveTab={this.state.requestType}
          />

          <MaterialPrimaryButton
            label="Create new request"
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

        <RequestsList
          requests={this.state.requests}
          requestType={this.state.requestType}
          showResponses={this.showResponses}
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
      </main>
    );
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

export default connect(mapStateToProps)(MyRequests);
