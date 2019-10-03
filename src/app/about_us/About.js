import React, { Component } from "react";
import MetaTags from "react-meta-tags";

import feature1 from "../../assets/img/svg/know_your_business_partner instantly.svg";
import feature2 from "../../assets/img/svg/safe_and_fast_payments_inside_through_open_banking_API.svg";
import feature3 from "../../assets/img/svg/open_market_price_formation.svg";
import feature4 from "../../assets/img/svg/packaging_raw_materials_benchmarks_and_trends.svg";
import feature5 from "../../assets/img/svg/gobal_packaging_industry_network .svg";
import feature6 from "../../assets/img/svg/API_integration_with_third_part_ERP_systems.svg";
import feature7 from "../../assets/img/svg/supply_chain_management.svg";
import feature8 from "../../assets/img/svg/quality_assurance_cloud_data_storage.svg";

import stripe from "../../assets/img/wallet/stripe-gradient.svg";
import plaid from "../../assets/img/wallet/plaid.svg";

import "./css/about.scss";

const featuresData = [
  { img: feature1, text: "Know your business partner instantly" },
  {
    img: feature2,
    text: "Safe and fast payments inside through Open Banking API",
  },
  { img: feature3, text: "Open market price formation" },
  { img: feature4, text: "Packaging raw materials benchmarks and trends" },
  {
    img: feature5,
    text: "Global packaging industry network",
  },
  { img: feature6, text: "API integration with third part ERP systems" },
  { img: feature7, text: "Supply Chain Management" },
  { img: feature8, text: "Quality assurance cloud data storage" },
];

const partnersData = [{ img: stripe, width: 154 }, { img: plaid, width: 169 }];

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    document.title = "OPN Platform";
    document.getElementsByTagName("meta")["description"].content =
      "Join the Next Generation AI Driven Peer-to-Peer online marketplace for packaging  materials. It's time to re-package the global packaging industry. We drive out packaging disruptions and put in place robust, fair and transparent procurement processes.Enjoy our safe deals and price transparency. Scale fast, worldwide. Start working with instant verified suppliers, get the best price in the market, process related financial transactions securely and instantly, select logistic partners with best delivery times and costs, and reduce environmental pollution and product waste with eco-friendly, biodegradable  solutions.";
  }

  render() {
    return (
      <main className="about">
        <MetaTags>
          <title>About Open Packaging Network</title>
          <meta
            name="description"
            content="Learn more about OPN to discover our proposal."
          />
        </MetaTags>

        <section className="about-head">
          <h1 className="about_title">Open Packaging Network</h1>
          <p className="about_subtitle">
            Learn more about OPN to discover our proposal.
          </p>
          <h2 className="about-head_title">About us</h2>
          <p className="about-head_text">
            OPN Platform is an innovative B2B planet-friendly raw material
            packaging marketplace made to connect buyers and sellers directly,
            as well as to close a deal in few clicks - instead of in a month’s
            or a year's time - to provide an end-to-end supply chain to improve
            your procurement process, and to trade, finance and insure to
            increase your liquidity.
          </p>
          <p className="about-head_text">
            We are a one-stop solution for packaging industry players of any
            size and type. OPN was designed with the best interest of end users
            in mind, from resin manufacturers, substrate converters, ready
            packaging producers, packaging designers, logistic and finance
            services. We have taken into account all business risks and have
            developed hi-tech software based on the latest technologies:
            blockchain, AI and IoT.
          </p>
        </section>

        <section className="about-features">
          <h2 className="about-features_title">OPN features</h2>
          <ul className="about-features-list">
            {featuresData.map((item, id) => (
              <li className="about-features-list_item" key={id}>
                <img src={item.img} alt="features icon" />
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-partners">
          <h2 className="about-partners_title">Our partners</h2>
          <ul className="about-partners-list">
            {partnersData.map((item, id) => (
              <li className="about-partners-list_item" key={id}>
                <img src={item.img} width={item.width} alt="partner logo" />
              </li>
            ))}
          </ul>
        </section>
      </main>
    );
  }
}

export default About;
