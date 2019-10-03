import React from "react";
import { Col, Row } from "reactstrap";

import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";
import LogisticPreRegisterForm from "./forms/LogisticPreRegisterForm";
import dhl from "../../assets/img/logistic/dhl.png";
import fedex from "../../assets/img/logistic/fedex.png";
import maersk from "../../assets/img/logistic/maersk.png";
import cosco from "../../assets/img/logistic/cosco.png";
import kwe from "../../assets/img/logistic/kwe.png";
import nippon from "../../assets/img/logistic/nippon.png";

import LogisticMap from "./map/LogisticMap";
import logisticMap from "../../consts/logisticMap";

function Logistic() {
  return (
    <div className="logistic">
      <RenderBreadcrumbs value="Logistic" />
      <Row>
        <Col md="4">
          <div>
            <ColumnHeader value="DELIVERY&LOGISTIC" />

            <div className="logistic-opn">
              <div className="logistic-opn__text">
                <p>
                  Packaging industry is a sector with complex logistic involving
                  numerous participants and steps. Thus, for the buyer to be
                  sure that his order is fulfilled in compliance with the time,
                  geographical, and budgetary estimates, the OPN tracks all
                  orders’ logistics and provides timely updates to all
                  stakeholders about the order’s progress. Here you can track
                  your order’s status by its ID, see what steps it went through
                  and which steps are the next, and check whether the order’s
                  logistics is in line with your contractual agreements.
                </p>
              </div>
            </div>
          </div>
        </Col>

        <Col md="4">
          <ColumnHeader value="LOGISTIC PARTNERS" />
          <div className="logistic-partners">
            <div className="logistic-partners-item">
              <div className="logistic-partners-item__img">
                <img src={dhl} alt="taylor logo" />
              </div>
            </div>
            <div className="logistic-partners-item">
              <div className="logistic-partners-item__img">
                <img src={fedex} alt="pca logo" />
              </div>
            </div>
            <div className="logistic-partners-item">
              <div className="logistic-partners-item__img">
                <img src={maersk} alt="brc logo" />
              </div>
            </div>
            <div className="logistic-partners-item">
              <div className="logistic-partners-item__img">
                <img src={cosco} alt="novio logo" />
              </div>
            </div>
            <div className="logistic-partners-item">
              <div className="logistic-partners-item__img">
                <img src={kwe} alt="vesta logo" />
              </div>
            </div>
            <div className="logistic-partners-item">
              <div className="logistic-partners-item__img">
                <img src={nippon} alt="vesta logo" />
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="print logistic-form">
            <ColumnHeader value="LOGISTIC PARTNERSHIP REQUEST" />
            <LogisticPreRegisterForm />
          </div>
        </Col>
      </Row>
      <div className="logistic-map">
        <Row>
          <Col>
            <h1 className="logistic__title">DELIVERY&LOGISTIC GEOGRAPHIC</h1>
          </Col>
        </Row>
        <LogisticMap {...logisticMap.GOOGLE_MAPS_SETTINGS} />
      </div>
    </div>
  );
}

export default Logistic;
