import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import "./css/my_requests.scss";

class RequestsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { requests, requestType, showResponses } = this.props;

    return (
      <div className="my-requests-wrapper">
        {/* <p className="my-requests_date-separator">22 february</p> */}
        <ul className="my-requests-list">
          {requests.length
            ? requests.map((item, id) => (
                <li className="my-requests-list-item" key={id}>
                  <div className="my-requests-list-item-wrapper">
                    <div className="my-requests-list-item-content">
                      <p className="my-requests-list-item_category">
                        {item.company.profile.name}
                      </p>
                      <p className="my-requests-list-item_name">{item.name}</p>
                      <p className="my-requests-list-item_amount">
                        Amount{" "}
                        <span>
                          {item.amount && item.amount.number
                            ? item.amount.number
                            : " "}
                          {item.amount && item.amount.unit
                            ? item.amount.unit
                            : " - "}
                        </span>
                      </p>
                    </div>

                    <div className="my-requests-list-item-content my-requests-list-item-content__align-left">
                      <p className="my-requests-list-item_details">
                        {item.index} / {moment(item.created_at).format("LT")}
                      </p>

                      {requestType === "incoming" ? (
                        <div className="my-requests-list-item-activity">
                          <p className="my-requests-list-item_responses">
                            <span>5</span>Responses
                          </p>
                          <p
                            className="my-requests-list-item_more"
                            onClick={showResponses}
                          >
                            Show all
                          </p>
                        </div>
                      ) : (
                        <p className="my-requests-list-item_setting">
                          Settings
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
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

export default connect(mapStateToProps)(RequestsList);
