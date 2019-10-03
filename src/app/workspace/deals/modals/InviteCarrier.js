import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { reset } from "redux-form";
import { Link } from "react-router-dom";
import axios from "axios";
// Material UI
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import InviteCarrierForm from "./InviteCarrierForm";

class InviteCarrier extends React.Component {
  constructor(props) {
    super(props);
  }

  onFormSubmit = values => {
    this.props.handleSubmit(values);
    axios
      .post(`/user/invite/logistic`, {
        clientId: this.props.clientId,
        access_token: this.props.token,
        chat: this.props.chatId,
        email: values.email,
      })
      .then(res => {
        if (res.status === 200) {
          console.log("RESAUL", res);
          reset("InviteCarrierForm");
          this.props.toggleCarrierModal();
          this.props.toggleSuccessInvitedModal();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { isOpen, toggleCarrierModal, handleSubmit, submitting } = this.props;

    return (
      <Modal open={isOpen} onClose={toggleCarrierModal}>
        <div className="make-order_step-one">
          <div className="make-order_step-one_head">
            <div className="make-order_step-one_head-name">Invite carrier</div>
            <div className="make-order_step-one_head-step">
              <IconButton
                size="small"
                className="make-order_step-one_head-step-close"
              >
                <CloseIcon onClick={toggleCarrierModal} />
              </IconButton>
            </div>
          </div>
          <div className="make-order_step-one_body">
            <div>
              <InviteCarrierForm
                onFormSubmit={this.onFormSubmit}
                handleSubmit={handleSubmit}
                submitting={submitting}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "InviteCarrierForm",
  })(InviteCarrier)
);
