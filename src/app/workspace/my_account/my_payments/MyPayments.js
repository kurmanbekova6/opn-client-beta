import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
// Redux
import { loginStatus } from "../../../../redux/actions/userActions";
// Components
import PaymentsList from "./PaymentsList/PaymentsList";
import ResponseMessage from "../../../ui_components/responseMessage/ResponseMessage";

import "./css/myPayments.scss";

const tabs = [
  {
    id: 0,
    name: "All",
    value: "ALL",
    active: true,
  },
  {
    id: 1,
    name: "Pending",
    value: "PENDING",
    active: false,
  },
  {
    id: 2,
    name: "Confirmed",
    value: "CONFIRMED",
    active: false,
  },
  {
    id: 3,
    name: "Canceled",
    value: "DONE",
    active: false,
  },
];

class MyPayments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPayments: [],
      tabs: tabs,
      activeTab: 0,
      errors: [],
    };
  }

  componentDidMount() {
    axios
      .post(`/invoice/my`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
        count: 250,
        offset: 0,
      })
      .then(res => {
        const allPaymentsList = [
          ...res.data.result.CLOSED.pay,
          ...res.data.result.PLACED.pay,
          ...res.data.result.REJECTED.pay,
        ];

        allPaymentsList.forEach(item => {
          axios
            .post(`/msg/chat/info`, {
              access_token: this.props.token,
              clientId: this.props.clientId,
              chat: item.chat,
            })
            .then(res => {
              item.offerData = {
                name: res.data.result.order.name,
                currency: res.data.result.offer.currency,
                price: res.data.result.offer.price,
              };
            })
            .then(() =>
              this.setState({
                allPayments: allPaymentsList,
              })
            )
            .catch(error => {
              console.log(error);
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setActiveTab = id => {
    let newTabs = tabs.map(tab =>
      tab.id === id ? { ...tab, active: true } : { ...tab, active: false }
    );
    this.setState({
      tabs: newTabs,
      activeTab: id,
    });
  };

  render() {
    const { allPayments, tabs, activeTab, errors } = this.state;

    if (this.props.isLoggedIn) {
      return (
        <div className="mypayments_container">
          <div className="mypayments-header">
            <div className="mypayments-tabs">
              {tabs.map(tab => (
                <p
                  key={tab.id}
                  className={`mypayments-tabs_item ${
                    tab.active ? "mypayments-tabs_item__active" : ""
                  }`}
                  onClick={() => this.setActiveTab(tab.id)}
                >
                  {tab.name}
                </p>
              ))}
            </div>
          </div>
          <div className="mypayments-wrapper">
            {/* <p className="mypayments_date-separator">22 february</p> */}
            {errors && errors.length !== 0
              ? errors.map((error, i) => (
                  <ResponseMessage
                    key={i}
                    textAlign="center"
                    message={error}
                    type="error"
                  />
                ))
              : null}
            <ul className="mypayments-list">
              <PaymentsList activeTab={activeTab} payments={allPayments} />
            </ul>
          </div>
        </div>
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
  };
};

export default connect(mapStateToProps)(MyPayments);
