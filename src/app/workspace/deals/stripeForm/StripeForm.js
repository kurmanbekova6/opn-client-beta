import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import MaskedInput from "react-text-mask";
// Material UI
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { MaterialPrimaryButton } from "../../../ui_components/materialBased/materialBasedButtons";
import "./stripe-form.scss";

class StripeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: "",
      cardNumberError: "",
      cardDate: "",
      cardDateError: "",
      cardCode: "",
      cardCodeError: "",
      serverError: "",
    };
  }

  handleCardNumber = e =>
    this.setState({ cardNumber: e.target.value, cardNumberError: "" });

  handleCardDate = e =>
    this.setState({ cardDate: e.target.value, cardDateError: "" });

  handleCardCode = e =>
    this.setState({ cardCode: e.target.value, cardCodeError: "" });

  validation = () => {
    const cardNumber = this.state.cardNumber.replace(/-/g, "");
    const cardDate = this.state.cardDate.replace(/\//g, "");

    if (isNaN(cardNumber) || cardNumber.length !== 16) {
      return this.setState({ cardNumberError: "Enter correct card number" });
    } else if (
      cardDate.length === 0 ||
      isNaN(cardDate) ||
      (+cardDate.substr(0, 2) <= +moment().format("MM") &&
        +cardDate.substr(2) === +moment().format("YY")) ||
      +cardDate.substr(0, 2) > 12 ||
      +cardDate.substr(2) < +moment().format("YY") ||
      +cardDate.substr(2) > +moment().format("YY") + 12
    ) {
      return this.setState({ cardDateError: "Enter correct card date" });
    } else if (this.state.cardCode.length !== 3 || isNaN(this.state.cardCode)) {
      return this.setState({ cardCodeError: "Enter correct CVV code" });
    }

    this.handlePay();
  };

  handlePay = () => {
    axios
      .post("/invoice/pay", {
        clientId: this.props.clientId,
        access_token: this.props.token,
        card: {
          exp_month: +this.state.cardDate.substring(0, 2),
          exp_year: +this.state.cardDate.substring(3),
          number: this.state.cardNumber.replace(/-/g, ""), // remove symbol "-"
          cvc: this.state.cardCode,
        },
        way: "CARD2STRIPE",
        bill: this.props.billId,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState(
            {
              cardNumber: "",
              cardDate: "",
              cardCode: "",
            },
            () => {
              this.props.closeModal();
              this.props.toggleSuccessModal();
            }
          );
        } else {
          this.setState({ serverError: res.data.result });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {
      cardNumber,
      cardDate,
      cardCode,
      cardNumberError,
      cardDateError,
      cardCodeError,
      serverError,
    } = this.state;

    const { modalIsOpen, closeModal } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalIsOpen}
        onClose={closeModal}
      >
        <div className="make-order_step-one">
          <div className="make-order_step-one_head">
            <div className="make-order_step-one_head-name">Stripe payment</div>
            <div>
              <IconButton
                size="small"
                className="make-order_step-one_head-step-close"
              >
                <CloseIcon onClick={closeModal} />
              </IconButton>
            </div>
          </div>
          <div className="make-order_step-one_body">
            <div className="make-order_step-one_body-form">
              <FormControl className="stripe-form-input-wrap">
                <InputLabel>Card number</InputLabel>
                <Input
                  value={cardNumber}
                  onChange={this.handleCardNumber}
                  inputComponent={CardNumberMask}
                  fullWidth={true}
                />
              </FormControl>
              {cardNumberError && (
                <p className="stripe-form_input-error">{cardNumberError}</p>
              )}
              <FormControl className="stripe-form-input-wrap">
                <InputLabel>Card date</InputLabel>
                <Input
                  value={cardDate}
                  onChange={this.handleCardDate}
                  inputComponent={CardDateMask}
                  fullWidth={true}
                />
              </FormControl>
              {cardDateError && (
                <p className="stripe-form_input-error">{cardDateError}</p>
              )}
              <FormControl className="stripe-form-input-wrap">
                <InputLabel>Card cvv</InputLabel>
                <Input
                  value={cardCode}
                  onChange={this.handleCardCode}
                  inputComponent={CardCodeMask}
                  fullWidth={true}
                />
              </FormControl>
              {cardCodeError && (
                <p className="stripe-form_input-error">{cardCodeError}</p>
              )}

              {serverError && (
                <p className="stripe-form_input-error stripe-form_input-error__center">
                  {serverError}
                </p>
              )}

              <p className="stripe-form_notice">
                OPN takes your data safety seriously and take all measures to
                protect sensitive personal data. We do not store any financial
                data of users such as the credit card information on our website
                for security purposes. All transactions you conduct with the
                help of our service are processed by the Stripe service.
              </p>

              <MaterialPrimaryButton
                label="Pay"
                type="button"
                onClick={this.validation}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

function CardNumberMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      guide={false}
      mask={[
        /[0-9]/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /[0-9]/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /[0-9]/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /[0-9]/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

function CardDateMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      guide={false}
      mask={[/[0-9]/, /[0-9]/, "/", /[1-9]/, /[0-9]/]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

function CardCodeMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      guide={false}
      mask={[/[0-9]/, /[0-9]/, /[0-9]/]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

const mapStateToProps = state => {
  return {
    clientId: state.clientId,
    access_token: state.loggedIn,
    loggedIn: state.loggedIn,
    token: state.token,
    refresh: state.refresh,
    loginStatus: state.loginStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginStatus: status => {
      dispatch(loginStatus(status));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StripeForm);
