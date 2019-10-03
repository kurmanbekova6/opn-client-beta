import React from "react";
import { Container, Col, Row } from "reactstrap";
import TarifBox from "./containers/TarifBox";
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import { tariffPlans } from "../../assets/makeOrder";
import { Redirect } from "react-router";
import { connect } from "react-redux";

const TariffPlans = props => {
  const { isLoggedIn } = props;
  return (
    <Container className="company-profile">
      {!isLoggedIn ? <Redirect to="/login" /> : <React.Fragment />}
      <RenderBreadcrumbs value="Tariffs" />
      {/* Page title */}
      <Row>
        <Col className="profileChart" md="12">
          <Row>
            <Col>
              <span className="columnHeader">TARIFF PLANS</span>
              <hr className="columnHeaderLine" />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Page content */}
      <Row>
        <Col className="tarifTitle" md="12">
          <Row>
            <Col>
              <span className="tarifHeader">MORE PRODUCTS / MORE ORDERS</span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="10" className="tarifs">
          <Row>
            {tariffPlans.map((it, i) => (
              <Col className="tarifContent" xs="12" md="4" key={i}>
                <TarifBox
                  id={it.id}
                  titleMain={it.titleMain}
                  subtitle={it.subtitle}
                  ordersCount={it.ordersCount}
                  content={it.content}
                  plan={it.plan}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    isLoggedIn: state.loginStatus,
  };
};

export default connect(mapStateToProps)(TariffPlans);
