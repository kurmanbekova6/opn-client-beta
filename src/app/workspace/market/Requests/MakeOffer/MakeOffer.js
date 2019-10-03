import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import "../css/makeOffer.scss";
// Material UI
import {
  MaterialPrimaryButton,
  MaterialNotContainedButton,
} from "../../../../ui_components/materialBased/materialBasedButtons";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// Forms

class MakeOffer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      currentStep: 1,
      stepOne: true,
      stepTwo: false,
      stepThree: false,
    };
  }

  setStep = stepNumber => {
    this.setState({
      currentStep: stepNumber,
    });
  };
  openModal = () => {
    console.log(`%c MAKE AN OFFER`, "color: orange");
    if (window.location.host === "opnplatform.com") {
      /* intercom event */
      window.Intercom("update", {
        app_id: "ulueqf5y",
        name: this.props.loggedIn.data.result.name, // Full name
        email: this.props.loggedIn.data.result.mail.id, // Email address
        "Button clicked": "Make an Order",
      });
    }
    this.setState({ openModal: true, currentStep: 1 });
  };
  closeModal = () => {
    this.setState({
      openModal: false,
    });
  };

  render() {
    const { category, name, handleSubmit, product } = this.props;
    const { openModal, currentStep } = this.state;

    return (
      <React.Fragment>
        {console.log(this.state.currentStep)}
        <MaterialPrimaryButton
          onClick={this.openModal}
          label=" MAKE AN OFFER"
          style={{
            outline: "none",
            borderRadius: "12px",
            margin: 0,
            boxShadow: "none",
            color: "#ffffff",
            height: "48px",
            maxWidth: "179px",
            letterSpacing: "1px",
          }}
        />

        {/*<Modal*/}
        {/*  aria-labelledby="simple-modal-title"*/}
        {/*  aria-describedby="simple-modal-description"*/}
        {/*  open={openModal}*/}
        {/*  onClose={() => this.closeModal("stepOne")}*/}
        {/*>*/}
        {/*  <div className="make-order_step-one">*/}
        {/*    <div className="make-order_step-one_head">*/}
        {/*      <div className="make-order_step-one_head-name">Preorder</div>*/}
        {/*      <div className="make-order_step-one_head-step">*/}
        {/*        <span className="make-order_step-one_head-step-text">{`Step ${currentStep}/2`}</span>*/}
        {/*        <IconButton*/}
        {/*          size="small"*/}
        {/*          className="make-order_step-one_head-step-close"*/}
        {/*        >*/}
        {/*          <CloseIcon onClick={() => this.closeModal("stepOne")} />*/}
        {/*        </IconButton>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="make-order_step-one_body">*/}
        {/*      {currentStep === 1 ? (*/}
        {/*        <StepOneForm*/}
        {/*          {...this.props}*/}
        {/*          category={category}*/}
        {/*          name={name}*/}
        {/*          setStep={this.setStep}*/}
        {/*          product={product}*/}
        {/*        />*/}
        {/*      ) : (*/}
        {/*        <Fragment />*/}
        {/*      )}*/}
        {/*      {currentStep === 2 ? (*/}
        {/*        <StepTwoForm*/}
        {/*          {...this.props}*/}
        {/*          setStep={this.setStep}*/}
        {/*          product={product}*/}
        {/*        />*/}
        {/*      ) : (*/}
        {/*        <Fragment />*/}
        {/*      )}*/}
        {/*      {currentStep === 3 ? (*/}
        {/*        <StepThreeForm*/}
        {/*          {...this.props}*/}
        {/*          setStep={this.setStep}*/}
        {/*          product={product}*/}
        {/*        />*/}
        {/*      ) : null}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Modal>*/}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    initialValues: {
      paymentVariant: "stripe",
    },
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "makeOfferForm",
  })(MakeOffer)
);
