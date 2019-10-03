import React, { Component } from "react";
import FaqGeneralTab from "./tabs/FaqGeneralTab";
import FaqLogisticTab from "./tabs/FaqLogisticTab";
import FaqPaymentsTab from "./tabs/FaqPaymentsTab";
import FaqPartTab from "./tabs/FaqPartTab";
import FaqBuyingTab from "./tabs/FaqBuyingTab";
import FaqSellingTab from "./tabs/FaqSellingTab";
import { withRouter } from "react-router";

/*-----------------------------------------------------*/
/*           To hide Tab just comment it's             */
/*             <div/> in render() method               */
/*  all dimensions will be recalculated automatically  */
/*               Set Tab width in state                */
/*-----------------------------------------------------*/

// TODO: add transition multiplier
class FaqTabsMenu extends Component {
  constructor(props) {
    super(props);
    this.refFirstBtn = React.createRef();
    this.refBtnContainer = React.createRef();
    this.state = {
      tabWidth: 562,
      freeSpaceUnit: 0,
      buttonsAmount: 1,
      activeTab: "general",
      activeTabIndex: 0,
      tabsOffset: 0,
      arrowPos: 12,
      tabPos: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({
      // calculate arrow position at center of the first button
      arrowPos: this.refFirstBtn.current.getBoundingClientRect().width / 2 - 14,
      // get amount of tabs (buttons)and subtract 1 to make proper multiplier for tab offset
      buttonsAmount: this.refBtnContainer.current.children.length - 1,
    });
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    // Calculating free space unit to use as tab offset multiplier
    this.setState(
      state => ({
        freeSpaceUnit:
          (this.refBtnContainer.current.getBoundingClientRect().width -
            state.tabWidth) /
          state.buttonsAmount,
      }),
      () => {
        if (
          window.document.getElementById(this.props.location.hash.substr(1))
        ) {
          window.document
            .getElementById(this.props.location.hash.substr(1))
            .click();
        }
      }
    );
  };

  handleButtonClick = e => {
    // calculate arrow position at the center of a target button
    let arrowPos =
      e.currentTarget.getBoundingClientRect().x -
      this.refFirstBtn.current.getBoundingClientRect().x -
      14 +
      e.currentTarget.getBoundingClientRect().width / 2;
    // calculate tab offset with equal divided free space and target button index
    let tabPos =
      this.state.freeSpaceUnit *
      [...e.target.parentNode.children].findIndex(
        item => item.id === e.target.id
      );
    this.setState({ activeTab: e.target.id, arrowPos, tabPos });
  };
  render() {
    return (
      <div className="faq-tabs-wrapper">
        <div
          ref={this.refBtnContainer}
          className="faq-tabs-menu__button-container"
        >
          <div
            id="general"
            ref={this.refFirstBtn}
            className={`faq-tabs-menu__button ${
              this.state.activeTab === "general"
                ? "faq-tabs-menu__button-active"
                : null
            }`}
            onClick={this.handleButtonClick}
          >
            GENERAL
          </div>
          <div
            id="buying"
            className={`faq-tabs-menu__button ${
              this.state.activeTab === "buying"
                ? "faq-tabs-menu__button-active"
                : null
            }`}
            style={{
              letterSpacing: "1.5px",
            }}
            onClick={this.handleButtonClick}
          >
            BUYING WITH OPN
          </div>
          <div
            id="selling"
            className={`faq-tabs-menu__button ${
              this.state.activeTab === "selling"
                ? "faq-tabs-menu__button-active"
                : null
            }`}
            style={{ letterSpacing: "1.5px" }}
            onClick={this.handleButtonClick}
          >
            SELLING WITH OPN
          </div>
          <div
            id="logistic"
            className={`faq-tabs-menu__button ${
              this.state.activeTab === "logistic"
                ? "faq-tabs-menu__button-active"
                : null
            }`}
            style={{ letterSpacing: "1.4px" }}
            onClick={this.handleButtonClick}
          >
            SHIPMENT AND QUALITY VERIFICATION
          </div>
          <div
            id="payments"
            className={`faq-tabs-menu__button ${
              this.state.activeTab === "payments"
                ? "faq-tabs-menu__button-active"
                : null
            }`}
            style={{ letterSpacing: "1.5px" }}
            onClick={this.handleButtonClick}
          >
            PAYMENTS
          </div>
          {/*<div*/}
          {/*id="security"*/}
          {/*className={`faq-tabs-menu__button ${*/}
          {/*this.state.activeTab === "security"*/}
          {/*? "faq-tabs-menu__button-active"*/}
          {/*: null*/}
          {/*}`}*/}
          {/*onClick={this.handleButtonClick}*/}
          {/*>*/}
          {/*SECURITY*/}
          {/*</div>*/}
          <div
            id="part"
            className={`faq-tabs-menu__button ${
              this.state.activeTab === "part"
                ? "faq-tabs-menu__button-active"
                : null
            }`}
            onClick={this.handleButtonClick}
          >
            BEING A PART
          </div>
        </div>
        <div className="faq-tabs__tabs-container">
          <div
            className="faq-tabs__tab-arrow"
            style={{ left: `${this.state.arrowPos}px` }}
          />
          <div
            className="faq-tabs__tab-border"
            style={{
              left: `${this.state.tabPos}px`,
              width: `${this.state.tabWidth}px`,
            }}
          >
            {this.state.activeTab === "general" ? <FaqGeneralTab /> : null}
            {this.state.activeTab === "buying" ? <FaqBuyingTab /> : null}
            {this.state.activeTab === "selling" ? <FaqSellingTab /> : null}
            {this.state.activeTab === "logistic" ? <FaqLogisticTab /> : null}
            {this.state.activeTab === "payments" ? <FaqPaymentsTab /> : null}
            {this.state.activeTab === "part" ? <FaqPartTab /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FaqTabsMenu);
