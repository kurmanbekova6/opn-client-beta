import React, { Component } from "react";

/*------------------------------------------------------*/
/*  Default open chapter id need to be placed in state  */
/*  If it shouldn't be opened, place an empty string    */
/*  For new chapters id must be placed into 3 <div/>s:  */
/*  faq-single-tab__chapter-arrow                       */
/*  faq-single-tab__chapter-button                      */
/*  aq-single-tab__chapter-content                      */
/*------------------------------------------------------*/

class FaqPartTab extends Component {
  state = {
    activeChapter: "rewards",
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
                this.state.activeChapter === "rewards"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="rewards"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              ARE THERE ANY REWARDS FOR PROMOTING OPN IN MY LOCAL COMMUNITY?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "rewards"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              Yes, you get remuneration in OPK Token for promoting the project.
              The exact payment amount depends of the type and scope of your
              activity, please contact our marketing Team via{" "}
              <a href="mailto:marketing@opnplatform.com" target="_blank">
                marketing@opnplatform.com
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
                this.state.activeChapter === "communicate"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="communicate"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              HOW CAN I COMMUNICATE WITH OTHER OPN USERS?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "communicate"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              You can communicate with your counterparty through internal chat
              in your workspace.
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
                this.state.activeChapter === "social"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="social"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              WHAT SOCIAL FEATURES DOES OPN PLATFORM OFFER?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "social"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              You can follow users, add them to favorites, get notified about
              order placements. There also rating and review features that you
              can use to evaluate your counterparties performance. OPN Team is
              constantly working to introduce new social features to the
              platform.
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
                this.state.activeChapter === "testimonials"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="testimonials"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              CAN I RATE COUNTERPARTY AFTER CLOSING A DEAL?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "testimonials"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              After each successfully closed deal you are given the opportunity
              to evaluate your counterparties performance with stars from 2
              different categories, for example: Speed and Quality. You can also
              leave your comments on the Rating page after closing the deal.
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
                this.state.activeChapter === "community"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="community"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              WHAT CAN I DO TO HELP OPN COMMUNITY GROW?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "community"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              To help OPN community grow, you can enroll in OPN Ambassador
              program in your country and engage in the following activities:
            </p>
            <p>
              <li className="liPlanSteps">
                Influencer campaign management in social media Facebook,
                Twitter, Instagram, Youtube, Linkedin, etc…
              </li>
              <li className="liPlanSteps">
                OPN promotions in social media, blogs.
              </li>
              <li className="liPlanSteps">
                Content creation in social media, blog Tumblir, Reddit
              </li>
              <li className="liPlanSteps">
                Content sharing in social media, blog Tumblir,Reddit
              </li>
              <li className="liPlanSteps">
                Social media post creation and sharing
              </li>
              <li className="liPlanSteps">Forum post creation and sharing</li>
              <li className="liPlanSteps">Community Group Setup & Moderation</li>
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
                this.state.activeChapter === "ambassador"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="ambassador"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              ARE THERE ANY REQUIREMENTS TO BECOME OPN AMBASSADOR?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "ambassador"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>Yes, the ideal candidate for OPN Ambassador program is:</p>
            <p>
              <li className="liPlanSteps">
                Packaging, label or brand management industry expert
              </li>
              <li className="liPlanSteps">Decent in written and spoken English</li>
              <li className="liPlanSteps">
                Fluent in home countries native language
              </li>
            </p>
            <p>
              Please contact for more information:{" "}
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

export default FaqPartTab;
