import React from "react";
// Material UI
import Grid from "@material-ui/core/Grid";

// Components
import MyProducts from "./my_products/MyProducts";
import MyRequests from "./my_requests/MyRequests";
import Documents from "./documents/Documents";
import Pricing from "./pricing/Pricing";
import MyPayments from "./my_payments/MyPayments";
import Wallet from "./wallet/Wallet";

import "./css/account.scss";

const marketSidebar = [
  { id: 0, title: "Wallet" },
  { id: 1, title: "Products" },
  { id: 2, title: "Requests" },
  { id: 3, title: "Invoices" },
  { id: 4, title: "Documents" },
  { id: 5, title: "Pricing" },
];

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const urlParam = url.searchParams.get("tab");

    if (urlParam === "invoices") {
      this.setState({ activeTab: 3 });
    }
    if (urlParam === "pricing") {
      this.setState({ activeTab: 5 });
    }
  }

  changeActiveTab = tabId => {
    this.setState({ activeTab: tabId });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <main className="market">
        <Grid container>
          <Grid item xs={12} md={2}>
            <div className="account-sidebar">
              {marketSidebar.map(item => (
                <p
                  key={item.id}
                  className={
                    item.id === activeTab
                      ? "account-sidebar_item account-sidebar_item__active"
                      : "account-sidebar_item"
                  }
                  onClick={
                    item.id === 3 ? null : () => this.changeActiveTab(item.id)
                  }
                >
                  {item.title}
                </p>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} md={8}>
            <div className="account-content">
              {activeTab === 0 ? (
                <Wallet />
              ) : activeTab === 1 ? (
                <MyProducts />
              ) : activeTab === 2 ? (
                <MyRequests />
              ) : activeTab === 3 ? (
                <MyPayments />
              ) : activeTab === 4 ? (
                <Documents />
              ) : (
                <Pricing />
              )}
            </div>
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default Account;
