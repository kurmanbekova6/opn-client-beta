import React from "react";
// Material UI
import Grid from "@material-ui/core/Grid";

import Products from "./Products/Products";
import ProductsDetails from "./Products/ProductsDetails/ProductsDetails";
import Requests from "./Requests/Requests";
import RequestsDetails from "./Requests/RequestsDetails/RequestsDetails";
import "./css/market.scss";

const marketSidebar = [
  { id: 0, title: "Products" },
  { id: 1, title: "Requests" },
];

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      productDetails: false,
      requestsDetails: false,
      product: [],
      request: [],
    };
  }

  changeActiveTab = tabId => {
    this.setState({
      activeTab: tabId,
      productDetails: false,
      requestsDetails: false,
    });
  };

  prodDetailsShow = product => {
    this.setState({ productDetails: !this.state.productDetails, product });
  };

  reqDetailsShow = product => {
    this.setState({
      requestsDetails: !this.state.requestsDetails,
      request: product,
    });
  };

  render() {
    const {
      activeTab,
      productDetails,
      product,
      requestsDetails,
      request,
    } = this.state;

    return (
      <main className="market">
        <Grid container>
          <Grid item xs={12} md={2}>
            <div className="market-sidebar">
              {marketSidebar.map(item => (
                <p
                  key={item.id}
                  className={
                    item.id === activeTab
                      ? "market-sidebar_item market-sidebar_item__active"
                      : "market-sidebar_item"
                  }
                  onClick={() => this.changeActiveTab(item.id)}
                >
                  {item.title}
                </p>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} md={9}>
            <div className="market-content">
              {productDetails ? (
                <ProductsDetails
                  changeActiveTab={this.changeActiveTab}
                  product={product}
                />
              ) : requestsDetails ? (
                <RequestsDetails
                  changeActiveTab={this.changeActiveTab}
                  product={request}
                />
              ) : activeTab === 0 ? (
                <Products prodDetailsShow={this.prodDetailsShow} />
              ) : (
                <Requests reqDetailsShow={this.reqDetailsShow} />
              )}
            </div>
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default Market;
