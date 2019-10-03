import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { Redirect } from "react-router-dom";
import axios from "axios";
// Custom Ui
import { MaterialRadio } from "../../../../../ui_components/materialBased/materialBasedRadio";
import { MaterialPrimaryButton } from "../../../../../ui_components/materialBased/materialBasedButtons";
import { paymentVariant } from "./data";
import { priceFormat } from "../../../../../utils/priceFormat";

class StepThreeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToDeal: false };
  }

  createOrder = () => {
    const { product, orderDetailsForm } = this.props;
    /* TODO: get last category, need change by API */
    let productCategoryId = product.category.json.id;
    if (product.category.json.next && !product.category.json.next.next) {
      productCategoryId = product.category.json.next.id;
    }
    if (
      product.category.json.next.next &&
      !product.category.json.next.next.next
    ) {
      productCategoryId = product.category.json.next.next.id;
    }
    /* end */

    axios
      .post(`/orders/offer`, {
        clientId: this.props.clientId,
        access_token: this.props.token,
        order: product._id,
        offer: {
          price: orderDetailsForm.amount * priceFormat(product.price),
          amount: {
            number: +orderDetailsForm.amount,
            unit: product.amount.unit,
          },
          destination: orderDetailsForm.destination,
          date: orderDetailsForm.date,
          deliveryVariant: "FOB",
          comments: "-",
          email: product.company.profile.contacts.email,
          currency: product.currency,
          tokenPayment: false,
          payment: "now",
        },
      })
      .then(res => {
        if (res.status === 200) {
          //this.setState({ redirectToDeal: true });
          this.createChat();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  createChat = () => {
    axios
      .post("/msg/chat", {
        clientId: this.props.clientId,
        access_token: this.props.token,
        order: this.props.product._id,
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { valid, product } = this.props;

    if (this.state.redirectToDeal) {
      return <Redirect to="/deals" />;
    }

    return (
      <Fragment>
        <div className="make-order_step-one_body-variant">Payment variant</div>

        <Field
          name="paymentVariant"
          value="stripe"
          component={MaterialRadio}
          menuItems={paymentVariant}
        />
        {/* <Link
          to={{
            pathname: "/deals",
            state: { product: product },
          }}
        > */}
        <MaterialPrimaryButton
          disabled={!valid}
          type="submit"
          label="SEND THE ORDER"
          onClick={this.createOrder}
          style={{
            outline: "none",
            borderRadius: "12px",
            margin: 0,
            boxShadow: "none",
            color: "#ffffff",
            height: "48px",
            width: "320px",
            letterSpacing: "1px",
          }}
        />
        {/* </Link> */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientId: state.clientId,
    token: state.token,
    orderDetailsForm: state.form.makeOrderForm.values,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderPaid: id => {
      dispatch(orderPaid(id));
    },
    loginStatus: status => {
      dispatch(loginStatus(status));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepThreeForm);
