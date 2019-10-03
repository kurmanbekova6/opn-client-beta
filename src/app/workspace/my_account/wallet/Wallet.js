import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { prodClientId, testClientId } from "../../../tariff/Stripe/stripe";
import stripe from "../../../../assets/img/wallet/stripe-gradient.svg";
// import plaid from "../../../../assets/img/wallet/plaid.svg";
import plaidGrey from "../../../../assets/img/wallet/plaid-grey.svg";
import stripeGrey from "../../../../assets/img/wallet/stripe-grey.svg";
import "./css/wallet.scss";

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStripe: "",
    };
  }

  componentDidMount() {
    axios
      .post("/user/lookup", {
        access_token: this.props.token,
        clientId: this.props.clientId,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            isStripe: res.data.result.customAccountId,
          });
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    let apiKey = "";
    let redirectUri = "";
    if (window.location.host === "localhost:3000") {
      apiKey = testClientId;
      redirectUri = "https://localhost:3000/stripe-response";
    } else if (window.location.host === "dev.opnplatform.com") {
      apiKey = testClientId;
      redirectUri = "https://dev.opnplatform.com/stripe-response";
    } else if (window.location.host === "opnplatform.com") {
      apiKey = prodClientId;
      redirectUri = "";
    }

    const { isStripe } = this.state;
    console.log(isStripe);
    return (
      <div className="wallet">
        <div className="wallet-item">
          {!isStripe ? (
            <Fragment>
              <img className="wallet-item_img" src={stripeGrey} />
              <a
                className="wallet-item_connect"
                href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${apiKey}&scope=read_write&redirect_uri=${redirectUri}`}
              >
                Connect
              </a>
              <p className="wallet-item_note">What is Stripe?</p>
              <div className="wallet-item_about-stripe">
                <p>
                  Stripe is a technology company that builds economic
                  infrastructure for the internet. Businesses of every size—from
                  new startups to public companies—use our software to accept
                  payments and manage their businesses online.
                </p>
                <a href="https://stripe.com" className="wallet-item_to-stripe">
                  stripe.com
                </a>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <img className="wallet-item_img" src={stripe} />
              <div className="wallet-item_connected">
                <span className="wallet-item_connected-green" />
                <span className="wallet-item_connected-text">Connected</span>
              </div>
            </Fragment>
          )}
        </div>

        <div className="wallet-item">
          <Fragment>
            <img className="wallet-item_img" src={plaidGrey} />
            <p className="wallet-item_notice">Comming soon</p>
          </Fragment>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    clientId: state.clientId,
    token: state.token,
  };
};

export default connect(mapStateToProps)(Wallet);
