import React, { Fragment } from "react";

import DealsContentTabs from "./DealsContentTabs";
import DealsDetails from "./DealsDetails";
import DealsDocuments from "./DealsDocuments";
import DealsChat from "./DealsChat";
import "./css/deals-content.scss";

class DealsContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  changeTab = tabNumber => this.setState({ activeTab: tabNumber });

  render() {
    const { activeTab } = this.state;
    const { chat, order, offer, currUser } = this.props;
    return (
      <div className="deals-content">
        {!chat ? (
          <div className="deals-details" style={{ padding: 0 }}>
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
        ) : (
          <Fragment>
            <DealsContentTabs
              activeTab={activeTab}
              changeTab={this.changeTab}
            />

            {activeTab == 0 ? (
              <DealsDetails
                chat={chat}
                order={order}
                offer={offer}
                currUser={currUser}
              />
            ) : activeTab == 1 ? (
              <DealsDocuments
                chat={chat}
                currUser={currUser}
                refreshData={this.props.refreshData}
              />
            ) : activeTab == 2 ? (
              <DealsChat
                refreshData={this.props.refreshData}
                chat={chat}
                currUser={currUser}
              />
            ) : null}
          </Fragment>
        )}
      </div>
    );
  }
}

export default DealsContent;
