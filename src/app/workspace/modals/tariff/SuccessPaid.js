import React from "react";
import { Link } from "react-router-dom";
// Material UI
import Modal from "@material-ui/core/Modal";

import {
  MaterialPrimaryButton,
  MaterialFixedTextButton,
} from "../../../ui_components/materialBased/materialBasedButtons";
import successCheck from "../../../../assets/img/svg/success-check.svg";
import "./success-paid.scss";

const SuccessPaid = props => {
  return (
    <Modal open={props.isOpen} onClose={props.toggleSuccessModal}>
      <div className="success-paid">
        <img src={successCheck} alt="success check" />
        <p className="success-paid_title">The deal was successfully closed</p>
        <p className="success-paid_info">
          Invoice of the deal was attached to the payment, you can check it at
          Payments section
        </p>
        <Link to="/my-account?tab=invoices">
          <MaterialPrimaryButton
            label="Check payment"
            type="button"
            style={{
              outline: "none",
              width: "100%",
              height: 48,
              margin: "0 0 1em 0",
              padding: 0,
              fontSize: 14,
              letterSpacing: 1,
              boxShadow: "none",
              borderRadius: 12,
              textTransform: "uppercase",
            }}
          />
        </Link>
        <MaterialFixedTextButton
          onClick={props.toggleSuccessModal}
          label="Done"
        />
      </div>
    </Modal>
  );
};

export default SuccessPaid;
