import React, { Component } from "react";

/*------------------------------------------------------*/
/*  Default open chapter id need to be placed in state  */
/*  If it shouldn't be, just place an empty string      */
/*  For new chapters id must be placed into 3 <div/>s:  */
/*  faq-single-tab__chapter-arrow                       */
/*  faq-single-tab__chapter-button                      */
/*  aq-single-tab__chapter-content                      */
/*------------------------------------------------------*/

class FaqGeneralTab extends Component {
  state = {
    activeChapter: "whyShouldIRegister",
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
                this.state.activeChapter === "whyShouldIRegister"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="whyShouldIRegister"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              Why should I register on OPN?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "whyShouldIRegister"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPN is a B2B web based platform for the global packaging industry,
              an open, reliable online place connecting buyers and sellers in
              real time, facilitating interactions and offering solutions to
              most industry-related problems. Using the innovative software and
              blockchain technology, the OPN platform has the potential to
              become the largest marketplace for packaging industry in the
              world.
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
                this.state.activeChapter === "useOpnInstead"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="useOpnInstead"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              WHY I SHOULD USE OPN INSTEAD OUR CURRENT PROCUREMENT PROCESS?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "useOpnInstead"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPN can save up to 20-35% of your procurement process cost, huge
              manual work and time, depends of size of your company, it can be
              from thousand to millions of US Dollars.
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
                this.state.activeChapter === "howDoIRegister"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="howDoIRegister"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              How do I register my company on OPN?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "howDoIRegister"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              Registration is simple and only requires a login and a password or
              company social accounts: Linkedin, Facebook, Google. By clicking
              Register, you are transferred to registration page where you are
              asked to complete all information in a company profile.
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
                this.state.activeChapter === "whatFunctions"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="whatFunctions"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              WHAT CAN I ACCESS UPON REGISTRATION?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "whatFunctions"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              Registration grants you FREE access to the following via
              workspace:
              <br />
              <ul>
                <li className="liPlanSteps">
                  Placement of Order for the purchase or sale products.
                </li>
                <li className="liPlanSteps">Place of Product.</li>
                <li className="liPlanSteps">Payment in multiple currencies.</li>
                <li className="liPlanSteps">
                  The ability to communicate via chat with counterparty.
                </li>
                <li className="liPlanSteps">
                  Choice of integrated shipment services.
                </li>
                <li className="liPlanSteps">
                  Issuing a rating and writing a review based on an assessment
                  of the quality of the completed order.
                </li>
                <li className="liPlanSteps">Analytic data.</li>
              </ul>
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
                this.state.activeChapter === "trialMembership"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="trialMembership"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              IS THERE A FREE TRIAL PERIOD?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "trialMembership"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              Yes, OPN grants BASIC plan FREE and FOREVER. You can upgrade your
              account and receive more services or stay FREE. For Corporates OPN
              offer tailor-made ENTERPRISE Plan, please contact{" "}
              <a href="mailto:enterprise@opnplatform.com" target="_blank">
                enterprise@opnplatform.com
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
                this.state.activeChapter === "notBelong"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="notBelong"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              IF I DO NOT BELONG TO THE PACKAGING INDUSTRY?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "notBelong"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPN platform is designed just for packaging industry companies and
              B2B procurement process.
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
                this.state.activeChapter === "placeRecurring"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="placeRecurring"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              CAN I PLACE RECURRING ORDERS?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "placeRecurring"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPN can process spot orders and recurring orders soon. We keep you
              updated.
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
                this.state.activeChapter === "provideTender"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="provideTender"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              CAN I PROVIDE TENDER IN OPN PLATFORM?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "provideTender"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              You can provide your massive Corporate tender in minutes and real
              time.
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
                this.state.activeChapter === "verifyPartner"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="verifyPartner"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              HOW CAN I VERIFY MY BUSINESS PARTNER?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "verifyPartner"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPN supports Global Business Verification and fully automates the
              retrieval of company vitals from government registrars worldwide
              to help streamline workflows for Know Your Business (KYB),
              Anti-Money Laundering (AML), Know Your Customer (KYC) and Customer
              Due Diligence (CDD) processes.
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
                this.state.activeChapter === "gdpr"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="gdpr"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              ARE OPN PLATFORM IS COMPLIANT WITH General Data Protection
              Regulation (GDPR)?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "gdpr"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              OPN Platform use customer details for the specific purposes they
              have agreed, please see our Privacy Policy.
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
                this.state.activeChapter === "dailyJourney"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="dailyJourney"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              HOW CAN I USE PLATFORM FOR MY DAILY JOURNEY?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "dailyJourney"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              <ul>
                <li className="liPlanSteps">
                  See material price quotations worldwide
                </li>
                <li className="liPlanSteps">
                  Receive price quote in real time for interested or new product
                </li>
                <li className="liPlanSteps">Manage and track shipments</li>
                <li className="liPlanSteps">Find new supplier/business partner</li>
                <li className="liPlanSteps">
                  Find new material/innovative product
                </li>
                <li className="liPlanSteps">
                  Be part of online global packaging network.
                </li>
              </ul>
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}
      </div>
    );
  }
}

export default FaqGeneralTab;
