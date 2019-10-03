import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";

import {
  MaterialPrimaryButton,
  MaterialFixedTextButton,
} from "../../ui_components/materialBased/materialBasedButtons";
import InviteCarrier from "./modals/InviteCarrier";
import SuccessInvited from "./modals/SuccessInvited";
import StripeForm from "./stripeForm/StripeForm";
import SuccessPaid from "../../workspace/modals/tariff/SuccessPaid";
import { prodClientId, testClientId } from "../../tariff/Stripe/stripe";
import { priceFormat } from "../../utils/priceFormat";
import "./css/deals-details.scss";

class DealsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccessInvited: false,
      modalIsOpen: false,
      successPaidModal: false,
      bill: null,
      billIsClosed: null,
      carrierModal: false,
    };
  }

  componentDidMount() {
    this.getBillInfo();
    this.getBillStatus();
  }

  componentDidUpdate(prevProps) {
    console.log("prevProps.chat", prevProps.chat);
    console.log("this.props.chat", this.props.chat);
    if (prevProps.chat && prevProps.chat.id !== this.props.chat.id) {
      this.getBillInfo();
      this.getBillStatus();
    }
  }

  getBillStatus = () => {
    axios
      .post("/msg/chat/invoice/list", {
        clientId: this.props.clientId,
        access_token: this.props.token,
        chat: this.props.chat.id,
        count: 250,
        offset: 0,
      })
      .then(res => {
        console.log(
          "closed invoce? :",
          res.data.result,
          res.data.result && res.data.result.length > 0 ? true : false
        );
        if (res.status === 200) {
          this.setState({
            billIsClosed:
              res.data.result && res.data.result.length > 0 ? true : false,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getBillInfo = () => {
    console.log("CHAT==========", this.props.chat);
    if (this.props.chat) {
      axios
        .post("/msg/chat/invoice", {
          clientId: this.props.clientId,
          access_token: this.props.token,
          chat: this.props.chat.id,
        })
        .then(res => {
          console.log("BILLLL:", res.data.result);
          if (res.status === 200) {
            this.setState({ bill: res.data.result });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  declineOrder = () => {
    console.log("DECLINE", this.state.bill);
    axios
      .put("/msg/chat/invoice/reject", {
        clientId: this.props.clientId,
        access_token: this.props.token,
        bill: this.state.bill._id,
      })
      .then(res => {
        this.getBillInfo();
      })
      .catch(error => {
        console.log(error);
      });
  };

  acceptDeal = () => {
    axios
      .post("/msg/chat/payment/request", {
        clientId: this.props.clientId,
        access_token: this.props.token,
        order: this.props.order._id,
        user: this.props.currUser,
        count: 1,
      })
      .then(res => {
        console.log("BILLL:", res);
        // this.props.changeToken(res.data.result.token);
        this.getBillInfo();
      })
      .catch(error => {
        console.log(error);
      });
  };

  toggleCarrierModal = () =>
    this.setState({ carrierModal: !this.state.carrierModal });

  toggleSuccessInvitedModal = () =>
    this.setState({ isSuccessInvited: !this.state.isSuccessInvited });

  showPaymentModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => this.setState({ modalIsOpen: false });

  toggleSuccessModal = () =>
    this.setState({ successPaidModal: !this.state.successPaidModal });

  render() {
    let apiKey = "";
    let redirectUri = "";
    if (window.location.host === "localhost:3000") {
      apiKey = testClientId;
      redirectUri = "https://localhost:3000/stripe-response";
    } else if (window.location.host === "dev.opnplatform.com") {
      apiKey = testClientId;
      redirectUri = "https://dev.opnplatform.com/stripe-response";
    } else if (window.location.host === "opnplatform.com") {
      apiKey = prodClientId;
      redirectUri = "";
    }

    if (this.props.chat) {
      return (
        <div className="deals-details">
          <div className="deals-details-content">
            <div className="deals-details-info">
              <p className="deals-details_company">
                {this.props.order && this.props.chat !== null
                  ? this.props.order.category
                    ? this.props.order.category.name
                    : " - "
                  : null}
              </p>

              <h2 className="deals-details_title">
                {this.props.order ? this.props.order.name : "-"}
              </h2>

              <div className="deals-details-row">
                <p>Amount:</p>
                <span>
                  {this.props.offer && this.props.offer.amount
                    ? this.props.offer.amount.number
                    : " - "}
                </span>
                <span style={{ textTransform: "uppercase" }}>
                  {this.props.offer && this.props.offer.amount
                    ? this.props.offer.amount.unit
                    : "kg"}
                </span>
              </div>

              {this.props.offer && this.props.offer.destination ? (
                <div className="deals-details-row">
                  <p>Destination:</p>
                  <span>
                    {this.props.offer && this.props.offer.destination}
                  </span>
                </div>
              ) : null}

              {/* <div className="deals-details-row">
                <p>Date:</p>
                <span>
                  {this.props.chat !== null
                    ? moment(this.props.order.created_at).format("LL")
                    : "22 Apr 2019"}
                </span>
              </div> */}

              <div className="deals-details-row">
                <p>Delivery Variant:</p>
                <span>
                  {this.props.offer && this.props.offer.deliveryVariant}
                </span>
              </div>

              <div className="deals-details-row">
                <p>Delivery terms (days):</p>
                <span>
                  {this.props.order && this.props.order.delivery.term} days
                </span>
              </div>

              <div className="deals-details-row">
                <p>Price:</p>
                <span>
                  {this.props.offer && this.props.offer.currency === "USD"
                    ? "$"
                    : "€"}
                  {this.props.offer
                    ? priceFormat(this.props.offer.price)
                    : " - "}
                </span>
              </div>

              <div className="deals-details-row deals-details-row__color">
                <p>Status:</p>
                <span>{this.state.billIsClosed ? "Paid" : "Pending"}</span>
              </div>

              {this.state.bill && this.state.bill.status === "PLACED" ? (
                this.props.currUser !== this.props.order.user ? (
                  <div className="deals-details-top-actions">
                    <MaterialPrimaryButton
                      label="Pay"
                      type="button"
                      onClick={() => {
                        !!this.props.loggedIn.data.result.customAccountId
                          ? this.showPaymentModal()
                          : (window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${apiKey}&scope=read_write&redirect_uri=${redirectUri}`);
                      }}
                      style={{
                        outline: "none",
                        width: "100%",
                        maxWidth: "152px",
                        height: 40,
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
                ) : (
                  <div className="deals-details-top-actions">
                    <span className="deals-details-top-actions_notice">
                      Order approved
                    </span>
                  </div>
                )
              ) : this.props.currUser === this.props.order.user ? (
                this.state.billIsClosed ? (
                  <div className="deals-details-top-actions">
                    <span className="deals-details-top-actions_notice">
                      Order paid
                    </span>
                  </div>
                ) : (
                  <div className="deals-details-top-actions">
                    <p onClick={this.declineOrder}>Decline</p>
                    <MaterialPrimaryButton
                      label="Accept the deal"
                      type="button"
                      onClick={() => {
                        this.acceptDeal();
                      }}
                      style={{
                        outline: "none",
                        width: "100%",
                        maxWidth: "188px",
                        height: 40,
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
                )
              ) : this.state.billIsClosed ? (
                <div className="deals-details-top-actions">
                  <span className="deals-details-top-actions_notice">
                    Order paid
                  </span>
                </div>
              ) : (
                <div className="deals-details-top-actions">
                  <span className="deals-details-top-actions_notice">
                    Please wait for owner approval
                  </span>
                </div>
              )}

              <div className="deals-details-bottom-actions">
                <MaterialFixedTextButton
                  onClick={this.toggleCarrierModal}
                  label="Invite carrier"
                  style={{ maxWidth: 170 }}
                />
                {/* <p>Order tracking</p>
                <p>Payment status</p> */}
              </div>
            </div>

            {this.props.order &&
            this.props.order.photos &&
            this.props.order.photos.length > 0 ? (
              <div className="deals-details-image">
                <img
                  src={`${location.protocol}//${
                    location.hostname == "localhost"
                      ? "dev.opnplatform.com"
                      : location.hostname
                  }/api/v1/file/${this.props.order.photos[0]._id}`}
                  alt="order Photo"
                />
              </div>
            ) : (
              <div className="deals-details-image deals-details-image__empty" />
            )}
          </div>
          {this.state.bill ? (
            <StripeForm
              modalIsOpen={this.state.modalIsOpen}
              closeModal={this.closeModal}
              billId={this.state.bill._id}
              toggleSuccessModal={this.toggleSuccessModal}
            />
          ) : null}

          <SuccessPaid
            isOpen={this.state.successPaidModal}
            toggleSuccessModal={this.toggleSuccessModal}
          />

          <InviteCarrier
            chatId={this.props.chat.id}
            isOpen={this.state.carrierModal}
            toggleCarrierModal={this.toggleCarrierModal}
            toggleSuccessInvitedModal={this.toggleSuccessInvitedModal}
          />

          <SuccessInvited
            isSuccessInvited={this.state.isSuccessInvited}
            toggleSuccessInvitedModal={this.toggleSuccessInvitedModal}
          />
        </div>
      );
    } else {
      return (
        <div className="deals-details">
          <div className="deals-details-content">
            <div className="deals-details-info__empty">
              <div className="deals-details-info__empty-title">
                Notification
              </div>
              <div className="deals-details-info__empty-body">
                Please, select chat
              </div>
            </div>
          </div>
        </div>
      );
    }
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

export default connect(mapStateToProps)(DealsDetails);
