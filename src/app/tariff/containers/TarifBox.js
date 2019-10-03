import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import Toggle from "../../ui_components/utils/Toggle";
import Modal from "../../ui_components/utils/Modal";
import TarifForm from "../Forms/TariffForm";
import EnterpriseFrom from "../Forms/EnterpriseForm";

/* Icons */
import visaIco from "../../../assets/img/card/visa.png";
import masterIco from "../../../assets/img/card/mkard.png";
import payIco from "../../../assets/img/card/2pay.png";
import paypalIco from "../../../assets/img/card/paypal.png";

class TarifBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      access_token: "",
      companyId: "",
      loggedIn: true,
      errors: [],
      message: "",
      cabinet: false,
    };
  }

  componentDidMount = () => {
    /* Getting clientId prop */
    if (this.props.access_token.length < 0) {
      this.setState({ loggedIn: !this.state.loggedIn });
    } else {
      axios
        .get("/client/id")
        .then(res => {
          this.setState({
            clientId: res.data.result.clientId,
            access_token: this.props.access_token.data.result.access_token
              .token,
            companyId: this.props.access_token.data.result.access_token._id,
          });
        })
        .catch(error => {
          console.log(error.response);
          this.setState({ loggedIn: !this.state.loggedIn });
        });
    }
  };

  clear = () => {
    if (this.state.errors !== []) {
      this.setState({ errors: [] });
    }

    if (this.state.message !== "") {
      this.setState({ message: "" });
    }
  };

  registerCard = () => {
    this.clear();
    let mon;
    let year;
    if (
      this.props.cardForm.values !== undefined &&
      this.props.cardForm.values.date !== undefined
    ) {
      let arr = this.props.cardForm.values.date.toString().split("/");
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
      setTimeout(this.clear, 7000);
    }

    let card_num;
    if (
      this.props.cardForm.values !== undefined &&
      this.props.cardForm.values.card_num !== undefined
    ) {
      card_num = this.props.cardForm.values.card_num
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
      setTimeout(this.clear, 7000);
    }

    if (
      this.props.cardForm &&
      this.props.cardForm.values !== undefined &&
      this.props.cardForm.values.card_num !== undefined &&
      this.props.cardForm.values.cvv !== undefined
    ) {
      axios
        .put("/company/tariff", {
          access_token: this.state.access_token,
          clientId: this.state.clientId,
          tariff: this.props.plan,
          card: {
            exp_month: mon,
            exp_year: year,
            number: card_num,
            cvc: this.props.cardForm.values.cvv,
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              message: "Tariff changed successfully",
            });
            setTimeout(this.goToCabinet, 2000);
          }
        })
        .catch(error => {
          if (
            error.response &&
            error.response.data !== undefined &&
            error.response.data.error_message !== undefined
          ) {
            for (let i = 0; i < error.response.data.error_message.length; i++) {
              if (error.response.data.error_message[i].message !== undefined) {
                let resp = error.response.data.error_message.message;
                this.setState({ errors: [...this.state.errors, resp] });
                console.log(error.response.data.error_message);
              } else if (
                error.response.data.error_message &&
                error.response.data.error_message !== undefined
              ) {
                this.setState({ message: error.response.data.error_message });
              }
            }
          } else if (error.message) {
            this.setState({
              message: error.message,
            });
          }
        });
    } else {
      this.setState({
        errors: [...this.state.errors, "Fill the form fields"],
      });
      setTimeout(this.clear, 7000);
    }
  };

  handleEnterprise = () => {
    let customer =
      this.props.entrForm.values &&
      this.props.entrForm.values !== undefined &&
      this.props.entrForm.values.customer &&
      this.props.entrForm.values.customer !== undefined &&
      this.props.entrForm.values.customer === "I am a new customer"
        ? true
        : false;

    if (this.props.entrForm && this.props.entrForm.values !== undefined) {
      let data = {
        clientId: this.state.clientId,
        email:
          this.props.entrForm.values.email !== undefined
            ? this.props.entrForm.values.email
            : "",
        existing: customer !== undefined ? customer : "",
        amount: {
          users:
            this.props.entrForm.values.users !== undefined
              ? this.props.entrForm.values.users
              : 0,
          products:
            this.props.entrForm.values.products !== undefined
              ? this.props.entrForm.values.products
              : 0,
          storage:
            this.props.entrForm.values.storage !== undefined
              ? this.props.entrForm.values.storage
              : 0,
        },
        orderFrequency:
          this.props.entrForm.values.orderFrequency !== undefined
            ? this.props.entrForm.values.orderFrequency
            : "",
        crossBorderShipment:
          this.props.entrForm.values.shipment !== undefined
            ? this.props.entrForm.values.shipment
            : "",
        company:
          this.props.entrForm.values.comp_name !== undefined
            ? this.props.entrForm.values.comp_name !== undefined
            : "",
        name:
          this.props.entrForm.values.name !== undefined
            ? this.props.entrForm.values.name !== undefined
            : "",
        phone:
          this.props.entrForm.values.phone !== undefined
            ? this.props.entrForm.values.phone !== undefined
            : "",
        contact:
          this.props.entrForm.values.contact !== undefined
            ? this.props.entrForm.values.contact !== undefined
            : "",
        comments:
          this.props.entrForm.values.comments !== undefined
            ? this.props.entrForm.values.comments !== undefined
            : "",
      };
      axios
        .post("/enterprise", data)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              message: "We will contact you",
            });
            setTimeout(this.goToCabinet, 2000);
          }
        })
        .catch(error => {
          if (
            error.response &&
            error.response.data !== undefined &&
            error.response.data.error_message !== undefined
          ) {
            for (let i = 0; i < error.response.data.error_message.length; i++) {
              if (error.response.data.error_message[i].message !== undefined) {
                let resp = error.response.data.error_message.message;
                this.setState({ errors: [...this.state.errors, resp] });
                console.log(error.response.data.error_message);
              } else if (
                error.response.data.error_message &&
                error.response.data.error_message !== undefined
              ) {
                this.setState({ message: error.response.data.error_message });
              }
            }
          } else if (error.message) {
            this.setState({
              message: error.message,
            });
          }
        });
    } else {
      this.setState({
        errors: [...this.state.errors, "Fill the form fields"],
      });
      setTimeout(this.clear, 7000);
    }
  };

  goToCabinet = () => {
    this.setState({
      cabinet: true,
    });
  };

  render() {
    const { titleMain, subtitle, ordersCount, content, plan } = this.props;
    const { loggedIn, cabinet, errors, message } = this.state;
    return (
      <div className="tarifsCntnr">
        {!loggedIn ? <Redirect to="/login" /> : <React.Fragment />}
        {cabinet ? <Redirect to="/main_profile" /> : <React.Fragment />}
        <div className="tarifBoxWrapper">
          <div className="tarifBoxTitle">
            <span className="boxTitle">{titleMain}</span>
          </div>
          <div className="tarifBoxSubtitle">
            <span className="boxSubtitle">{subtitle}</span>
          </div>
          <div className="tarifBoxContent">
            <span className="tarifOrdersCount">{ordersCount}</span>
            <ul>
              {content.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tarifBoxBtn">
          {plan === "BASIC" ? (
            <Link to="/categories">LET'S START </Link>
          ) : (
            <Toggle>
              {({ on, toggle }) => (
                <React.Fragment>
                  {plan === "ENTERPRISE" ? (
                    <React.Fragment>
                      <a onClick={toggle}>CONTACT US</a>

                      <Modal on={on} toggle={toggle}>
                        <div className="modal-enterpr">
                          <div className="modal-body">
                            <div className="modal-email">
                              Enterprise Plan Request
                            </div>
                            <div className="modal-form">
                              <div className="enterpr-text">
                                After you fill out this plan request, we will
                                contact you to go over details and availability
                                before the order is completed. If you would like
                                faster service and direct information on current
                                stock and pricing please contact us at{" "}
                                <a href="mailto:enterprise@opnplatform.com">
                                  enterprise@opnplatform.com
                                </a>
                              </div>
                              <EnterpriseFrom />
                            </div>
                            <div className="login-register-wrapper_messages">
                              {errors !== []
                                ? errors.map(err => <p>{err}</p>)
                                : ""}
                              {message}
                            </div>
                          </div>
                          <button
                            onClick={this.handleEnterprise}
                            className="make-order__upload-btn enterpr-btn"
                          >
                            SEND
                          </button>
                        </div>
                      </Modal>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <a onClick={toggle}>LET'S START</a>
                      <Modal on={on} toggle={toggle}>
                        <div className="modal-body">
                          <div className="modal-email">email</div>
                          <div className="modal-form">
                            <TarifForm />
                          </div>
                          <div className="modal-pay">
                            <img className="pay-ico" src={visaIco} />
                            <img className="pay-ico" src={payIco} />
                            <img className="pay-ico" src={masterIco} />
                            <img className="pay-ico" src={paypalIco} />
                          </div>
                          <button
                            onClick={this.registerCard}
                            className="make-order__upload-btn"
                          >
                            Save card
                          </button>
                          <div className="login-register-wrapper_messages">
                            {errors !== []
                              ? errors.map(err => <p>{err}</p>)
                              : ""}
                            {message}
                          </div>
                        </div>
                      </Modal>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Toggle>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    cardForm: state.form.opn_card_form,
    entrForm: state.form.enterprise_form,
  };
};

export default connect(
  mapStateToProps,
  null
)(TarifBox);
