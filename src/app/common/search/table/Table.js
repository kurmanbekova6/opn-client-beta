import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import TableItem from "./TableItem";

class Table extends Component {
  render() {
    const { orders, loginStatus } = this.props;
    return (
      <Fragment>
        {orders.length > 0 ? (
          <div>
            <div className="products-table-caption">
              <div>About</div>
              {loginStatus && <div>Organizer</div>}
              {loginStatus && <div>Price</div>}
              <div>Region</div>
              <div>Process</div>
            </div>

            <ul className="products-table-content">
              <TableItem products={orders} />
            </ul>
          </div>
        ) : (
          <div className="products-table-empty">There are no search result</div>
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = state => {
  return {
    loginStatus: state.loginStatus,
  };
};

export default connect(
  mapDispatchToProps,
  null
)(Table);
