import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Col, Row } from "reactstrap";
import {
  renderInputField,
  renderSelectField,
} from "../../ui_components/utils/Inputs";
import { CardInput, CardDate } from "../../tariff/containers/CardInput";
import { Dispatch } from "redux";
import validateFunc from "./modalFormValidation";
import selectIcon from "../../../assets/img/select-icon.png";

const ModalForm = props => {
  const { order } = props;
  return (
    <form>
      <Field
        name="company"
        placeholder="Company"
        component={renderInputField}
        type="text"
      />
      <Field
        name="order-num"
        value={`#${order}`}
        placeholder={`#${order}`}
        disabled={true}
        component={renderInputField}
        type="text"
      />
      <Row>
        <Col xs="12" md="6">
          <Field
            name="price"
            placeholder="Your price (per)"
            component={renderInputField}
            type="text"
          />
        </Col>
        <Col xs="12" md="6">
          <Field
            id="units"
            name="units"
            placeholder="Units"
            component={renderSelectField}
            type="text"
          >
            <option value="kg" selected={true}>
              Kilogramm
            </option>
            <option value="tn">Tonn</option>
            <option value="l">Liters</option>
            <option value="cm3">Cubic centimeters</option>
            <option value="m2">Square meters</option>
            <option value="m3">Cubic meters</option>
          </Field>
        </Col>
      </Row>

      <Field
        name="amount"
        placeholder="Purchase amount:"
        component={renderInputField}
        type="text"
      />
      <Field
        name="logistic"
        component={renderSelectField}
        addonAfter={selectIcon}
      >
        <option value="Delivery variants:" selected>
          Delivery variants:
        </option>
        <option value="EXW">EXW</option>
        <option value="FCA">FCA</option>
        <option value="CPT">CPT</option>
        <option value="CIP">CIP</option>
        <option value="DAT">DAT</option>
        <option value="DAP">DAP</option>
        <option value="DDP">DDP</option>
        <option value="FAS">FAS</option>
        <option value="FOB">FOB</option>
        <option value="CFR">CFR</option>
        <option value="CIF">CIF</option>
      </Field>
      <Field
        name="comments"
        placeholder="Comments"
        component={renderInputField}
        type="text"
      />
      <Field
        name="email"
        placeholder="Email"
        component={renderInputField}
        type="email"
      />
      <Field
        name="card_num"
        placeholder="Card number"
        component={CardInput}
        type="text"
      />
      <Row>
        <Col xs="12" md="6">
          <Field
            name="date"
            placeholder="Date thru"
            component={CardDate}
            type="text"
          />
        </Col>
        <Col xs="12" md="6">
          <Field
            name="cvv"
            placeholder="CVV"
            component={renderInputField}
            type="text"
          />
        </Col>
      </Row>
    </form>
  );
};

export default reduxForm({
  form: "opn_order_modal_form",
  validate: validateFunc,
})(ModalForm);
