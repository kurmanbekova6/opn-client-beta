import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
// Material UI
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";

import { setSearchRes } from "../../../redux/actions/searchActions";
// Custom Ui
import { errorMessageParser } from "../../utils/errorMessageParser";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: "32px",
    flexWrap: "wrap",
    height: 48,
    width: "100% !important",
    maxWidth: "100%",
  },
  search: {
    height: "100%",
    position: "relative",
    borderRadius: 12,
    backgroundColor: "#f0eff1",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    border: "1px solid #dddddd",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  inputRoot: {
    color: "#aaaaaa !important",
    width: "100%",
  },
  inputInput: {
    padding: "14px",
    transition: theme.transitions.create("width"),
    width: "100%",
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
    fontSize: "24px",
    boxShadow: "none",
    height: 48,
    width: 48,
  },
}));

const Search = props => {
  // Init styles const
  const classes = useStyles();
  // Search state
  const [searchInputValue, setSearchValue] = useState("");
  // Errors state
  const [errors, setError] = useState();
  // Functions
  const handleInputChange = event => {
    setSearchValue(event.target.value);
    setError([]);
  };
  const search = event => {
    event.preventDefault();
    props.setSearchRes(searchInputValue);
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
        props.returnSearchResult(res.data.result.orders);
        setSearchValue("");
      })
      .catch(error => {
        if (error.response) {
          let err = errorMessageParser(error);
          setError(err);
        }
      });
  };
  return (
    <Grid item xs={12} md={10} className={classes.root}>
      <div className={classes.search}>
        <form onSubmit={search}>
          <InputBase
            placeholder="Type to search"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={handleInputChange}
            inputProps={{ "aria-label": "Search" }}
          />
        </form>
      </div>

      {errors
        ? errors.map((item, i) => {
            return (
              <Grid item xs={12} key={i} className="error-container">
                {item}
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

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
)(Search);
