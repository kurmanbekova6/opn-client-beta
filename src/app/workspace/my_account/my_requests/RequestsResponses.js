import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import NavigateBefore from "@material-ui/icons/NavigateBefore";

import "./css/my_responses.scss";

class RequestsResponses extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { showResponses } = this.props;

    return (
      <main className="my-responses">
        <p className="my-responses_back" onClick={showResponses}>
          <NavigateBefore /> All products
        </p>
        <p className="my-responses_company">Folding boxboard (FBB)</p>
        <h2 className="my-responses_product-name">Product name</h2>
        <p className="my-responses_product-about">
          This concept, that there is no competition in your industry, gives you
          a tremendous leverage in business. Results from the effort of one
          person are more than doubled when a second person joins the first
          person.
        </p>
        <p className="my-responses_product-amount">
          Amount <span>1,000kg</span>
        </p>
        <ul className="my-responses-list">
          <li className="my-responses-list-item">
            <div className="my-responses-list-item-header">
              <p className="my-responses-list-item_title">
                International Paper
              </p>
              <p className="my-responses-list-item_date">07 May 2019</p>
            </div>
            <div className="my-responses-list-item-body">
              <p className="my-responses-list-item_about">
                Thought experiments are “facts” in the sense that they have a
                “real life” correlate in the form of electrochemical activity in
                the brain. But it is quite obvious that they do not relate to
                facts “out there”. They are not true statements.
              </p>
              <p className="my-responses-list-item_action">Reply</p>
            </div>
          </li>

          <li className="my-responses-list-item">
            <div className="my-responses-list-item-header">
              <p className="my-responses-list-item_title">Reynolds Group</p>
              <p className="my-responses-list-item_date">07 May 2019</p>
            </div>
            <div className="my-responses-list-item-body">
              <p className="my-responses-list-item_about">
                Chances are unless you are very lucky you will go thru many
                different relationships before you find your special someone.
                Finding your sole mate is like gambling. In poker and blackjack
                you may have to play dozens of hands until you get a winning
                hand, and it is the same with relationships.
              </p>
              <p className="my-responses-list-item_action">Reply</p>
            </div>
          </li>

          <li className="my-responses-list-item">
            <div className="my-responses-list-item-header">
              <p className="my-responses-list-item_title">
                International Paper
              </p>
              <p className="my-responses-list-item_date">07 May 2019</p>
            </div>
            <div className="my-responses-list-item-body">
              <p className="my-responses-list-item_about">
                Thought experiments are “facts” in the sense that they have a
                “real life” correlate in the form of electrochemical activity in
                the brain. But it is quite obvious that they do not relate to
                facts “out there”. They are not true statements.
              </p>
              <p className="my-responses-list-item_action">Reply</p>
            </div>
          </li>
        </ul>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
  };
};

export default connect(mapStateToProps)(RequestsResponses);
