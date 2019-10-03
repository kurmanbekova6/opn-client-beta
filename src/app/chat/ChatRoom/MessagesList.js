import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import logo from "../../../assets/img/chat-logo.png";

const MessagesList = ({ messages, companyId, users }) => {
  return (
    <div className="chatroom-list">
      <Scrollbars
        className="chatroom-list-scrollbar"
        renderView={({ style }) => (
          <div style={{ ...style, paddingRight: "10px" }} />
        )}
        renderThumbVertical={({ style }) => (
          <div
            style={{
              ...style,
              backgroundColor: "#548cc4",
              borderRadius: "1px",
            }}
          />
        )}
        style={{ height: 320 }}
      >
        {messages.length !== 0 ? (
          messages.map(message => (
            <div
              className={
                message.length !== 0 && message.from.user === companyId
                
                  ? "chatroom-item chatroom-item_inverted-color "
                  : "chatroom-item"
              }
            >
             
              <div className="chatroom-item-img-wrapper">
                <img
                  src={
                    users.length !== 0
                      ? users[0].id === message.from.user
                        ? users[0].company.logo_url !== ""
                          ? users[0].company.logo_url
                          : logo
                        : users[1].company.logo_url !== ""
                        ? users[1].company.logo_url
                        : logo
                      : logo
                  }
                  alt="Logo"
                />
              </div>
              <div className="chatroom-item-message-wrapper">
                <p className="chatroom-item__message">{message.text}</p>
                <p className="chatroom-item__date">
                  {message.created_at.split("T")[1].split(".")[0]}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="chatroom-item__message-empty">
            You have no messages in this chat
          </div>
        )}
      </Scrollbars>
    </div>
  );
};

export default MessagesList;
