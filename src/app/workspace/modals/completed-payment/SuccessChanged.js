import React from "react";
// Material UI
import Modal from "@material-ui/core/Modal";

import { MaterialPrimaryButton } from "../../../ui_components/materialBased/materialBasedButtons";
import successCheck from "../../../../assets/img/svg/success-check.svg";
import "./success-changed.scss";

const SuccessChanged = props => {
  return (
    <Modal open={props.noticeIsOpen} onClose={props.toggleNotice}>
      <div className="success-changed">
        <img src={successCheck} alt="success check" />
        <p className="success-changed_title">Success</p>
        <p className="success-changed_info">
          Your payment was successful!
          <br />
          You can now continue using OPN Platform
        </p>
        <MaterialPrimaryButton
          label="Done"
          type="button"
          onClick={props.toggleNotice}
          style={{
            outline: "none",
            width: "100%",
            height: 48,
            margin: 0,
            padding: 0,
            fontSize: 14,
            letterSpacing: 1,
            boxShadow: "none",
            borderRadius: 12,
            textTransform: "uppercase",
          }}
        />
      </div>
    </Modal>
  );
};

export default SuccessChanged;
