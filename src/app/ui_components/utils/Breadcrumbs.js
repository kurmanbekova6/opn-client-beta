import React from "react";
import { Col, Row } from "reactstrap";

const RenderBreadcrumbs = props => {
  return (
    <Row className=".row-2">
      <Col>
        <p className="breadcrumbs">{props.value}</p>
      </Col>
    </Row>
  );
};

export default RenderBreadcrumbs;
