import React from "react";
import { Field, reduxForm } from "redux-form";
import { Col, Row } from "reactstrap";
import { renderInputField } from "../../ui_components/utils/Inputs";
import { CardInput, CardDate } from "../containers/CardInput";
import validateFunc from "../containers/validate";

/* Icons */
import pers from "../../../assets/img/card/person.png";
import cc from "../../../assets/img/card/cc.png";
import card from "../../../assets/img/card/card.png";
import lock from "../../../assets/img/card/lock.png";

const TariffCardForm = props => {
  return (
    <form>
      <img className="card-ico" src={pers} />
      <Field
        name="name"
        placeholder="Name Surname"
        component={renderInputField}
        type="text"
      />
      <img className="card-ico" src={cc} />
      <Field
        name="card_num"
        placeholder="Card number"
        component={CardInput}
        type="text"
      />
      <Row>
        <Col xs="12" md="6">
          <img className="card-ico" src={card} />
          <Field
            name="date"
            placeholder="Date thru"
            component={CardDate}
            type="text"
          />
        </Col>
        <Col xs="12" md="6">
          <img className="card-ico" src={lock} />
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
  form: "opn_card_form",
  validate: validateFunc,
})(TariffCardForm);
