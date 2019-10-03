import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { normalizeAmount } from "../../../../../utils/normalizeFields";
// Custom Ui
import { MaterialPrimaryButton } from "../../../../../ui_components/materialBased/materialBasedButtons";
import { MaterialOutlinedInput } from "../../../../../ui_components/materialBased/materialBasedInputs";
import { MaterialOutlinedSelect } from "../../../../../ui_components/materialBased/materialBasedSelectInputs";

import { priceFormat } from "../../../../../utils/priceFormat";
import units from "../../../../../../consts/units";

class StepOneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      category,
      name,
      setStep,
      valid,
      product,
      orderDetailsForm,
    } = this.props;
    return (
      <Fragment>
        <div className="make-order_step-one_body-category">{category}</div>
        <div className="make-order_step-one_body-name">{name}</div>
        <div className="make-order_step-one_body-form">
          {/* <Field
            name="units"
            label="Units"
            component={MaterialOutlinedSelect}
            type="text"
            placeholder="Units"
            menuItems={units}
          /> */}
          <Field
            name="amount"
            label="Amount"
            component={MaterialOutlinedInput}
            type="text"
            normalize={normalizeAmount}
          />

          {orderDetailsForm && orderDetailsForm.amount ? (
            <p>
              Total: &euro;
              {orderDetailsForm.amount * priceFormat(product.price)}
            </p>
          ) : null}

          <MaterialPrimaryButton
            label="NEXT"
            disabled={!valid}
            onClick={() => {
              setStep(2);
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
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientId: state.clientId,
    access_token: state.loggedIn,
    orderDetailsForm: state.form.makeOrderForm.values,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     orderPaid: id => {
//       dispatch(orderPaid(id));
//     },
//     loginStatus: status => {
//       dispatch(loginStatus(status));
//     },
//   };
// };

export default connect(mapStateToProps)(StepOneForm);
