import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { MaterialFixedTextButton } from "../ui_components/materialBased/materialBasedButtons";
import "./no-match.scss";

const NoMatch = props => {
  const { isLoggedIn } = props;

  return (
    <div className="no-match">
      <p className="no-match_sup-title">Something went wrong</p>
      <h1 className="no-match_title">404</h1>
      <p className="no-match_sub-title">
        Maybe you are interested in the next sections
      </p>
      <ul className="no-match-nav">
        {isLoggedIn ? (
          <Fragment>
            <li>
              <Link to="/categories">
                <MaterialFixedTextButton label="All categories" />
              </Link>
            </li>
            <li>
              <Link to="/market">
                <MaterialFixedTextButton label="Products" />
              </Link>
            </li>
            <li>
              <Link to="/market">
                <MaterialFixedTextButton label="Requests" />
              </Link>
            </li>
            {/* <li>
              <Link to="/categories">
              <MaterialFixedTextButton
                label="FAQ"
                />
                </Link>
            </li> */}
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <Link to="/categories">
                <MaterialFixedTextButton label="All categories" />
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
    loggedIn: state.loggedIn,
  };
};
export default connect(mapStateToProps)(NoMatch);
