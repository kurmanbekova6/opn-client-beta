import React from "react";

import FooterMenu from "./FooterMenu";
/* partners logo */
import logoTraceAlliance from "../../../assets/img/company/trace-alliance.svg";
import logoAipia from "../../../assets/img/company/aipia.png";
import fooStripe from "../../../assets/img/company/fooStripe.svg";
import innosuisse from "../../../assets/img/company/innosuisse_logo.png";

/* social */
import fb from "../../../assets/img/social-icons/facebook.svg";
import tw from "../../../assets/img/social-icons/twitter.svg";
import lin from "../../../assets/img/social-icons/linkedin.svg";
import yt from "../../../assets/img/social-icons/youtube.svg";
import m from "../../../assets/img/social-icons/medium.svg";

import "./css/footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row footer-row__mb">
        <FooterMenu />

        <ul className="footer-social">
          <li className="footer-social_item">
            <a href="https://www.facebook.com/OpnPlatform/" target="_blank">
              <img src={fb} alt="facebook logo" />
            </a>
          </li>
          <li className="footer-social_item">
            <a
              href="https://www.linkedin.com/company/28997241/"
              target="_blank"
            >
              <img src={lin} alt="linkedin logo" />
            </a>
          </li>
          <li className="footer-social_item">
            <a href="https://medium.com/@openpackagingnetwork" target="_blank">
              <img src={m} alt="medium logo" />
            </a>
          </li>
          <li className="footer-social_item">
            <a
              href="https://www.youtube.com/channel/UC0L8kz1iaNb_sYMTSl6XekQ"
              target="_blank"
            >
              <img src={yt} alt="youtube logo" />
            </a>
          </li>
          <li className="footer-social_item">
            <a href="https://twitter.com/OpenPackaginNet" target="_blank">
              <img src={tw} alt="twitter logo" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-row">
        <p className="footer_copy">
          &copy; COPYRIGHT 2008-2019. All rights reserved.
        </p>

        <div className="footer-support">
          <a
            className="footer-support_item footer-support_item__text"
            href="https://www.innosuisse.ch/inno/en/home.html"
            target="_blank"
          >
            <img src={innosuisse} alt="innosuisse logo" />
            Supported by Innosuisse
          </a>
          <a
            href="https://alliance.origintrail.io/members"
            className="footer-support_item"
            target="_blank"
          >
            <img src={logoTraceAlliance} width="118" alt="partner logo" />
          </a>
          <a
            href="https://www.aipia.info/member-Open-Packaging-Network-AG-1352.php"
            className="footer-support_item"
            target="_blank"
          >
            <img src={logoAipia} width="36" alt="partner logo" />
          </a>
          <a
            href="https://stripe.com/en-US/get-started?&utm_campaign=paid_brand&utm_medium=cpc&utm_source=google&ad_content=291862789430&utm_term=stripe&utm_matchtype=e&utm_adposition1t1&utm_device=c&gclid=EAIaIQobChMI6sGnzNbK4QIVz7XtCh3sng39EAAYASAAEgL2WvD_BwE"
            className="footer-support_item"
            target="_blank"
          >
            <img src={fooStripe} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
