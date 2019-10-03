import React from "react";
// Material UI
import Modal from "@material-ui/core/Modal";

import { MaterialPrimaryButton } from "../../../ui_components/materialBased/materialBasedButtons";
import successCheck from "../../../../assets/img/svg/success-check.svg";

const SuccessInvited = props => {
  return (
    <Modal
      open={props.isSuccessInvited}
      onClose={props.toggleSuccessInvitedModal}
    >
      <div className="success-paid">
        <img src={successCheck} alt="success check" />
        <p className="success-paid_title">Well done!</p>
        <p className="success-paid_info">
          The invitation to your logistic carrier was successfully sent.
        </p>
        <MaterialPrimaryButton
          label="Done"
          type="button"
          onClick={props.toggleSuccessInvitedModal}
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
      </div>
    </Modal>
  );
};

export default SuccessInvited;
