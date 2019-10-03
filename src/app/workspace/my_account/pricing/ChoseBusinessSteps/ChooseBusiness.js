import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import "../css/stepsModal.scss";
import Modal from "@material-ui/core/Modal";
// Forms
import StepOneForm from "./Forms/StepOneForm";
import StepTwoForm from "./Forms/StepTwoForm";
import StepThreeForm from "./Forms/StepThreeForm";
import validateFunc from "./Forms/makeOrderValidation";

class ChooseBusiness extends Component {
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
    this.setState({ openModal: true, currentStep: 1 });
  };
  closeModal = () => {
    this.setState({
      openModal: false,
    });
  };
  onFormSubmit = values => {
    this.closeModal();
    this.props.reset();
  };

  render() {
    const { category, name, handleSubmit, product } = this.props;
    const { openModal, currentStep } = this.state;
    return (
      <React.Fragment>
        <div className="make-order_button" onClick={this.openModal}>
          {props.price}
        </div>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModal}
          onClose={() => this.closeModal("stepOne")}
        >
          <div className="make-order_step-one">
            <div className="make-order_step-one_head">
              <div className="make-order_step-one_head-name">Preorder</div>
              <div className="make-order_step-one_head-step">
                {`Step ${currentStep}/3`}
              </div>
            </div>
            <div className="make-order_step-one_body">
              <form onSubmit={handleSubmit(this.onFormSubmit)}>
                {currentStep === 1 ? (
                  <StepOneForm
                    {...this.props}
                    category={category}
                    name={name}
                    setStep={this.setStep}
                  />
                ) : (
                  <Fragment />
                )}
                {currentStep === 2 ? (
                  <StepTwoForm
                    {...this.props}
                    setStep={this.setStep}
                    product={product}
                  />
                ) : (
                  <Fragment />
                )}
                {currentStep === 3 ? (
                  <StepThreeForm
                    {...this.props}
                    setStep={this.setStep}
                    product={product}
                  />
                ) : (
                  <Fragment />
                )}
              </form>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    initialValues: {
      paymentVariant: "stripe",
    },
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "chooseBusinessForm",
    validate: validateFunc,
  })(ChooseBusiness)
);
