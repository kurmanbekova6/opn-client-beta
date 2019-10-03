import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

// Material UI
import { fade } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/styles";
import { withTheme } from "@material-ui/styles";

// Components
import DealsChatMessage from "./DealsChatMessage";
import DealsNotification from "./DealsNotification";
import DropdownChatInput from "./DropdownChatInput";
import "./css/deals-chat.scss";

// Custom UI
import SubHeadline from "../../ui_components/Titles/subHeadline";

const styles = theme => ({
  wrapper: {
    height: "100%",
    position: "relative",
    borderRadius: 12,
    marginLeft: 10,
    backgroundColor: "#f0eff1",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    border: "1px solid #dddddd",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  inputRoot: {
    color: "#aaaaaa !important",
    width: "100%",
  },
  inputInput: {
    padding: "16px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: 200,
    },
    color: "#aaaaaa",
    fontSize: "14px",
  },
});

class DealsChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
    };
  }

  handleInutChange = event => {
    event.preventDefault();
    this.setState({
      inputValue: event.target.value,
    });
  };

  addMessage = event => {
    event.preventDefault();
    axios
      .post("/msg/send", {
        clientId: this.props.clientId,
        access_token: this.props.token,
        chat: this.props.chat.id,
        text: this.state.inputValue,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            inputValue: "",
          });
          this.props.refreshData(this.props.chat.id);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { chat, classes, currUser } = this.props;
    if (chat !== null) {
      return (
        <div className="deals-chat">
          <div className="deals-chat-content">
            {chat.mess ? (
              chat.mess.map((item, id) => (
                <React.Fragment key={id}>
                  {item.text.length === 0 && item.attachments.length !== 0 ? (
                    <DealsNotification
                      attachment={item.attachments}
                      token={this.props.token}
                      clientId={this.props.clientId}
                      users={chat.users}
                      currUser={currUser}
                      user={item.from.user}
                    />
                  ) : (
                    <DealsChatMessage
                      id={item.chatId}
                      status={item.status}
                      user={item.from.user}
                      users={chat.users}
                      currUser={currUser}
                      time={item.created_at}
                      text={item.text}
                      item={item}
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <SubHeadline value="Please, select chat" />
            )}
          </div>
          <div className="deals-chat-actions">
            <DropdownChatInput chat={chat} />
            <div className={classes.wrapper}>
              <form onSubmit={this.addMessage}>
                <InputBase
                  value={this.state.inputValue}
                  onChange={this.handleInutChange}
                  placeholder="Message"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="deals-chat">
          <div className="deals-chat-content__empty">
            <div className="deals-chat-content__empty-title">Notification</div>
            <div className="deals-chat-content__empty-body">
              Please, select chat
            </div>
          </div>

          <div className="deals-chat-actions" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(withTheme(DealsChat)));
