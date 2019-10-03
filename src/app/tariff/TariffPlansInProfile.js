import React from "react";
import { Container, Col, Row } from "reactstrap";
import TarifBoxes from "./containers/TarifBoxes";
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import { tariffPlans } from "../../assets/makeOrder";
import { Redirect } from "react-router";
import MenuProfile from "../common/profileMenu/MenuProfile";
import { connect } from "react-redux";

const TariffPlans = props => {
  const { isLoggedIn } = props;
  return (
    <Container className="company-profile tariffs-in-profile">
      {!isLoggedIn ? <Redirect to="/login" /> : <React.Fragment />}

      <RenderBreadcrumbs value="Tariffs" />
      {/* Page title */}
      <Row>
        <Col className="profileChart" md="4">
          <MenuProfile header="Profile" />
        </Col>
        <Col className="profileChart" md="8">
          <Row>
            <Col md="12">
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
            <Col md="12" className="tarifs">
              <Row>
                <div className="tarifContent-cntnr">
                  {tariffPlans.map(it => (
                    <div className="tarifContent tarif-box">
                      <TarifBoxes
                        id={it.id}
                        titleMain={it.titleMain}
                        subtitle={it.subtitle}
                        ordersCount={it.ordersCount}
                        content={it.content}
                        plan={it.plan}
                      />
                    </div>
                  ))}
                </div>
              </Row>
            </Col>
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
