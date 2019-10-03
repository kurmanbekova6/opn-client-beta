import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Row, Col } from "reactstrap";
import { Dispatch } from "redux";
import { formNamesConst } from "../../../consts";
import { EditIcon } from "../../../consts/icons";
import { renderSelectStyled } from "../../ui_components/utils/inputsStyled/inputsStyled";
/* Custom ui */
import {
  renderInputField,
  renderSelectField,
} from "../../ui_components/utils/Inputs";

/* Validation */
const required = value => (value ? undefined : "This field is required");

const MakeOrderForm = props => {
  return (
    <form className="make-order-form">
      <Field
        name="title"
        validate={required}
        label="Title of propose:"
        placeholder=""
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="want"
        validate={required}
        label="I want to BUY / I want to SELL:"
        component={renderSelectStyled}
        itemsList={props.bySell}
      />
      <Field
        name="name"
        validate={required}
        label="Company name:"
        placeholder=""
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="country"
        label="Country:"
        placeholder="Country"
        itemsList={props.countriesList}
        component={renderSelectStyled}
      />
      <Field
        name="announce"
        validate={required}
        label="Announce of propose:"
        placeholder=""
        component={renderInputField}
        type="date"
        addonAfter={EditIcon}
      />
      <Field
        name="delivTerms"
        validate={required}
        label="Delivery terms (days):"
        component={renderSelectStyled}
        itemsList={props.delivTime}
      />
      <Field
        name="delivVar"
        validate={required}
        label="Delivery variants:"
        component={renderSelectStyled}
        itemsList={props.deliveryVars}
      />
      <Field
        name="parameters"
        validate={required}
        label="Parameters:"
        placeholder="abc (370 symbols)"
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="requirements"
        validate={required}
        label="Requirements for participants:"
        placeholder="abc (370 symbols)"
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Row>
        <Col xs="12" md="6">
          <Field
            name="price"
            validate={required}
            label="Price:"
            placeholder="10000"
            component={renderInputField}
            type="text"
            addonAfter={EditIcon}
          />
        </Col>
        <Col xs="12" md="6">
          <div className="units-select">
            <Field
              id="units"
              name="units"
              validate={required}
              label="Units:"
              placeholder="Units"
              component={renderSelectStyled}
              itemsList={props.formUnits}
            />
          </div>
        </Col>
      </Row>

      <Field
        name="currency"
        validate={required}
        label="Currency:"
        component={renderSelectStyled}
        itemsList={props.curr}
      />
    </form>
  );
};
export default reduxForm({
  form: formNamesConst.MAKE_ORDER_FORM,
  // validate: companyInfoValidators,
})(MakeOrderForm);
