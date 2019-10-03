import React from "react";
import { Col, Row } from "reactstrap";
import { renderInputField } from "../../ui_components/utils/Inputs";
import { Field, reduxForm } from "redux-form";
import CheckboxGroup from "./CheckboxGroup";
import validateFunc from "../containers/validateEnt";

const EnterpriseForm = () => {
  let customer = [
    { id: 1, name: "I am a new customer" },
    { id: 2, name: "I am an existing customer" },
  ];
  let shipment = [
    { id: 3, name: "Yes" },
    { id: 4, name: "No" },
    { id: 5, name: "Maybe" },
  ];
  let contact = [
    { id: 6, name: "Phone" },
    { id: 7, name: "Email" },
    { id: 8, name: "Skype" },
    { id: 9, name: "Telegram" },
  ];

  return (
    <div className="enterpr-form-cntnr">
      <form>
        <Row>
          <Col xs="12" md="6">
            <Field
              name="email"
              placeholder="Email"
              component={renderInputField}
              type="email"
            />
            <div className="main-radio-cntnr">
              <div className="check-ttl">
                are you a new or existing customer?
              </div>
              <Field
                name="customer"
                component={CheckboxGroup}
                options={customer}
              />
            </div>
            <Field
              name="users"
              placeholder="How big is your team?"
              component={renderInputField}
              type="text"
            />
            <Field
              name="products"
              placeholder="How many products will you place?"
              component={renderInputField}
              type="text"
            />
            <Field
              name="storage"
              placeholder="How many storage do you need?"
              component={renderInputField}
              type="text"
            />
            <Field
              name="orderFrequency"
              placeholder="How often do you order material?"
              component={renderInputField}
              type="text"
            />
            <div className="main-radio-cntnr">
              <div className="check-ttl">How do you cross border shipment?</div>
              <Field
                name="shipment"
                component={CheckboxGroup}
                options={shipment}
              />
            </div>
          </Col>
          <Col xs="12" md="6">
            <Field
              name="comp_name"
              placeholder="Company name"
              component={renderInputField}
              type="text"
            />
            <Field
              name="name"
              placeholder="Your name"
              component={renderInputField}
              type="text"
            />
            <Field
              name="position"
              placeholder="Position"
              component={renderInputField}
              type="text"
            />
            <Field
              name="phone"
              placeholder="Phone number"
              component={renderInputField}
              type="text"
            />
            <Field
              name="skype"
              placeholder="Skype"
              component={renderInputField}
              type="text"
            />
            <Field
              name="comments"
              placeholder="Questions and comments"
              component={renderInputField}
              type="text"
            />
            <div className="main-radio-cntnr">
              <div className="check-ttl">preferred contact method</div>
              <Field
                name="contact"
                component={CheckboxGroup}
                options={contact}
              />
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "enterprise_form",
  validate: validateFunc,
})(EnterpriseForm);
