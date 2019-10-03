import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
// Material UI
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// Custom Ui
import SubHeadline from "../ui_components/Titles/subHeadline";
import { errorMessageParser } from "../utils/errorMessageParser";
import { MaterialPrimaryButton } from "../ui_components/materialBased/materialBasedButtons";
import CustomTabs from "./tabs/CustomTabs";
import forwardArrow from "../../assets/img/svg/forward-arrow.svg";

import "./css/main.scss";

const useStyles = makeStyles(theme => ({
  categories: {
    position: "relative",
    width: "100%",
    marginTop: "1em",
    padding: "0.85em 0",
    backgroundColor: "#3d7efd",
    color: "#fff",
    fontSize: "14px",
    letterSpacing: "1px",
    borderRadius: "12px",
    boxShadow: "none",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#578fff",
      textDecoration: "none",
    },
    "&:focus": {
      outline: "none",
      color: "#fff",
      backgroundColor: "#578fff",
      textDecoration: "none",
    },
    "&:active": {
      outline: "none",
      color: "#fff",
      backgroundColor: "#194bb0",
      textDecoration: "none",
    },
  },
  categoriesArrow: {
    position: "absolute",
    right: "18px",
    opacity: "0.7",
  },
  categoryLink: {
    "&:hover": {
      textDecoration: "none",
    },
    "&:focus": {
      outline: "none",
      textDecoration: "none",
    },
    "&:active": {
      outline: "none",
      textDecoration: "none",
    },
  },
}));

const Main = props => {
  const classes = useStyles();
  // Categories state
  const [categories, setCatList] = useState([]);
  // Errors state
  const [errors, setError] = useState();
  // Redirect to login state
  const [toLogin, setToLoginState] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCategories();
  }, []);

  const getCategories = () => {
    axios
      .post(`/category/list/all`, {
        access_token: props.token,
        clientId: props.clientId,
      })
      .then(res => {
        setCatArrToSixElements(res.data.result);
      })
      .catch(error => {
        if (error.response) {
          let err = errorMessageParser(error);
          setError(err);
        }
        if (error.response && error.response.status === 401) {
          setToLoginState(true);
        }
      });
  };

  const setCatArrToSixElements = array => {
    let cat = [];
    for (let i = 0; i < 6; i++) {
      cat.push(array[i]);
    }
    setCatList(cat);
  };

  return (
    <main className="main">
      <MetaTags>
        <title>Open Packaging Network</title>
        <meta
          name="description"
          content="Join the Next Generation AI Driven Peer-to-Peer online marketplace for packaging  materials. It's time to re-package the global packaging industry. We drive out packaging disruptions and put in place robust, fair and transparent procurement processes. Enjoy our safe deals and price transparency. Scale fast, worldwide. Start working with instant verified suppliers, get the best price in the market, process related financial transactions securely and instantly, select logistic partners with best delivery times and costs, and reduce environmental pollution and product waste with eco-friendly, biodegradable  solutions."
        />
      </MetaTags>

      <section className="main-about">
        <h1>Open Packaging Network</h1>
        <p>
          Join the Next Generation AI Driven Peer-to-Peer packaging raw
          materials digital ecosystem. It's time to re-package the global
          packaging industry. We drive packaging disruption and put in place
          robust, fair and transparent procurement process.
        </p>
        <p>
          Enjoy our safe deals and price transparency. Scale fast worldwide.
          Start working with instant verified suppliers, get the best packaging
          price in the market, process all packaging-related financial
          transactions securely and instantly, select logistic partners with
          best delivery time and cost, reduce environmental pollution and
          product waste with eco-friendly, biodegradable packing solutions.
        </p>
        {props.isLoggedIn ? null : (
          <Link to="/login" className="main_link">
            <MaterialPrimaryButton
              label="JOIN FOR FREE"
              type="button"
              style={{
                outline: "none",
                maxWidth: 320,
                width: "100%",
                height: 48,
                margin: 0,
                fontSize: 14,
                boxShadow: "none",
                borderRadius: 12,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            />
          </Link>
        )}
      </section>

      <section className="main-work">
        <h2>Solutions</h2>
        <CustomTabs />
      </section>

      <section className="main-categories">
        <h2>Wholesale packaging materials</h2>
        <p className="main-categories_description">
          Choose among 1000+ products and deals. Select an ideal match by price,
          quantity, and destination. If you are involved in the packaging
          industry, this is the right place for you.
        </p>
        <ul className="main-categories-list">
          {categories.map((item, id) => (
            <li className="main-categories_item" key={id}>
              <Link
                className={classes.categoryLink}
                to={{
                  pathname: "/categories",
                  state: {
                    id: item._id,
                    categorys: item.children,
                    name: item.name,
                  },
                }}
              >
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/categories" className="main_link">
          <Button variant="contained" className={classes.categories}>
            CHECK ALL MATERIALS
            <img
              src={forwardArrow}
              className={classes.categoriesArrow}
              alt="forward arrow"
            />
          </Button>
        </Link>
      </section>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    searchResult: state.search,
    isLoggedIn: state.loginStatus,
  };
};

export default connect(mapStateToProps)(Main);
