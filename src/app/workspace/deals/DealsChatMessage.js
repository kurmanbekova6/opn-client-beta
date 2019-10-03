import React from "react";
import moment from "moment";
import { connect } from "react-redux";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import DoneAll from "@material-ui/icons/DoneAll";

import "./css/deals-chat-message.scss";

const useStyles = makeStyles(theme => ({
  icon: {
    width: 16,
    height: 16,
    color: "#f0eff1",
  },
}));

const DealsChatMessage = props => {
  const classes = useStyles();
  return (
    <div
      className={
        props.user === props.currUser
          ? "deals-chat-message deals-chat-message__sent"
          : "deals-chat-message"
      }
    >
      <div className="deals-chat-message-content">
        <div>
          <span className="deals-chat-message_name">
            {props.users.map(user => (user.id === props.user ? user.name : ""))}
          </span>
          <span className="deals-chat-message_company" />
        </div>
        <p className="deals-chat-message_time">
          <span>{moment(props.time).format("LT")}</span>
          <DoneAll
            classes={{
              root: classes.icon,
            }}
          />
        </p>
      </div>
      <p className="deals-chat-message_text">
        {props.text ? props.text : null}
      </p>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    userInfo: state.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  null
)(DealsChatMessage);
