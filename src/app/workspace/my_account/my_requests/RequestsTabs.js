import React, { Component } from "react";
import { connect } from "react-redux";

import "./css/my_requests.scss";

class RequestsTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isActiveTab, onChangeTab } = this.props;

    return (
      <div className="my-requests-tabs">
        <p
          className={
            isActiveTab === "incoming"
              ? "my-requests-tabs_item my-requests-tabs_item__active"
              : "my-requests-tabs_item"
          }
          onClick={() => onChangeTab("incoming")}
        >
          Incoming
        </p>
        <p
          className={
            isActiveTab === "sent"
              ? "my-requests-tabs_item my-requests-tabs_item__active"
              : "my-requests-tabs_item"
          }
          onClick={() => onChangeTab("sent")}
        >
          Sent Requests
        </p>
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

export default connect(mapStateToProps)(RequestsTabs);
