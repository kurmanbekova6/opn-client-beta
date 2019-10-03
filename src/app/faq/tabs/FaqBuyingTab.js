import React, { Component } from "react";
import YouTube from "react-youtube";

/*------------------------------------------------------*/
/*  Default open chapter id need to be placed in state  */
/*  If it shouldn't be opened, place an empty string    */
/*  For new chapters id must be placed into 3 <div/>s:  */
/*  faq-single-tab__chapter-arrow                       */
/*  faq-single-tab__chapter-button                      */
/*  faq-single-tab__chapter-content                     */
/*------------------------------------------------------*/

class FaqBuyingTab extends Component {
  state = {
    activeChapter: "buyGoods",
    opts: {
      playerVars: {
        autoplay: 0,
        rel: 0,
        // listType: "playlist",
        // list: "PLcVTKFsHVcWU_DiPPJTKR1NBzzXy5zymR",
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
        <YouTube
          containerClassName="faq-single-tab__video-wrapper"
          videoId="_buM5cj_buM"
          opts={this.state.opts}
        />
        {/*--- CHAPTER START ---*/}
        <div className="faq-single-tab__chapter">
          <div className="faq-single-tab__chapter-row">
            <div
              className="faq-single-tab__chapter-arrow"
              style={
                this.state.activeChapter === "buyGoods"
                  ? { borderColor: "#96c9fd", transform: "rotate(45deg)" }
                  : null
              }
            />
            <div
              id="buyGoods"
              className="faq-single-tab__chapter-button"
              onClick={this.handleButtonClick}
            >
              HOW CAN I BUY PRODUCT VIA OPN PLATFORM?
            </div>
          </div>
          <div
            className={`faq-single-tab__chapter-content ${
              this.state.activeChapter === "buyGoods"
                ? "faq-single-tab__appear"
                : "faq-single-tab__disappear"
            }`}
          >
            <p>
              After you login, click the Orders tab. You will be redirected to
              creating a new order.
            </p>
            <p>
              When creating a new order, first selects the order type:
              <br />• <b>Product</b>
            </p>

            <h6 className="faq-single-tab__content-highlight">Step 1:</h6>
            <p>
              Write your header for the order in the Header field. <br />
              In the Order for field choose:
              <br />• <b>Buy</b>
            </p>
            <h6 className="faq-single-tab__content-highlight">Step 2:</h6>
            <p>
              Enter product name in the Product Name field. Write your
              description in the Description field.
            </p>
            <h6 className="faq-single-tab__content-highlight">Step 3:</h6>
            <p>
              Choose material from the dropdown list, then choose material
              category.
            </p>
            <p className="faq-single-tab__content-highlight">
              You can create an order only after uploading and verifying
              documents certifying company’s legal entity.
            </p>
            <p className="faq-single-tab__content-highlight">
              The created order matches with all available ones and is displayed
              in fully matching orders for all parameters.
            </p>
          </div>
        </div>
        {/*--- CHAPTER END ---*/}
      </div>
    );
  }
}

export default FaqBuyingTab;
