import React from "react";
import { injectStripe } from "react-stripe-elements";
import { CardElement } from "react-stripe-elements";
import axios from "axios";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
  }

  handleSubmit = ev => {
    ev.preventDefault();

    this.props.stripe.createToken({ name: "Jenny Rosen" }).then(({ token }) => {
      
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement style={{ base: { fontSize: "18px" } }} />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
