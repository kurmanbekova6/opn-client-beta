import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
// Material ui
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
// Components
import Item from "./Item";
// Custom Ui
import { errorMessageParser } from "../../utils/errorMessageParser";
import "./css/itemList.scss";

class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      prodCount: 0,
      errors: [],
      prodOnPage: this.props.apiItems,
      toLogin: false,
    };
  }

  componentDidMount() {
    this.getProductsFromApi();
  }

  getProductsFromApi = () => {
    const requestCategory = {
      access_token: this.props.token,
      clientId: this.props.clientId,
    };

    const requestProduct = {
      access_token: this.props.token,
      clientId: this.props.clientId,
      count: this.state.prodOnPage,
    };

    axios
      .post(
        this.props.apiUrl,
        this.props.apiUrl === "/category/list/all"
          ? requestCategory
          : requestProduct
      )
      .then(res => {
        this.setState({
          products: res.data.result,
          prodCount: res.data.result.length,
        });
      })
      .catch(error => {
        if (error.response) {
          let err = errorMessageParser(error);
          this.setState({
            errors: err,
          });
        }

        if (error.response && error.response.status === 401) {
          this.setState({
            toLogin: true,
          });
        }
      });
  };

  scrollGetMoreProducts = () => {
    this.setState({
      prodOnPage: this.state.prodOnPage + 4,
    });
  };

  render() {
    const { products, prodCount, errors, prodOnPage, toLogin } = this.state;
    const { searchResult } = this.props;
    if (products.length !== 0 && searchResult.length === 0) {
      return (
        <Grid container>
          {errors
            ? errors.map((item, i) => {
                return (
                  <Grid item xs={12} key={i} className="error-container">
                    {item}
                  </Grid>
                );
              })
            : null}

          {products.map((product, i) => (
            <Grid item xs={12} md={3} key={i} className="item-list_container">
              <Item product={product} />
            </Grid>
          ))}
          {prodOnPage === products.length ? (
            <div className="item-list_progress-container">
              <CircularProgress
                variant="static"
                value={75}
                onClick={scrollGetMoreProducts}
                className="item-list_progress"
              />
            </div>
          ) : null}
        </Grid>
      );
    } else if (searchResult.length !== 0) {
      return (
        <Grid container>
          {errors
            ? errors.map((item, i) => {
                return (
                  <Grid item xs={12} key={i} className="error-container">
                    {item}
                  </Grid>
                );
              })
            : null}
          {searchResult.map((product, i) => (
            <Grid item xs={12} md={3} key={i} className="item-list_container">
              <Item product={product} />
            </Grid>
          ))}
        </Grid>
      );
    } else if (toLogin) {
      return <Redirect to="/login" />;
    } else {
      return (
        <Grid container>
          <p style={{ textAlign: "center", width: "100%", fontSize: "20px" }}>
            Here is no orders
          </p>
        </Grid>
      );
    }
  }
}

export default ItemList;
