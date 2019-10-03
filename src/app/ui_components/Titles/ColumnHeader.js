import React from "react";
import { Col, Row } from "reactstrap";

const ColumnHeader = props => {
  return (
    <Row>
      <Col>
        <span className="columnHeader">{props.value}</span>{" "}
        {props.comments ? (
          <span className="columnHeaderComment">{props.comments}</span>
        ) : (
          ""
        )}
        <hr className="columnHeaderLine" />
      </Col>
    </Row>
  );
};
export default ColumnHeader;
