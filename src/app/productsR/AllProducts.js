import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Material ui
import Grid from "@material-ui/core/Grid";
// Components
import CategoriesBar from "../ui_components/categories/CategoriesBar";
import Search from "../ui_components/search/Search";
import ProductList from "./productsList/ProductList";
import { MaterialPrimaryButton } from "../ui_components/materialBased/materialBasedButtons";
// Custom Ui
import PageHeadline from "../ui_components/Titles/pageHeadline";
import SubHeadline from "../ui_components/Titles/subHeadline";

const AllProducts = props => {
  if (props.isLoggedIn) {
    return (
      <Grid container justify="center">
        <PageHeadline value="Open Packaging Network" text-align="center" />
        <Search />
        <CategoriesBar token={props.token} clientId={props.clientId} />
        <SubHeadline value="All products" />
        <ProductList
          token={props.token}
          clientId={props.clientId}
          searchResult={props.searchResult}
        />
      </Grid>
    );
  } else {
    return (
      <Grid container justify="center">
        <SubHeadline value="Please sign in to see the products" />
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
              borderRadius: 20,
              textTransform: "none",
            }}
          />
        </Link>
      </Grid>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    searchResult: state.search,
    isLoggedIn: state.loginStatus,
  };
};

export default connect(mapStateToProps)(AllProducts);
