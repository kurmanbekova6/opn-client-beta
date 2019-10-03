import React from "react";
import { Col, Row } from "reactstrap";

const ColumnChatHeader = props => {
  return (
    <Row>
      <Col>
        <div className="columnChatHeader">
          <span className="columnHeader">{props.value}</span>
          <div className="columnChatHeader-buttons">
            <span
              className={`columnHeader columnHeader__chat-btn ${
                props.activeTab === 0 ? "columnHeader__chat-btn_active" : ""
              } `}
            >
              <button onClick={() => props.changeChatTab(0)}>Active</button>
            </span>
            <span
              className={`columnHeader columnHeader__chat-btn ${
                props.activeTab === 1 ? "columnHeader__chat-btn_active" : ""
              } `}
            >
              <button onClick={() => props.changeChatTab(1)}>History</button>
            </span>
          </div>
          <hr className="columnHeaderLine" />
        </div>
      </Col>
    </Row>
  );
};
export default ColumnChatHeader;
