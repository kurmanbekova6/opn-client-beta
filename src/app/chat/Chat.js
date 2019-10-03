import React from "react";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";
import { Redirect } from "react-router-dom";
/* Components */
import ChatItem from "./ChatItem";
/* Spinner */
import Spinner from "../common/spinner/Spinner";

import pca from "../../assets/img/chat-logo.png";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatsId: [],
      chatList: [],
      loggedIn: true,
      isLoading: true,
    };
  }

  componentWillMount = () => {
    setTimeout(this.getChats, 500);
    setTimeout(this.selectedChatInfo, 1000);
  };

  getChats = () => {
    if (this.props.access_token === "" || this.props.clientId === "") {
      this.setState({
        loggedIn: false,
      });
    } else {
      axios
        .post("/msg/box/chats", {
          access_token: this.props.access_token,
          clientId: this.props.clientId,
        })
        .then(res => {
          this.setState({
            chatsId: res.data.result,
            isLoading: false,
          });
        });
    }
  };

  selectedChatInfo = () => {
    if (this.state.chatsId !== []) {
      this.state.chatsId.map(chat => {
        axios
          .post("/msg/chat/info", {
            access_token: this.props.access_token,
            clientId: this.props.clientId,
            chat,
          })
          .then(res => {
            let data = Object.assign(res.data.result, { id: chat });
            axios
              .post("/msg/chat/thread", {
                clientId: this.props.clientId,
                access_token: this.props.access_token,
                chatId: chat,
                offset: 0,
                count: 40,
              })
              .then(res => {
                let messages = Object.assign(data, { mess: res.data.result });
                this.setState({
                  chatList: [...this.state.chatList, messages],
                  isLoading: false,
                });
              });
          });
      });
    }
  };

  render() {
    const { toggleChat } = this.props;
    const { loggedIn, isLoading } = this.state;
    return (
      <div className="chat-list">
        {!loggedIn ? <Redirect to="/login" /> : <React.Fragment />}
        <Scrollbars
          className="chat-list-scrollbar"
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
          style={{ height: 435 }}
        >
          {isLoading ? (
            <Spinner />
          ) : this.state.chatList.length !== 0 ? (
            this.state.chatList.map((chat, k) => (
              <ChatItem
                key={k}
                data={chat}
                toggleChat={toggleChat}
                id={chat.id}
                logo={chat.users[0].company.logo_url || pca}
              />
            ))
          ) : (
            <p className="register-sucess">You have no chats</p>
          )}
        </Scrollbars>
      </div>
    );
  }
}
