import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Material ui
import Grid from "@material-ui/core/Grid";
// Components
import CategoriesBar from "../ui_components/categories/CategoriesBar";
import Search from "../ui_components/search/Search";
import ItemList from "../common/ItemList/ItemList";
import { MaterialPrimaryButton } from "../ui_components/materialBased/materialBasedButtons";
// Custom Ui
import PageHeadline from "../ui_components/Titles/pageHeadline";
import SubHeadline from "../ui_components/Titles/subHeadline";

class CategoriesMain extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /* TODO: add when there will be unique URLs */
    /* intercom event */
    // window.Intercom("update", {
    //   app_id: "ulueqf5y",
    //   name: this.props.isLoggedIn
    //     ? this.props.loggedIn.data.result.name
    //     : "Unauthorized user", // Full name
    //   email: this.props.isLoggedIn
    //     ? this.props.loggedIn.data.result.mail.id
    //     : "Unauthorized user", // Email address
    //   "Page URL is": 'URL contains /products"',
    // });
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <Grid container justify="center">
          <PageHeadline value="Open Packaging Network" text-align="center" />
          <Search />
          <CategoriesBar
            token={this.props.token}
            clientId={this.props.clientId}
          />
          <SubHeadline value="All products" />
          <ItemList
            token={this.props.token}
            clientId={this.props.clientId}
            searchResult={this.props.searchResult}
            apiUrl="/category/list/all"
            apiitems={250}
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
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(CategoriesMain);
