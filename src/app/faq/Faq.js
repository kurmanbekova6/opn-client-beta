import React from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
/* Custom ui */
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import MenuProfile from "../common/profileMenu/MenuProfile";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";
import FaqTabs from "../faq/FaqTabs";

const Faq = props => {
  return (
    <Container className="company-profile">
      <RenderBreadcrumbs value="Profile" />
      <Row>
        {props.loginStatus ? (
          <Col className="profileChart" md="4">
            <MenuProfile header="Profile" />
          </Col>
        ) : (
          <React.Fragment />
        )}
        <Col
          className="profileChart"
          xs="12"
          md={props.loginStatus ? "8" : { size: 10, offset: 1 }}
        >
          <ColumnHeader value="FAQ Help center" />
          <Row>
            <FaqTabs key={props.loginStatus ? "1" : "2"} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    loginStatus: state.loginStatus,
  };
};

export default connect(
  mapStateToProps,
  null
)(Faq);
