import React, { Component } from "react";
import { connect } from "react-redux";
import { tariffPlans } from "./priceData";
import { Redirect } from "react-router-dom";
// Material UI
import Grid from "@material-ui/core/Grid";
// Components
import SuccessChanged from "../../modals/completed-payment/SuccessChanged";
import PriceItem from "./PriceItem";
import StripeForm from "./modals/stripeForm/StripeForm";
import { stripe } from "./stripe.js";
import "../css/account.scss";

class Pricing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: "testClientId",
      modalIsOpen: false,
      noticeIsOpen: false,
      redirectUri: "",
    };
  }

  componentDidMount = () => {
    console.log(window.location.host);
    if (window.location.host === "localhost:3000") {
      this.setState({
        apiKey: stripe.testClientId,
        redirectUri: "https://localhost:3000/stripe-response",
      });
    } else if (window.location.host === "dev.opnplatform.com") {
      this.setState({
        apiKey: stripe.testClientId,
        redirectUri: "https://dev.opnplatform.com/stripe-response",
      });
    } else if (window.location.host === "opnplatform.com") {
      this.setState({
        apiKey: stripe.prodClientId,
        redirectUri: "",
      });
    }
  };

  toggleModal = () => this.setState({ modalIsOpen: !this.state.modalIsOpen });
  toggleNotice = () =>
    this.setState({ noticeIsOpen: !this.state.noticeIsOpen });

  render() {
    const { apiKey, redirectUri, modalIsOpen, noticeIsOpen } = this.state;
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <Grid container className="pricing-container">
          {tariffPlans.map(tariff => (
            <PriceItem
              key={tariff.id}
              id={tariff.id}
              title={tariff.titleMain}
              content={tariff.content}
              bonus={tariff.bonus}
              plan={tariff.plan}
              price={tariff.price}
              apiKey={apiKey}
              redirectUri={redirectUri}
              modalIsOpen={modalIsOpen}
              toggleModal={this.toggleModal}
            />
          ))}
          <StripeForm
            modalIsOpen={modalIsOpen}
            toggleModal={this.toggleModal}
            toggleNotice={this.toggleNotice}
          />
          <SuccessChanged
            noticeIsOpen={noticeIsOpen}
            toggleNotice={this.toggleNotice}
          />
        </Grid>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.loginStatus,
  };
};

export default connect(
  mapStateToProps,
  null
)(Pricing);
