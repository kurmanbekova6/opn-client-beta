import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
// Material Ui
import Grid from "@material-ui/core/Grid";
// Components
import DealsSidebar from "./DealsSidebar";
import DealsContent from "./DealsContent";
// Errors
import { errorMessageParser } from "../../utils/errorMessageParser";
import ResponseMessage from "../../ui_components/responseMessage/ResponseMessage";

import { loginStatus } from "../../../redux/actions/userActions";
import "./css/deals.scss";

class Deals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null,
      offer: null,
      chat: [],
      selectedChat: null,
      chatsHistoryType: 0,
      openChats: [],
      closedChats: [],
      currUser: "",
      errors: [],
    };
  }

  componentDidMount() {
    setTimeout(this.getChats, 500);
    this.getUserInfo();
  }

  getChats = () => {
    if (this.props.token === "" || this.props.clientId === "") {
      this.setState({
        loggedIn: false,
      });
    } else {
      axios
        .post("/msg/box/chats", {
          access_token: this.props.token,
          clientId: this.props.clientId,
          offset: 0,
          count: 40,
        })
        .then(res => {
          this.setState(
            {
              chatsId: res.data.result,
            },
            this.chatInfo
          );
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.props.changeLoginStatus(false);
          } else {
            this.setState({
              errors: errorMessageParser(error),
            });
          }
        });
    }
  };

  chatInfo = () => {
    this.state.chatsId.map(chat => {
      axios
        .post("/msg/chat/info", {
          access_token: this.props.token,
          clientId: this.props.clientId,
          chat,
        })
        .then(res => {
          let data =
            res.data.result.closed === false
              ? Object.assign(res.data.result, { id: chat })
              : [];
          let closedData =
            res.data.result.closed === true
              ? Object.assign(res.data.result, { id: chat })
              : [];
          if (res.data.result.closed === false) {
            if (res.data.result.order) {
              this.setState({
                order: res.data.result.order,
                offer: res.data.result.offer,
              });
            }

            axios
              .post("/msg/chat/thread", {
                clientId: this.props.clientId,
                access_token: this.props.token,
                chatId: chat,
                offset: 0,
                count: 40,
              })
              .then(res => {
                let messages = Object.assign(data, { mess: res.data.result });
                let closedMess = Object.assign(closedData, {
                  mess: res.data.result,
                });
                this.setState({
                  chat: [...this.state.chat, messages],
                  openChats: [...this.state.openChats, messages],
                });
              });
          } else {
            if (res.data.result.order) {
              this.setState({ order: res.data.result.order });
            }
            let closedData = Object.assign(res.data.result, { id: chat });
            axios
              .post("/msg/chat/thread", {
                clientId: this.props.clientId,
                access_token: this.props.token,
                chatId: chat,
                offset: 0,
                count: 40,
              })
              .then(res => {
                let messages = Object.assign(data, { mess: res.data.result });
                let closedMess = Object.assign(closedData, {
                  mess: res.data.result,
                });
                this.setState({
                  closedChats: [...this.state.closedChats, closedMess],
                });
              })
              .catch(error => {
                if (error.response.status === 401) {
                  this.props.changeLoginStatus(false);
                } else {
                  this.setState({
                    errors: errorMessageParser(error),
                  });
                }
              });
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.props.changeLoginStatus(false);
          } else {
            this.setState({
              errors: errorMessageParser(error),
            });
          }
        });
    });
  };

  selectChatInfo = id => {
    axios
      .post("/msg/chat/info", {
        access_token: this.props.token,
        clientId: this.props.clientId,
        chat: id,
      })
      .then(res => {
        let data = Object.assign(res.data.result, { id: id });
        axios
          .post("/msg/chat/thread", {
            clientId: this.props.clientId,
            access_token: this.props.token,
            chatId: id,
            offset: 0,
            count: 40,
          })
          .then(res => {
            let messages = Object.assign(data, { mess: res.data.result });
            this.setState({
              selectedChat: messages,
            });
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.props.changeLoginStatus(false);
            } else {
              this.setState({
                errors: errorMessageParser(error),
              });
            }
          });
      });
  };

  getUserInfo = () => {
    axios
      .post("/user/lookup", {
        access_token: this.props.token,
        clientId: this.props.clientId,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            currUser: res.data.result._id,
          });
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.changeLoginStatus(false);
        } else {
          this.setState({
            errors: errorMessageParser(error),
          });
        }
      });
  };

  closedChats = value => {
    if (value === "open") {
      this.setState({
        chat: this.state.openChats,
      });
    } else {
      this.setState({
        chat: this.state.closedChats,
      });
    }
  };

  selectChat = chat => {
    console.log("CHAT====", chat);
    this.setState({
      selectedChat: chat,
      order: chat.order,
      offer: chat.offer,
    });
  };

  render() {
    const { chat, selectedChat, order, offer, currUser, errors } = this.state;
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <main className="deals">
          <Grid container>
            <Grid xs={12} md={3} item>
              {errors.length !== 0
                ? errors.map((error, i) => (
                    <ResponseMessage
                      key={i}
                      textAlign="center"
                      message={error}
                      type="error"
                    />
                  ))
                : null}
              <DealsSidebar
                selectChat={this.selectChat}
                chat={chat}
                selectedChat={selectedChat}
                closedChats={this.closedChats}
                currUser={currUser}
              />
            </Grid>
            <Grid xs={12} md={8} item>
              <DealsContent
                order={order ? order : null}
                offer={offer ? offer : null}
                chat={selectedChat}
                refreshData={this.selectChatInfo}
                currUser={currUser}
              />
            </Grid>
          </Grid>
        </main>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLoginStatus: value => {
      dispatch(loginStatus(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deals);
