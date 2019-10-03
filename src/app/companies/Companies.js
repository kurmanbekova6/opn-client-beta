import React from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";

import smallOpnLogo from "../../assets/img/company/small-opn-logo.png";
import QrCode from "../../assets/img/company/qr-code.png";
import cyberSecurity from "../../assets/img/company/cyber-security.png";
import distribution from "../../assets/img/company/distribution.png";
import humanBrain from "../../assets/img/company/human-brain.png";
import bitcoin from "../../assets/img/company/bitcoin.png";
import organization from "../../assets/img/company/organization.png";
import taylor from "../../assets/img/company/taylor.svg";
import pca from "../../assets/img/company/pca.svg";
import brc from "../../assets/img/company/brc.svg";
import novio from "../../assets/img/company/novio.svg";
import vesta from "../../assets/img/company/vesta.svg";

function Companies() {
  return (
    <div className="company">
      <RenderBreadcrumbs value="Company" />
      <Row>
        <Col md="6">
          <div>
            <ColumnHeader value="OPN Platform" />

            <div className="company-opn">
              <div className="company-opn__logo">
                <img src={smallOpnLogo} alt="Opn Logo" />
              </div>
              <div className="company-opn__text">
                <p>
                  With the global packaging industry’s exponential growth, OPN
                  has emerged as an innovative company targeting the sector’s
                  digital challenge. It offers a blockchain-powered open
                  ecosystem in which sellers and buyers in the packaging market
                  communicate openly and safely, with Ethereum-secured
                  transactions and availability of all information about their
                  partners and the order’s progress. The distributed ledger of
                  the OPN marketplace guarantees that all participants are equal
                  in the system, that each participant gets the best deal, and
                  that all processes take place transparently and fairly.
                </p>
                <p>
                  OPN is a system in which any actor of the global packaging
                  industry (buyer or seller) may register and offer/order
                  services and products while interacting directly with other
                  participants. To date, blockchain is the most advanced and
                  safe technology to ensure the sustainability of such a system
                  and ensure error-free transactions run via smart contracting.
                </p>
              </div>
            </div>
          </div>

          <div>
            <ColumnHeader value="The functionality of OPN presently allows" />
            <div className="company-opn-service">
              <div className="company-opn-service-item">
                <div className="company-opn-service-item__img">
                  <img src={QrCode} alt="qr code" />
                </div>
                <p>Simple and quick user registration</p>
              </div>
              <div className="company-opn-service-item">
                <div className="company-opn-service-item__img">
                  <img src={cyberSecurity} alt="cyber Security" />
                </div>
                <p>
                  Verification of users’ personal and business information to
                  guarantee safety of deals
                </p>
              </div>
              <div className="company-opn-service-item">
                <div className="company-opn-service-item__img">
                  <img src={organization} alt="organization" />
                </div>
                <p>Order placement and their automated execution</p>
              </div>

              <div className="company-opn-service-item">
                <div className="company-opn-service-item__img">
                  <img src={humanBrain} alt="human Brain" />
                </div>
                <p>Internal direct communication between users </p>
              </div>
              <div className="company-opn-service-item">
                <div className="company-opn-service-item__img">
                  <img src={bitcoin} alt="bitcoin" />
                </div>
                <p>
                  Flexible payments in both cryptocurrency and fiat currency
                  (USD, EUR)
                </p>
              </div>
              <div className="company-opn-service-item">
                <div className="company-opn-service-item__img">
                  <img src={distribution} alt="distribution" />
                </div>
                <p>Flexible options of logistic service selection</p>
              </div>
            </div>
          </div>
        </Col>

        <Col>
          <ColumnHeader value="OPN Platform PARTNERS" />
          <div className="company-partners">
            <div className="company-partners-item">
              <div className="company-partners-item__img">
                <img src={taylor} alt="taylor logo" />
              </div>
              <p className="company-partners-item__text">Verified KYB</p>
            </div>
            <div className="company-partners-item">
              <div className="company-partners-item__img">
                <img src={pca} alt="pca logo" />
              </div>
              <p className="company-partners-item__text">Verified KYB</p>
            </div>
            <div className="company-partners-item">
              <div className="company-partners-item__img">
                <img src={brc} alt="brc logo" />
              </div>
              <p className="company-partners-item__text">Verified KYB</p>
            </div>

            <div className="company-partners-item">
              <div className="company-partners-item__img">
                <img src={novio} alt="novio logo" />
              </div>
              <p className="company-partners-item__text">Verified KYB</p>
            </div>
            <div className="company-partners-item">
              <div className="company-partners-item__img">
                <img src={vesta} alt="vesta logo" />
              </div>
              <p className="company-partners-item__text">Verified KYB</p>
            </div>
            <div className="company-partners-item">
              <div className="company-partners-item__img company-partners-item__img_empty">
                become
                <br />a new partner
              </div>
              <p className="company-partners-item__text company-partners-item__text_gray">
                Not Verified KYB
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Link to="/register" className="company-btn">
          REGISTER TO JOIN US
        </Link>
      </Row>
    </div>
  );
}

export default Companies;
