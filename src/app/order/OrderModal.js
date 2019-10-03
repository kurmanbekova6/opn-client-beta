import React, { Component } from "react";
import { connect } from "react-redux";
import ModalForm from "./confirm/ModalForm";
import axios from "axios";
import { resetSection } from "redux-form";
import { changeToken, loginStatus } from "../../redux/actions/userActions";
class OrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      message: "",
      loggedIn: true,
      clientId: "",
      access_token: "",
      companyId: "",
      paymentCheckbox: false,
    };
    this.paymentAgree = this.paymentAgree.bind(this);
  }

  componentDidMount = () => {
    this.clear();
    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          this.setState({
            clientId: res.data.result.clientId,
            access_token: this.props.token,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  clear = () => {
    if (this.state.errors !== []) {
      this.setState({
        errors: [],
      });
    }
    if (this.state.message !== "") {
      this.setState({
        message: "",
      });
    }
  };

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
        this.props.setLoginStatus(false);
      });
  };

  handleFormSubmit = () => {
    let mon;
    let year;
    if (
      this.props.modForm.values !== undefined &&
      this.props.modForm.values.date !== undefined
    ) {
      let arr = this.props.modForm.values.date.toString().split("/");
      mon = Number(arr[0]);
      year = Number(arr[1]);
      if (mon > 12) {
        this.setState({
          message: "Month in card date field can't be greater than 12",
        });
      }
      if (year < 19) {
        this.setState({
          message: "Year in card date field can't be greater than 19",
        });
      }
    } else {
      this.setState({
        errors: [...this.state.errors, "Fill the form fields"],
      });
    }

    let card_num;
    if (
      this.props.modForm.values !== undefined &&
      this.props.modForm.values.card_num !== undefined
    ) {
      card_num = this.props.modForm.values.card_num
        .toString()
        .split("-")
        .join("");
      if (card_num.length !== 16) {
        this.setState({
          message: "Card number length sould equals to 16 characters!",
        });
      }
    } else {
      this.setState({
        errors: [...this.state.errors, "Fill the form fields"],
      });
    }

    if (this.props.modForm.values !== undefined) {
      let formData = {
        clientId: this.props.clientId,
        access_token: this.props.access_token,
        order: this.props.order !== undefined ? this.props.order : "",
        offer: {
          price:
            this.props.modForm.values.price !== undefined
              ? Number(this.props.modForm.values.price)
              : "",
          amount: {
            number:
              this.props.modForm.values.amount !== undefined
                ? Number(this.props.modForm.values.amount)
                : "",
            unit:
              this.props.modForm.values.units !== undefined
                ? this.props.modForm.values.units
                : "",
          },
          deliverVariant:
            this.props.modForm.values.logistic !== undefined
              ? this.props.modForm.values.logistic
              : "",
          comments:
            this.props.modForm.values.comments !== undefined
              ? this.props.modForm.values.comments
              : "",
          email:
            this.props.modForm.values.email !== undefined
              ? this.props.modForm.values.email
              : "",
          currency: "USD",
          tokenPayment: false,
          payment: "now",
        },
        card: {
          exp_month: mon,
          exp_year: year,
          number: card_num,
          cvc:
            this.props.modForm.values.cvv !== undefined
              ? this.props.modForm.values.cvv
              : "",
        },
      };
      axios
        .post("/orders/offer", formData)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              message: "You changed successfully",
            });
            setTimeout(this.props.toggle, 2500);
          }
        })
        .catch(error => {
          if (
            error.response.data !== undefined &&
            error.response.data.error_message !== undefined
          ) {
            if (typeof error.response.data.error_message !== "string") {
              for (
                let i = 0;
                i < error.response.data.error_message.length;
                i++
              ) {
                if (
                  error.response.data.error_message[i].message !== undefined
                ) {
                  let resp = error.response.data.error_message[i].message;
                  this.setState({ errors: [...this.state.errors, resp] });
                  setTimeout(this.clear, 5000);
                } else {
                  console.log(error.response.data.error_message);
                  this.setState({
                    message: error.response.data.error_message,
                  });
                  setTimeout(this.clear, 5000);
                }
              }
            } else {
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
            }
          }
        });
    } else {
      this.setState({
        message: "Please fill the form",
      });
    }
  };

  paymentAgree = () =>
    this.setState({ paymentCheckbox: !this.state.paymentCheckbox });

  render() {
    return (
      <div className="order-modal">
        <div className="modal-body">
          <div className="modal-email">Propose your price</div>
          <div className="modal-form">
            <ModalForm order={this.props.order} />
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
          </div>
        </div>
        <button
          className="make-order__upload-btn"
          onClick={this.handleFormSubmit}
          disabled={this.state.paymentCheckbox ? false : true}
        >
          Send
        </button>
        <div className="login-register-wrapper_messages">
          {this.state.errors !== []
            ? this.state.errors.map(err => <p>{err}</p>)
            : ""}
          {this.state.message}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modForm: state.form.opn_order_modal_form,
    loginStatus: state.loginStatus,
    token: state.token,
    refresh: state.refresh,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeToken: token => {
      dispatch(changeToken(token));
    },
    setLoginStatus: status => {
      dispatch(loginStatus(status));
    },
  };
};

export default connect(mapStateToProps)(OrderModal);
