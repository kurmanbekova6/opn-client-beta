import React from "react";
import moment from "moment";

import "./css/deals-notification.scss";
import DoneAll from "@material-ui/icons/DoneAll";

const DealsNotification = props => {
  return (
    <div className="deals-notification">
      <div className="deals-notification_head">
        <div className="deals-notification_head_title">
          <span className="deals-notification_head_title-name">
            Notification
          </span>
          <span className="deals-notification_head_title-date">
            {props.attachment
              ? moment(props.attachment[0].created_at).format("LT")
              : ""}{" "}
            <DoneAll className="deals-notification_head_title-date_icon" />
          </span>
        </div>
        <div className="deals-notification_body">
          {props.users.map(user =>
            user.id === props.currUser ? user.name : ""
          )}{" "}
          has uploated the <a>{props.attachment[0].name}</a>
        </div>
      </div>
    </div>
  );
};

export default DealsNotification;
