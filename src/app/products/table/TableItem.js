import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

class TableItem extends Component {
  constructor(props) {
    super(props);
  }

  handleAddClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const { products } = this.props;
    return products.map(item => (
      <li
        className={`products-table-content__item ${
          item.purpose === "BUY" ? "products-table-content__item-buy" : ""
        }`}
        key={item._id}
      >
        <Link
          to={`/create_order/${item._id}`}
          className="products-table-content__link"
        >
          <div className="product-item">
            {item.photos.length > 0 ? (
              <img
                className="product-item__img"
                src={`${location.protocol}//${
                  location.hostname == "localhost"
                    ? "dev.opnplatform.com"
                    : location.hostname
                }/api/v1/file/${item.photos[0]._id}`}
                alt="Product"
              />
            ) : null}

            <div>
              <div className="product-item-details">
                <span className="product-item-details__number">
                  № {item.index}
                </span>
                <span className="product-item-details__date">
                  {item.auction
                    ? moment(item.auction.start).format("DD | MM | YYYY")
                    : "12 | 07 | 2019"}
                </span>
                {item.stats ? (
                  <div className="views-count">
                    <span className="views-num">{item.stats.views}</span>
                    <span className="views-txt">views</span>
                  </div>
                ) : (
                  <div className="views-count">
                    <span className="views-num">0</span>
                    <span className="views-txt">views</span>
                  </div>
                )}
              </div>
              <p className="product-item__name">
                {(item.name ? item.name : "-") + ` #${item.index}`}
              </p>
              <p className="product-item__about">{item.description}</p>
            </div>
          </div>

          {this.props.access_token.data ? (
            <div className="product-item-company">
              <div>
                <p className="product-item-company__name">
                  {item.company && item.company.profile.name
                    ? item.company.profile.name
                    : "-"}
                </p>
                <p className="product-item-company__status">
                  <span className="product-item__checked">Prove</span>
                </p>
              </div>
            </div>
          ) : null}

          {this.props.access_token.data ? (
            <div className="product-item-price">
              <div>
                <p className="product-item-price__value">
                  {item.price ? item.price / 100 : "-"}
                </p>
                <p className="product-item-price__note">Your price?</p>
              </div>
            </div>
          ) : null}

          <div className="product-item-location">
            <div>
              {/* <p className="product-item-location__contry">{item.continent}</p> */}

              <p className="product-item-location__contry">
                {item.country ? item.country : "-"}
              </p>

              <p className="product-item-location__place">
                {item.company &&
                item.company.location &&
                item.company.location.address
                  ? item.company.location.address
                  : "-"}
              </p>
            </div>
          </div>

          {/* <div className="product-item-activity">
            <div>
              <p> - </p>
            </div>
          </div> */}

          {/*<div className="product-item-status">*/}
          {/*  <div>*/}
          {/*    <p>{item.status}</p>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="product-item-process">
            <div>
              <p className="product-item-location__contry">
                {item.purpose ? item.purpose : "-"}
              </p>
            </div>
          </div>

          {/*{this.props.access_token.data ? (*/}
          {/*  <div className="product-item-add">*/}
          {/*    <div onClick={this.handleAddClick}>*/}
          {/*      <img*/}
          {/*        src={require(`../../../assets/img/add_order.png`)}*/}
          {/*        alt="Add order"*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*) : null}*/}
        </Link>
      </li>
    ));
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
  };
};

export default connect(mapStateToProps)(TableItem);
