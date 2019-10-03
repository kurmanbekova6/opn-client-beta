import React, { useEffect, useState } from "react";
import axios from "axios";
import { setOrdersByChosenCat } from "../../../redux/actions/categoryActions";
import { Link } from "react-router-dom";
// Material ui
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// Styles constant
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  categoryLink: {
    margin: "0px 4px",
    "&:hover": {
      textDecoration: "none",
    },
  },
  chip: {
    border: "1px solid #dedede",
    background: "transparent",
    padding: "0px 10px",
    letterSpacing: "0.5px",
    textTransform: "capitalize",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    borderRadius: 12,
  },
}));

const CategoriesBar = props => {
  // Init styles const
  const classes = useStyles();
  // Categories state
  const [categoriesList, setCategoriesList] = useState([]);
  // Errors state
  const [errors, setError] = useState();
  const [noOrdersInCategory, setMessage] = useState("");

  // Get list of all categories
  useEffect(() => {
    axios
      .post(`/category/list/all`, {
        clientId: props.clientId,
        access_token: props.token,
      })
      .then(res => {
        if (res.data.result === []) {
          setMessage("No orders in this category");
        } else {
          setCategoriesList(res.data.result);
        }
      })
      .catch(error => {
        if (error.response) {
          let err = errorMessageParser(error);
          setError(err);
        }
      });
  }, []);

  // Functions
  const selectCategory = id => {
    axios
      .post(`/orders/by_category`, {
        access_token: props.token,
        clientId: props.clientId,
        id: id,
        count: 250,
      })
      .then(res => {
        console.log(res);
        setOrdersByChosenCat(res.data.result);
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
      {categoriesList.map((category, i) => (
        <Link
          key={i}
          className={classes.categoryLink}
          to={{
            pathname: "/category",
            state: {
              id: category._id,
              categorys: category.children,
              name: category.name,
            },
          }}
        >
          <Chip
            size="medium"
            label={category.name}
            className={classes.chip}
            clickable
            color="default"
            onClick={() => selectCategory(category._id)}
          />
        </Link>
      ))}
      {errors
        ? errors.map((item, i) => {
            return (
              <Grid item xs={12} key={i} className="error-container">
                {item}
              </Grid>
            );
          })
        : null}
      {noOrdersInCategory !== "" ? (
        <Grid item xs={12} className="error-container">
          {noOrdersInCategory}
        </Grid>
      ) : null}
    </Grid>
  );
};

export default CategoriesBar;
