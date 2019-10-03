import React from "react";

const ChatItem = ({ data, toggleChat, id, logo }) => {
  let calend;
  let time;
  let text;
  /* Date and text */
  if (data.mess.length !== 0) {
    let arr = data.mess[data.mess.length - 1].created_at.split("T");
    let txt = data.mess[data.mess.length - 1].text;
    if (txt.length < 70) {
      text = txt;
    } else {
      `${text.substr(0, 70)}...`;
    }

    calend = arr[0];
    time = arr[1].split(".")[0];
  } else {
    text = "You have no messages";
  }

  return (
    <div className="chat-item" onClick={() => toggleChat(id)}>
      <div className="chat-item-img">
        <img src={logo} alt="logo" />
        {/* data.newMessages && (
                    <div className="chat-item__new-messages">
                        {data.newMessages}
                    </div>
                ) */}
      </div>
      <p
        className="chat-item__text"
        /*  className={
                    data.newMessages
                        ? "chat-item__text chat-item__new"
                        : "chat-item__text"
                } */
      >
        {text}
      </p>
      {data.mess.length !== 0 ? (
        <div
          className="chat-item-date-wrapper"
          /*  className={
                            data.newMessages
                                ? "chat-item-date-wrapper chat-item__new"
                                : "chat-item-date-wrapper"
                        } */
        >
          <p className="chat-item__date">{calend || ""}</p>
          <p>{time}</p>
        </div>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};

export default ChatItem;
