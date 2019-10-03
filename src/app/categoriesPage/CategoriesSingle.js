import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
// Custom UI
import PageTitle from "../ui_components/Titles/PageTitle";
import SubHeadline from "../ui_components/Titles/subHeadline";
import { MaterialPrimaryButton } from "../ui_components/materialBased/materialBasedButtons";
// Material UI
import Grid from "@material-ui/core/Grid";
import FilterCategory from "./filters/FilterCategory";
import FilterCountry from "./filters/FilterCountry";
// Components
import CategoryList from "./categorysList/CategorysList";
import { countriesList } from "../../consts/filterCountry";

class CategoriesSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
      categoryProducts: [],
      loggedIn: true,
    };
  }

  componentWillMount() {
    let url = window.location.toString().split("/");
    let id = window.location.toString().split("/")[url.length - 1];
    this.getCategoryById(id);
    this.getCategoryProduct(id);
  }

  getFilteredProducts = id => {
    this.setState({
      categoryId: id,
    });
  };

  getCountry = country => {
    this.setState(
      {
        country,
      },
      this.getCategorySubs()
    );
  };

  getCategorySubs = () => {
    axios
      .post(`/category/subs`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
        country: this.state.country,
        id: this.state.categoryId,
      })
      .then(res => {
        if (res.data.result.length === 0) {
          this.setState({
            noSubCategorys: "There are no categories",
          });
        } else {
          this.setState({
            subCategorys: res.data.result,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getCategoryProduct = id => {
    axios
      .post(`/orders/by_category`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
        count: 250,
        offset: 0,
        id: id,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            categoryProducts: res.data.result,
          });
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          if (error.response.status === 401 || error.response.status === 400) {
            this.setState({
              loggedIn: false,
            });
          } else {
            console.log(error);
          }
        } else {
          console.log(error);
        }
      });
  };

  getCategoryById = id => {
    axios
      .post(`/category/lookup`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
        id: id,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            category: res.data.result,
          });
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          if (error.response.status === 401 || error.response.status === 400) {
            this.setState({
              loggedIn: false,
            });
          } else {
            console.log(error);
          }
        } else {
          console.log(error);
        }
      });
  };
  render() {
    const { categoryProducts, loggedIn, category } = this.state;
    console.log(category);
    if (loggedIn) {
      return (
        <Grid container justify="center">
          <Grid item xs={10}>
            <PageTitle
              title={category ? category.name : "-"}
              description="This concept, that there is no competition in your industry, gives you a tremendous leverage in business. Results from the effort of one person are more than doubled when a second person joins the first person."
            />
            <CategoryList subCategories={categoryProducts} />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container justify="center">
          <SubHeadline value="Please sign in to see the products." />
          <Link to="/login">
            <MaterialPrimaryButton
              label="Log in"
              type="button"
              style={{
                outline: "none",
                width: "auto",
                height: 40,
                margin: 0,
                padding: "0 1.7em",
                fontSize: 16,
                boxShadow: "none",
                borderRadius: 12,
                textTransform: "none",
              }}
            />
          </Link>
        </Grid>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    searchResult: state.search,
    isLoggedIn: state.loginStatus,
    product: state.product,
  };
};

export default connect(
  mapStateToProps,
  null
)(CategoriesSingle);
