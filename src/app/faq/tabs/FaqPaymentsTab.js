import React, { Component } from "react";
import YouTube from "react-youtube";

/*------------------------------------------------------*/
/*  Default open chapter id need to be placed in state  */
/*  If it shouldn't be opened, place an empty string    */
/*  For new chapters id must be placed into 3 <div/>s:  */
/*  faq-single-tab__chapter-arrow                       */
/*  faq-single-tab__chapter-button                      */
/*  aq-single-tab__chapter-content                      */
/*------------------------------------------------------*/

class FaqPaymentsTab extends Component {
  state = {
    activeChapter: "payToCounterparty",
    opts: {
      playerVars: {
        autoplay: 0,
        rel: 0,
      },
    },
  };
  handleButtonClick = e => {
    if (this.state.activeChapter === e.target.id) {
      this.setState({ activeChapter: "" });
    } else {
      this.setState({ activeChapter: e.target.id });
    }
  };
  render() {
    return (
      <div className="faq-single-tab__wrapper">
        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "payToCounterparty"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="payToCounterparty"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              HOW CAN I PAY TO MY COUNTERPARTY?
            </div>
          </div>

          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "payToCounterparty"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <YouTube
              containerClassName="faq-single-tab__inner-video-wrapper"
              videoId="sOc1pgMKsD4"
              opts={this.state.opts}
            />

            <p>
              You can pay immediately without leaving the platform via Stripe in
              real time, payments are secure by global payment leader Stripe,
              which has been audited by a PCI-certified auditor and is certified
              to PCI Service Provider Level 1. This is the most stringent level
              of certification available in the payments industry. More info{" "}
              <a href="https://stripe.com/docs/security/stripe" target="_blank">
                https://stripe.com/docs/security/stripe
              </a>
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}

        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "currency"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="currency"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              IN WHAT CURRENCY COULD I PAY?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "currency"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPN partner Stripe supports 135+ currencies helping to avoid
              conversion costs.
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}

        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "track"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="track"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              HOW CAN I KEEP TRACK OF MY BALANCE?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "track"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              You can check your balance from your personal profile or via
              Stripe account.
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}

        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "fee"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="fee"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              WHAT IS A FEE FOR OPN PROCESSEMENT AND MY WORLDWIDE EXPOSURE?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "fee"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPN Platform charges 1% from transaction on the global platform,
              less than any of your marketing campaigns to find a new supplier,
              manufacturer or buyer, to hold a tender, etc.
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}

        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "schedule"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="schedule"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              WHAT IS A PAYOUT SCHEDULE?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "schedule"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              You can manage payout accounts and payout schedule via your Stripe
              account.
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}

        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "monthly"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="monthly"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              HOW CAN I RECEIVE MONTHLY ACCOUNT STATEMENT?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "monthly"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              For fiat currencies you can receive via your Stripe account, for
              OPK Token directly from OPN Platform.
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}

        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "ifVerified"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="ifVerified"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              IF MY COUNTERPARTY IS VERIFIED?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "ifVerified"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPN provides real-time identification and verification of company
              records through official registers, completes an AML check of the
              business through international watchlist sources, uncovers the
              ultimate beneficial ownership (UBO) structure, and performs
              instant electronic identity verification for all individuals
              deemed to be UBOs.
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}

        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "token"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="token"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              WHAT IS OPK TOKEN?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "token"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPK Token is ERC20 ETHEREUM based native token and OPN Platform
              currency and could be used inside the platform for different
              purpose.
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}

        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "useToken"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="useToken"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              HOW CAN I USE OPK TOKEN?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "useToken"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>You can pay for OPN Platform services with 20% discount.</p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}

        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "holdToken"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="holdToken"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              WHERE CAN I HOLD OPK TOKEN?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "holdToken"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPN Platform doesn’t hold your OPK Token, you can provide your
              Ethereum wallet address in your Profile or open new with Metamask
              (https://metamask.io/) directly from the OPN.
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}

        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "buyToken"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="buyToken"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              HOW CAN I BUY OPK TOKEN?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "buyToken"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              You can buy OPK Token by request via{" "}
              <a href="mailto:sergio@opnplatform.com" target="_blank">
                sergio@opnplatform.com
              </a>{" "}
              <br />
              OPK Token could be earned through referrals or OPN Platform
              promotions, please contact{" "}
              <a href="mailto:marketing@opnplatform.com" target="_blank">
                marketing@opnplatform.com
              </a>
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}
      </div>
    );
  }
}

export default FaqPaymentsTab;
