import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../../css/makeOrder.scss";
// Custom Ui
import {
  MaterialPrimaryButton,
  MaterialNotContainedButton,
} from "../../../../../ui_components/materialBased/materialBasedButtons";
// import { MaterialOutlinedSelect } from "../../../../../ui_components/materialBased/materialBasedSelectInputs";
import { MaterialOutlinedInput } from "../../../../../ui_components/materialBased/materialBasedInputs";
import { MaterialDatePicker } from "../../../../../ui_components/materialBased/materialBasedDatePicker";
import { priceFormat } from "../../../../../utils/priceFormat";
// Data
// import { deliveryMethods } from "./data";
// import { deliveryCompany } from "./data";

class StepTwoForm extends React.Component {
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
        access_token: this.props.access_token,
        order: product._id,
        offer: {
          price: orderDetailsForm.amount * priceFormat(product.price),
          amount: {
            number: +orderDetailsForm.amount,
            unit: product.amount.unit,
          },
          destination: orderDetailsForm.destination,
          date: orderDetailsForm.date,
          deliveryVariant: product.delivery.variant,
          comments: "-",
          email: product.company.profile.contacts.email,
          currency: product.currency ? product.currency : "EUR",
          tokenPayment: false,
          payment: "now",
        },
      })
      .then(res => {
        if (res.status === 200) {
          this.getMyRequests();
          this.createChat(res.data.result.order);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getMyRequests = () => {
    axios
      .post(`/orders/get/1/my`, {
        access_token: this.props.access_token,
        clientId: this.props.clientId,
        count: 250,
        offset: 0,
      })
      .then(res => {
        const data = res.data.result;
        let userRequests = [];

        data.map(item => {
          if (item.type === "ORDER") {
            userRequests.push(item);
          }
        });

        if (window.location.host === "opnplatform.com") {
          /* intercom event */
          window.Intercom("update", {
            app_id: "ulueqf5y",
            name: this.props.loggedIn.data.result.name, // Full name
            email: this.props.loggedIn.data.result.mail.id, // Email address
            "Placed requests": userRequests.length,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  createChat = orderId => {
    axios
      .post(`/msg/chat`, {
        clientId: this.props.clientId,
        access_token: this.props.access_token,
        order: orderId,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ redirectToDeal: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.state.redirectToDeal) {
      return <Redirect to="/deals" />;
    }

    const { valid, setStep } = this.props;
    return (
      <Fragment>
        <Field
          name="destination"
          label="Destination"
          component={MaterialOutlinedInput}
          type="text"
        />
        <Field
          name="date"
          label="Date"
          component={MaterialDatePicker}
          type="datetime-local"
          placeholder="Date"
        />
        {/* <Field
        name="deliveryVariant"
        label="Delivery variant"
        component={MaterialOutlinedSelect}
        type="text"
        placeholder="Delivery variant"
        menuItems={deliveryMethods}
      />
      <Field
        name="deliveryCompany"
        label="Delivery company"
        component={MaterialOutlinedSelect}
        type="text"
        placeholder="Delivery variant"
        menuItems={deliveryCompany}
      /> */}
        {/* <MaterialPrimaryButton
        label="NEXT"
        disabled={!props.valid}
        onClick={() => {
          setStep(3);
        }}
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
      /> */}
        {/* <MaterialPrimaryButton
          label="NEXT"
          disabled={!valid}
          onClick={this.createOrder}
          // onClick={() => {
          //   setStep(3);
          // }}
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
        /> */}
        <div className="make-order_button-holder">
          <MaterialNotContainedButton
            className="make-order_button"
            label="BACK"
            onClick={() => this.props.setStep(1)}
            style={{
              outline: "none",
              borderRadius: "12px",
              margin: 0,
              boxShadow: "none",
              color: "#ffffff",
              height: "48px",
              maxWidth: "50%",
              letterSpacing: "1px",
            }}
          />
          <MaterialPrimaryButton
            className="make-order_button"
            disabled={!valid}
            label="SEND THE ORDER"
            onClick={this.createOrder}
            style={{
              outline: "none",
              borderRadius: "12px",
              margin: 0,
              boxShadow: "none",
              color: "#ffffff",
              height: "48px",
              maxWidth: "50%",
              letterSpacing: "1px",
              fontSize: "12px",
            }}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientId: state.clientId,
    access_token: state.token,
    loggedIn: state.loggedIn,
    orderDetailsForm: state.form.makeOrderForm.values,
  };
};

export default connect(mapStateToProps)(StepTwoForm);
