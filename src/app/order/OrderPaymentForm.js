import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import InputMask from "react-input-mask";
import Modal from "react-modal";
import axios from "axios";
import moment from "moment";

import { orderPaid } from "../../redux/actions/productActions";
import { changeToken, loginStatus } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
// connect to html tag
Modal.setAppElement("#paymentModal");

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "initial",
    bottom: "initial",
    maxWidth: "500px",
    border: 0,
    background: "#fff",
    overflow: "visible",
    WebkitOverflowScrolling: "touch",
    outline: "none",
    borderRadius: 0,
    padding: "20px",
    transform: "translate(-50%, -50%)",
  },
};

class OrderPaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      cardNumber: "",
      cardNumberError: "",
      cardDate: "",
      cardDateError: "",
      cardCvv: "",
      cardCvvError: "",
      transactionNotice: false,
      paymentModalIsOpen: false,
      paymentCheckbox: false,
      redirectBackStep: false,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleCardNumber = this.handleCardNumber.bind(this);
    this.validation = this.validation.bind(this);
    this.closePaymentModal = this.closePaymentModal.bind(this);
    this.paymentAgree = this.paymentAgree.bind(this);
  }

  componentDidMount() {
    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          this.setState({
            clientId: res.data.result.clientId,
          });
        }
      })
      .catch(error => console.log(error));
  }

  /* Refresh access token */
  refreshToken = () => {
    axios
      .post(`/user/refresh`, {
        clientId: this.state.clientId,
        refresh_token: this.props.refresh,
      })
      .then(res => {
        this.props.changeToken(res.data.result.token);
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 400) {
          this.props.loginStatus(false);
        }
      });
  };

  paymentAgree = () =>
    this.setState({ paymentCheckbox: !this.state.paymentCheckbox });

  handleInputs = name => event => {
    this.setState({
      [name]: event.target.value,
      cardDateError: "",
      cardCvvError: "",
      transactionNotice: false,
    });
  };

  handleCardNumber = event => {
    const value = event.target.value;
    var newState = {
      mask: "9999-9999-9999-9999",
      value: value,
    };
    if (/^3[47]/.test(value)) {
      newState.mask = "9999-999999-99999";
    }
    this.setState({
      cardNumber: value,
      cardNumberError: "",
      transactionNotice: false,
    });
  };

  closePaymentModal = () => {
    this.setState({ paymentModalIsOpen: false });
  };

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
    } else if (this.state.cardCvv.length === 0 || isNaN(this.state.cardCvv)) {
      return this.setState({ cardCvvError: "Enter correct CVV code" });
    }

    this.setState({ paymentModalIsOpen: true });
  };

  pay = () => {
    if (this.state.paymentCheckbox) {
      axios
        .post(`/products/buy/${this.props.product._id}`, {
          clientId: this.state.clientId,
          access_token: this.props.token,
          pay: "now",
          tokenPayment: false,
          card: {
            exp_month: +this.state.cardDate.substring(0, 2),
            exp_year: +this.state.cardDate.substring(3),
            number: this.state.cardNumber.replace(/-/g, ""), // remove symbol "-"
            cvc: this.state.cardCvv,
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              cardNumber: "",
              cardDate: "",
              cardCvv: "",
              paymentModalIsOpen: false,
              redirectBackStep: true,
            });
            this.props.orderPaid(this.props.product._id);
          } else {
            this.setState({
              transactionNotice: "Something is wrong, check your entered data",
              paymentModalIsOpen: false,
            });
          }
        })
        .catch(error => {
          this.setState({
            transactionNotice: "Something is wrong, check your entered data",
            paymentModalIsOpen: false,
          });
          switch (error.response.status) {
            case 401:
              this.refreshToken();
              break;
            case 400:
              this.refreshToken();
              break;
            default:
              console.log(error);
          }
        });
    }
  };

  render() {
    const {
      cardNumber,
      cardDate,
      cardCvv,
      cardNumberError,
      cardDateError,
      cardCvvError,
      transactionNotice,
    } = this.state;
    const { loginStatus } = this.props;
    if (this.state.redirectBackStep) {
      return <Redirect to={`/create_order/${this.props.product._id}`} />;
    }

    return (
      <Fragment>
        {!loginStatus ? <Redirect to="/login" /> : <React.Fragment />}
        <div className="product-order-form">
          <div className="product-order-input">
            <label className="product-order-input__label">
              Your card number
            </label>
            <InputMask
              mask="9999-9999-9999-9999"
              value={cardNumber}
              onChange={this.handleCardNumber}
            />
          </div>

          <div className="product-order_inline-wrapper">
            <div className="product-order-input">
              <label className="product-order-input__label">
                Your card date
              </label>
              <InputMask
                mask="99/99"
                value={cardDate}
                onChange={this.handleInputs("cardDate")}
              />
            </div>

            <div className="product-order-input">
              <label className="product-order-input__label">
                Your card CVV
              </label>
              <InputMask
                mask="999"
                value={cardCvv}
                onChange={this.handleInputs("cardCvv")}
              />
            </div>
          </div>

          {/* <div className="product-order-input">
          <label className="product-order-input__label">Type</label>
          <select value={orderType} onChange={this.handleInputs("orderType")}>
            <option value="" disabled selected />
            <option value="opk">OPK</option>
            <option value="opk2">OPK2</option>
          </select>
        </div> */}

          <div className="product-order_inline-wrapper">
            <div className="product-order-input">
              <label className="product-order-input__label">Currency</label>
              <input value="$" disabled />
            </div>

            <div className="product-order-input">
              <label className="product-order-input__label">Amount</label>
              <input value={this.props.product.price / 100} disabled />
            </div>
          </div>

          {cardNumberError && (
            <p className="product-order-error">{cardNumberError}</p>
          )}

          {cardDateError && (
            <p className="product-order-error">{cardDateError}</p>
          )}

          {cardCvvError && (
            <p className="product-order-error">{cardCvvError}</p>
          )}

          {transactionNotice ? (
            <div className="product-order-notice_error">
              <p>{transactionNotice}</p>
            </div>
          ) : null}

          <button
            className="product-order__trans-btn"
            type="button"
            onClick={this.validation}
          >
            Send transaction
          </button>
          <p className="product-order__help-note">
            Have any issue? <Link to="/faq#payments">Help center</Link>
          </p>
        </div>

        <Modal
          isOpen={this.state.paymentModalIsOpen}
          onRequestClose={this.closePaymentModal}
          shouldCloseOnEsc={true}
          contentLabel="Payment modal"
          style={modalStyles}
        >
          <div className="product-order-modal-content_wrapper">
            <div className="product-order-modal__title">Confirmation</div>
            <button
              className="product-order-modal__close-btn"
              onClick={this.closePaymentModal}
            >
              X
            </button>

            <p className="product-order-modal-content__info">
              OPN takes your data safety seriously and take all measures to
              protect sensitive personal data. We do not store any financial
              data of users such as the credit card information on our website
              for security purposes. All transactions you conduct with the help
              of our service are processed by the Stripe service.
            </p>

            <div className="product-order-modal-content">
              <p
                className={
                  this.state.paymentCheckbox
                    ? "product-order-modal__checkbox product-order-modal__checkbox_checked"
                    : "product-order-modal__checkbox"
                }
                onClick={this.paymentAgree}
              />
              <p className="product-order-modal-content__note">
                I agree with term and conditions
              </p>
            </div>

            <button
              className="product-order-modal__trans-btn"
              type="button"
              onClick={this.pay}
              disabled={this.state.paymentCheckbox ? false : true}
            >
              Send
            </button>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    token: state.token,
    refresh: state.refresh,
    loginStatus: state.loginStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderPaid: id => {
      dispatch(orderPaid(id));
    },
    changeToken: token => {
      dispatch(changeToken(token));
    },
    loginStatus: status => {
      dispatch(loginStatus(status));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPaymentForm);
