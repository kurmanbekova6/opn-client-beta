import React from "react";
import { MaterialPrimaryButton } from "../../ui_components/materialBased/materialBasedButtons";
import Search from "../Search/Search";
import "./css/sidebar.scss";
import moment from "moment";

const tabsButtons = {
  active: {
    outline: "none",
    width: "auto",
    height: 40,
    margin: 0,
    padding: "0 1.7em",
    fontSize: 16,
    boxShadow: "none",
    borderRadius: 20,
    textTransform: "none",
  },
  notActive: {
    outline: "none",
    width: "auto",
    height: 40,
    margin: 0,
    padding: "0 1.7em",
    fontSize: 16,
    boxShadow: "none",
    borderRadius: 20,
    background: "transparent",
    textTransform: "none",
  },
};

class DealsSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };
  }

  changeTab = (tab, value) => {
    this.setState({
      activeTab: tab,
    });
    this.props.closedChats(value);
  };

  render() {
    const { chat, selectedChat } = this.props;
    const { activeTab } = this.state;
    console.log(chat);
    return (
      <main className="deals-sidebar">
        <Search />
        <div className="deals-sidebar-tabs">
          <MaterialPrimaryButton
            label="Open"
            type="button"
            className={
              activeTab === 0
                ? "deals-sidebar_tab deals-sidebar_tab__active"
                : "deals-sidebar_tab deals-sidebar_tab__not-active"
            }
            style={activeTab === 0 ? tabsButtons.active : tabsButtons.notActive}
            onClick={() => this.changeTab(0, "open")}
          />
          <MaterialPrimaryButton
            label="Close"
            type="button"
            className={
              activeTab === 1
                ? "deals-sidebar_tab deals-sidebar_tab__active"
                : "deals-sidebar_tab deals-sidebar_tab__not-active"
            }
            style={activeTab === 1 ? tabsButtons.active : tabsButtons.notActive}
            onClick={() => this.changeTab(1, "close")}
          />
        </div>

        <ul className="deals-sidebar-list">
          {chat && chat.length !== 0 ? (
            chat.map((chat, i) => (
              <li
                className={
                  selectedChat && chat && selectedChat.id === chat.id
                    ? "deals-sidebar-list-item deals-sidebar-list-item__active"
                    : "deals-sidebar-list-item"
                }
                key={i}
                onClick={() => this.props.selectChat(chat)}
              >
                <div className="deals-sidebar-list-item-wrapper">
                  <div className="deals-sidebar-list_content">
                    <p className="deals-sidebar-list_title">
                      {chat.order && chat.order.name ? chat.order.name : " - "}
                    </p>
                    <p className="deals-sidebar-list_company">
                      {/* {chat.mess
                        ? chat.users.map(user =>
                            user.id ===
                            chat.mess[chat.mess.length - 1].from.user
                              ? user.company.name
                              : null
                          )
                        : " - "} */}
                    </p>
                  </div>
                  <p className="deals-sidebar-list_date">
                    {chat && chat.mess.length !== 0
                      ? moment(
                          chat.mess[chat.mess.length - 1].created_at
                        ).format("ll")
                      : ""}
                  </p>
                </div>
                <p className="deals-sidebar-list_about">
                  {chat && chat.mess.length !== 0
                    ? chat.mess[chat.mess.length - 1].text
                    : "You have no messages"}
                </p>
              </li>
            ))
          ) : (
            <ul className="deals-sidebar-list">
              <li className={"deals-sidebar-list-item__active"}>
                <div className="deals-sidebar-list-item-wrapper">
                  <div className="deals-sidebar-list_content">
                    <p className="deals-sidebar-list_title">
                      You have no chats
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          )}
        </ul>
      </main>
    );
  }
}

export default DealsSidebar;
