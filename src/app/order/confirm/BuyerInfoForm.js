import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderInputField } from "../../ui_components/utils/Inputs";
import { formNamesConst } from "../../../consts";
import ColumnHeader from "../../ui_components/Titles/ColumnHeader";

let BuyerInfoForm = () => {
  return (
    <React.Fragment>
      <ColumnHeader value="Buyer info" />

      <form className="product-order-form_long">
        <Field
          name="company"
          label="Company name:"
          placeholder=""
          component={renderInputField}
          type="text"
        />
        <Field
          name="country"
          label="Country"
          placeholder=""
          component={renderInputField}
          type="text"
        />
        <Field
          name="address"
          label="Address"
          placeholder=""
          component={renderInputField}
          type="text"
        />
        <Field
          name="zipCode"
          label="ZIP Code:"
          placeholder=""
          component={renderInputField}
          type="number"
        />
        <Field
          name="phone"
          label="Phone:"
          placeholder=""
          component={renderInputField}
          type="tel"
        />
        <Field
          name="site"
          label="Site:"
          placeholder=""
          component={renderInputField}
          type="text"
        />
        <Field
          name="email"
          label="Email:"
          placeholder=""
          component={renderInputField}
          type="email"
        />
      </form>
    </React.Fragment>
  );
};

export default reduxForm({
  form: formNamesConst.ORDER_BUYER_FORM,
})(BuyerInfoForm);
