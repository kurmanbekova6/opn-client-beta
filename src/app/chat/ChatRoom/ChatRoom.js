import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
/* Components */
import MessagesList from "./MessagesList";
import ChatForm from "./ChatForm";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      access_token: "",
      companyId: "",
      chatId: "",
      messages: [],
      users: [],
      loggedIn: true,
    };
  }

  componentDidMount = () => {
    this.getId();
    setTimeout(this.getMessages, 500);
    setTimeout(this.getChatInfo, 1000);
  };

  getId = () => {
    if (this.props.access_token.length < 0) {
      this.setState({ loggedIn: !this.state.loggedIn });
    } else {
      axios
        .get("/client/id")
        .then(res => {
          if (res.status === 200) {
            this.setState({
              clientId: res.data.result.clientId,
              access_token: this.props.access_token.data.result.access_token
                .token,
              companyId: this.props.access_token.data.result._id,
              chatId: this.props.chatId,
            });
          }
        })
        .catch(error => {
          this.setState({
            loggedIn: !this.state.loggedIn,
          });
        });
    }
  };

  getChatInfo = () => {
    axios
      .post("/msg/chat/info", {
        clientId: this.state.clientId,
        access_token: this.state.access_token,
        chat: this.props.chatId,
      })
      .then(res => {
        this.setState({
          users: res.data.result.users,
        });
      });
  };

  getMessages = () => {
    axios
      .post("/msg/chat/thread", {
        clientId: this.state.clientId,
        access_token: this.state.access_token,
        chatId: this.props.chatId,
        offset: 0,
        count: 40,
      })
      .then(res => {
        this.setState({
          messages: res.data.result,
        });
      })
      .catch(err => console.log(err));
  };

  addMessage = value => {
    axios
      .post("/msg/send", {
        clientId: this.state.clientId,
        access_token: this.state.access_token,
        chat: this.props.chatId,
        text: value,
      })
      .then(res => {
        this.setState({
          messages: [...this.state.messages, res.data.result],
        });
      });
  };

  render() {
    const { loggedIn, messages, users, companyId } = this.state;
    return (
      <div className="chatroom">
        {!loggedIn ? <Redirect to="login" /> : <React.Fragment />}
        <MessagesList messages={messages} users={users} companyId={companyId} />
        <ChatForm addMessage={this.addMessage} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  null
)(ChatRoom);
