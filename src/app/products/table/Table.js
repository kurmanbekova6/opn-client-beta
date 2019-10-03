import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import TableItem from "./TableItem";
import { DownArrow } from "../../../consts/icons";
import {
  productsSorting,
  getExistProducts,
  getProductsByCompany,
  setProducts,
} from "../../../redux/actions/productActions";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productOrganizers: [],
      organizer: "Organizer",
      // region: "Region"
    };

    // this.handleSelect = this.handleSelect.bind(this);
    this.handleOrganizerSelect = this.handleOrganizerSelect.bind(this);
    this.getCompanyNamesForSelect = this.getCompanyNamesForSelect.bind(this);
  }

  componentDidMount() {
    this.getCompanyNamesForSelect();
  }

  getCompanyNamesForSelect = () => {
    const { products } = this.props;
    var organizersList = [
      ...new Set(
        products.map(item =>
          item.company ? item.company.profile.name : "unknown"
        )
      ),
    ];
    this.setState({ productOrganizers: organizersList });
  };

  handleOrganizerSelect = name => event => {
    if (event.target.value === "Organizer") {
      // get all products (which have been saved in redux)
      this.setState({ [name]: event.target.value });
      return this.props.getExistProducts();
    }

    this.setState({ [name]: event.target.value });
    this.props.getProductsByCompany(event.target.value);
  };

  // handleSelect = name => event => {
  //   this.setState({ [name]: event.target.value });
  // };

  render() {
    const { productOrganizers, organizer } = this.state;
    const { products } = this.props;

    return (
      <Fragment>
        <Row>
          <div className="products-table-header">
            <Col sm="12" md="5">
              <div className="products-filtering">
                <div
                  className="products-filtering-button__sell"
                  onClick={() => this.props.setFilter("SELL")}
                >
                  sellers orders
                </div>
                <div
                  className="products-filtering-button__buy"
                  onClick={() => this.props.setFilter("BUY")}
                >
                  buyers orders
                </div>
              </div>
            </Col>
            <Col sm="12" md="7">
              <div className="products-stats-sorting">
                {/* <div className="products-stats">
            <div className="products-stats-wrapper">
              <p>
                <span className="products-stats__title">All orders</span>
                <span className="products-stats__link">578</span>
              </p>
            </div>
            <div className="products-stats-wrapper">
              <p>
                <span className="products-stats__title">Archive</span>
                <span className="products-stats__link">2 573</span>
              </p>
            </div>
            <div className="products-stats-wrapper">
              <p>
                <span className="products-stats__title">Views</span>
                <span className="products-stats__link">6340</span>
              </p>
            </div>
          </div> */}
                <div className="products-sorting">
                  <div
                    className={
                      this.props.sortType === "az"
                        ? "products-sorting__item products-sorting__item_active products-sorting__item_uc"
                        : "products-sorting__item products-sorting__item_uc"
                    }
                    onClick={() => this.props.productsSorting("az")}
                  >
                    a-z <DownArrow value={"#96c9fd"} />
                  </div>

                  <div
                    className={
                      this.props.sortType === "date"
                        ? "products-sorting__item products-sorting__item_active"
                        : "products-sorting__item"
                    }
                    onClick={() => this.props.productsSorting("date")}
                  >
                    Date <DownArrow value={"#96c9fd"} />
                  </div>

                  {this.props.access_token.data ? (
                    <div
                      className={
                        this.props.sortType === "price"
                          ? "products-sorting__item products-sorting__item_active"
                          : "products-sorting__item"
                      }
                      onClick={() => this.props.productsSorting("price")}
                    >
                      Price <DownArrow value={"#96c9fd"} />
                    </div>
                  ) : null}

                  <div
                    className={
                      this.props.sortType === "region"
                        ? "products-sorting__item products-sorting__item_active"
                        : "products-sorting__item"
                    }
                    onClick={() => this.props.productsSorting("region")}
                  >
                    Region <DownArrow value={"#96c9fd"} />
                  </div>

                  {this.props.access_token.data ? (
                    <div className="products-sorting-select">
                      <select
                        value={organizer}
                        onChange={this.handleOrganizerSelect("organizer")}
                      >
                        <option value="Organizer" defaultValue={"Organizer"}>
                          Organizer
                        </option>
                        {productOrganizers.map((i, k) => (
                          <option key={k} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                </div>
              </div>
            </Col>
          </div>
        </Row>

        {products.length > 0 ? (
          <div>
            <div className="products-table-caption">
              <div>About</div>
              {this.props.access_token.data && <div>Organizer</div>}
              {this.props.access_token.data && <div>Price</div>}
              <div>Region</div>
              {/* <div>Participants/ Proposals</div> */}
              {/*<div>Result</div>*/}
              <div>Process</div>
              {/*{this.props.access_token.data && <div>Add order</div>}*/}
            </div>

            <ul className="products-table-content">
              <TableItem products={products} />
            </ul>
          </div>
        ) : (
          <div className="products-table-empty">There are no products yet</div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    sortType: state.product.sortType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    productsSorting: sortType => {
      dispatch(productsSorting(sortType));
    },
    getExistProducts: () => {
      dispatch(getExistProducts());
    },
    getProductsByCompany: companyName => {
      dispatch(getProductsByCompany(companyName));
    },
    setProducts: products => {
      dispatch(setProducts(products));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
