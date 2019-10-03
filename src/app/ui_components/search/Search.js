import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setSearchRes } from "../../../redux/actions/searchActions";

// Material UI
import { fade } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { withTheme } from "@material-ui/styles";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";

// Custom Ui
import { errorMessageParser } from "../../utils/errorMessageParser";
import Filter from "../../common/filter/Filter";
import Chips from "../../common/filter/Chips";

const styles = theme => ({
  root: {
    display: "flex",
    //justifyContent: "center",
    //marginTop: "33px",
    alignContent: "center",
    //alignItems: "center",
    //marginBottom: "32px",
    //flexWrap: "wrap",
    //height: 48,
  },
  search: {
    height: 48,
    position: "relative",
    borderRadius: 12,
    backgroundColor: "#f0eff1",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    border: "1px solid #dddddd",
    width: "100%",
  },
  inputRoot: {
    color: "#aaaaaa !important",
  },
  inputInput: {
    padding: "14px",
    transition: theme.transitions.create("width"),
    width: "688px",
    [theme.breakpoints.down("md")]: {
      width: 200,
    },
    color: "#aaaaaa",
    fontSize: "14px",
  },
  fab: {
    margin: "0 16px",
    outline: "none !important",
    color: "#aaaaaa",
    fontSizze: "24px",
    boxShadow: "none",
    height: 48,
    width: 48,
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputValue: "",
      errors: [],
      filters: [],
      filteredProducts: [],
    };
  }

  handleInputChange = event => {
    this.setState({
      searchInputValue: event.target.value,
      errors: [],
    });
  };

  search = () => {
    axios
      .post(`/search`, {
        clientId: props.clientId,
        access_token: props.token,
        value: searchInputValue,
        object: "order",
        count: 100,
        offset: 0,
      })
      .then(res => {
        props.setSearchRes(res.data.result.orders);
        this.setState({
          searchInputValue: "",
          errors: [],
        });
      })
      .catch(error => {
        if (error.response) {
          let err = errorMessageParser(error);
          setError(err);
          this.setState({
            errors: err,
          });
        }
      });
  };

  // setFilters = filters => {
  //   this.setState(
  //     {
  //       filters,
  //     },
  //     this.filterProducts
  //   );
  // };

  setFilters = filters => {
    this.setState(
      {
        filters,
      },
      this.filterProducts
    );
  };

  handleDelete = itemId => {
    let result = this.state.filters.filter(it => itemId !== it.id);
    this.setState(
      {
        filters: result,
      },
      this.filterProducts
    );
  };

  filterProducts = () => {
    this.state.filters.map(item => {
      this.getProductByCategory(item.id);
    });
  };

  getProductByCategory = id => {
    console.log("Getting");
    axios
      .post("/orders/by_category", {
        access_token: this.props.token,
        clientId: this.props.clientId,
        id,
        count: 250,
        offset: 0,
      })
      .then(res => {
        console.log(res.data.result);
        if (res.status === 200) {
          if (this.state.filteredProducts.length > 0) {
            let array = this.state.filteredProducts.filter(
              it => it._id !== res.data.result._id
            );
            if (res.data.result.length > 0) {
              this.setState(
                {
                  filteredProducts: [...this.state.filteredProducts, array],
                },
                () =>
                  this.props.getFilteredProducts(this.state.filteredProducts)
              );
            }
          } else {
            if (res.data.result.length > 0) {
              this.setState(
                {
                  filteredProducts: [
                    ...this.state.filteredProducts,
                    res.data.result,
                  ],
                },
                () =>
                  this.props.getFilteredProducts(this.state.filteredProducts)
              );
            }
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { errors, filters, filteredProducts } = this.state;
    const { classes } = this.props;
    console.log("FP", this.state.filteredProducts);
    return (
      <div>
        <div className={classes.root}>
          <div className={classes.search}>
            <form onSubmit={this.search}>
              <InputBase
                placeholder="Type to search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={this.handleInputChange}
                inputProps={{ "aria-label": "Search" }}
              />
            </form>
          </div>

          <Filter setFilters={this.setFilters} filters={filters} />

          {errors
            ? errors.map((item, i) => {
                return (
                  <Grid item xs={12} key={i} className="error-container">
                    {item}
                  </Grid>
                );
              })
            : null}
        </div>
        <div className={classes.root}>
          <Chips
            filters={filters}
            handleDelete={this.handleDelete}
            cancelFilter={this.setFilters}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchRes: result => {
      dispatch(setSearchRes(result));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTheme(Search)));
