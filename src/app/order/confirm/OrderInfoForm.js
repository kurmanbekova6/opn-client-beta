import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  renderInputField,
  renderSelectField,
} from "../../ui_components/utils/Inputs";
import { formNamesConst } from "../../../consts";
import ColumnHeader from "../../ui_components/Titles/ColumnHeader";

let OrderInfoForm = () => {
  return (
    <React.Fragment>
      <ColumnHeader value="Order info" />

      <form className="product-order-form_long">
        <Field
          name="productAmount"
          label="How much product do you want to buy (ton)"
          placeholder=""
          component={renderInputField}
          type="text"
        />
        <Field
          name="delivery"
          label="Delivery (logistic variant)"
          placeholder=""
          component={renderSelectField}
          type="text"
        >
          <option value="" disabled selected />
          <option value="opk">OPK</option>
          <option value="opk2">OPK</option>
        </Field>

        <Field
          name="deliveryPlace"
          label="Place for delivery"
          placeholder=""
          component={renderInputField}
          type="text"
        />
        <Field
          name="deliveryDate"
          label="Date for delivery"
          placeholder=""
          component={renderInputField}
          type="text"
        />
        <Field
          name="contact"
          label="Contact person"
          placeholder=""
          component={renderInputField}
          type="text"
        />
        <Field
          name="otherInfo"
          label="Other  important information"
          placeholder=""
          component={renderInputField}
          type="text"
        />

        <button className="product-order__trans-btn">Confirm Order</button>
      </form>
    </React.Fragment>
  );
};

export default reduxForm({
  form: formNamesConst.ORDER_CONFIRM_FORM,
})(OrderInfoForm);
