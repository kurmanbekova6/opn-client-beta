import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { MaterialPrimaryButton } from "../../../ui_components/materialBased/materialBasedButtons";

const useStyles = makeStyles(theme => ({
  filters_container: {
    display: "flex",
    justifyContent: "space-between",
    margin: "24px 0",
  },
  filter_items: {
    display: "flex",
  },
  filter_item: {
    marginRight: 4,
    color: theme.palette.grey.A200,
    fontSize: "16px",
    letterSpacing: theme.palette.tonalOffset,
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(186, 206, 246, 0.4)",
      color: "#333333",
    },
    "&:active": {
      background: "#f0eff1",
      color: "#333333",
    },
  },
  filter_itemActive: {
    marginRight: 4,
    background: "rgba(186, 206, 246, 0.4)",
    color: "#333333",
    fontSize: "16px",
    letterSpacing: theme.palette.tonalOffset,
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      background: "rgba(186, 206, 246, 0.4)",
      color: "#333333",
    },
    "&:active": {
      background: "rgba(186, 206, 246, 0.4)",
      color: "#333333",
    },
  },
  filter_create: {
    background: "#3d7efd",
    borderRadius: "20px",
    padding: "10px 20px",
    color: "#ffffff",
    cursor: "pointer",
  },
  searchRes: {
    color: "#8d8d8d",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontWeight: 600,
    "& span": {
      color: "#333333",
    },
  },
}));

const Filters = props => {
  const classes = useStyles();
  const [allActive, setAllActive] = useState(true);
  const [ownActive, setOwnActive] = useState(false);

  const selectAll = () => {
    setAllActive(true);
    setOwnActive(false);
    props.returnAllProducts();
  };

  const selectOwn = () => {
    setAllActive(false);
    setOwnActive(true);
    ownFilters();
  };

  const ownFilters = () => {
    const req = {
      clientId: props.clientId,
      access_token: props.token !== "" ? props.token : "",
      count: 200,
      offset: 0,
    };
    const reqPurpose = {
      clientId: props.clientId,
      access_token: props.token !== "" ? props.token : "",
      count: 200,
      offset: 0,
      purpose: props.purpose,
    };
    axios
      .post(`/orders/get/1/my`, props.purpose ? req : reqPurpose)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          props.returnResult(res.data.result);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className={classes.filters_container}>
      <div className={classes.filter_items}>
        {props.search.length !== 0 ? (
          props.products.length === 0 ? (
            <p className={classes.searchRes}>
              no results with: <span>{props.search.toUpperCase()}</span>
            </p>
          ) : (
            <p className={classes.searchRes}>search results</p>
          )
        ) : (
          <React.Fragment>
            <div
              className={
                allActive ? classes.filter_itemActive : classes.filter_item
              }
              onClick={selectAll}
            >
              All {props.page}
            </div>
            <div
              className={
                ownActive ? classes.filter_itemActive : classes.filter_item
              }
              onClick={selectOwn}
            >
              My {props.page}
            </div>
          </React.Fragment>
        )}
      </div>
      <MaterialPrimaryButton
        onClick={props.toggleModal}
        label={props.buttonValue}
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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    search: state.search,
  };
};

export default connect(mapStateToProps)(Filters);
