import React from "react";

import "./css/deals-content-tabs.scss";

const DealsContentTabs = ({ activeTab, changeTab }) => {
  return (
    <div className="deals-content-tabs">
      <div
        className={
          activeTab === 0
            ? "deals-content-tab deals-content-tab__active"
            : "deals-content-tab"
        }
        onClick={() => changeTab(0)}
      >
        Order details
      </div>
      <div
        className={
          activeTab === 1
            ? "deals-content-tab deals-content-tab__active"
            : "deals-content-tab"
        }
        onClick={() => changeTab(1)}
      >
        Documents
      </div>
      <div
        className={
          activeTab === 2
            ? "deals-content-tab deals-content-tab__active"
            : "deals-content-tab"
        }
        onClick={() => changeTab(2)}
      >
        Messages
      </div>
    </div>
  );
};

export default DealsContentTabs;
