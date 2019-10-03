import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Sitemap extends Component {
  state = {};

  render() {
    return (
      <div className="site-map__wrapper">
        <div className="site-map__root-label">OPN Package</div>
        <ul className="site-map__ul">
          {this.props.links.map(item => {
            return (
              <li key={item.key} className="site-map__li">
                <Link to={item.linkTo}>{item.page}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // access_token: state.loggedIn,
    // loginStatus: state.loginStatus,
    links: state.menu.get("pages"),
  };
};

export default connect(mapStateToProps)(Sitemap);
