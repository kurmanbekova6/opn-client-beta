import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ColumnHeader from "../../ui_components/Titles/ColumnHeader";
//
class RecentViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewed: [],
      products: [],
      result: [],
    };
  }

  componentDidMount = () => {
    axios
      .post(`/views/recent`, {
        clientId: this.props.clientId,
        access_token: this.props.token,
        count: 4,
      })
      .then(res => {
        this.setState(
          {
            viewed: res.data.result,
          },
          this.getProducts()
        );
        console.log(this.state.viewed);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getProducts = () => {
    axios
      .post(`/orders/get/${this.props.isLoggedIn ? 1 : 0}/all`, {
        clientId: this.props.clientId,
        access_token: this.props.token !== "" ? this.props.token : "",
        count: 200,
        offset: 0,
      })
      .then(res => {
        if (res.status === 200) {
          res.data.result.map(prod => {
            this.state.viewed.map(it => {
              if (it.order === prod._id) {
                this.setState({
                  result: [...this.state.result, prod],
                });
              }
            });
          });
        }
      })
      .catch(error => {
        switch (error.response.status) {
          case 401:
            this.refreshToken();
            break;
          case 400:
            this.refreshToken();
            break;
          default:
            console.log(error);
        }
      });
  };

  render() {
    const { isLoggedIn, loggedIn } = this.props;
    const { viewed, products, result } = this.state;
    return (
      <div>
        {isLoggedIn ? (
          <div>
            {viewed !== [] ? (
              <React.Fragment>
                <ColumnHeader value="THE RECENTLY WATCHED PRODUCTS" />
                <div className="viewed-container">
                  {result !== [] ? (
                    result.map((it, i) => (
                      <div className="viewed__item" key={i}>
                        <div className="viewed__item_img">
                          <img
                            src={`${location.protocol}//${
                              location.hostname == "localhost"
                                ? "dev.opnplatform.com"
                                : location.hostname
                            }/api/v1/file/${it.photos[0]._id}`}
                            alt="Product"
                          />
                        </div>
                        <div className="viewed__item_content">
                          <div className="viewed__item_content-date">
                            <span> № {it.index}</span>
                            <span>
                              {it.auction
                                ? moment(it.auction.start).format(
                                    "DD | MM | YYYY"
                                  )
                                : "12 | 07 | 2019"}
                            </span>
                          </div>
                          <div className="viewed__item_content-name">
                            {it.name}
                          </div>
                          <div className="viewed__item_content-counry">
                            {it.country}
                          </div>
                          <div className="viewed__item_content-price">
                            {it.price} (opk/$)
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <React.Fragment />
                  )}
                </div>
                {/* <Link to="/register" className="main-footer-button viewed-btn">
                  Register to see more
                </Link> */}
              </React.Fragment>
            ) : (
              <div className="categories__not-login">
                <p>You must have no viewed products</p>
              </div>
            )}
          </div>
        ) : (
          <div className="categories__not-login">
            <p>You must log in to access recent views</p>
            <Link to="login" className="cat-login">
              Login
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
    token: state.token,
    refresh: state.refresh,
    loggedIn: state.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  null
)(RecentViews);
