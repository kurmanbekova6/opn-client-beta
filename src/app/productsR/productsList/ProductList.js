import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
// Material ui
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
// Components
import ProductItem from "./ProductItem";
// Custom Ui
import { errorMessageParser } from "../../utils/errorMessageParser";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: "auto",
    position: "relative",
    left: "50%",
    color: "#3d7efd",
  },
  progressContainer: {
    width: "100%",
    marginTop: "67px",
  },
}));

const ProductList = props => {
  // Init styles const
  const classes = useStyles();
  // Products state
  const [products, setProductsList] = useState([]);
  const [prodCount, setProdCount] = useState(0);
  // Errors state
  const [errors, setError] = useState();
  //Pages state
  const [prodOnPage, setNewProdOnPage] = useState(4);
  // Redirect to login state
  const [toLogin, setToLoginState] = useState(false);

  // Fetch products
  useEffect(() => {
    getProductsFromApi();
  }, []);

  useEffect(() => {
    getProductsFromApi();
  });

  const getProductsFromApi = () => {
    axios
      .post(`/orders/get/1/all`, {
        access_token: props.token,
        clientId: props.clientId,
        count: prodOnPage,
      })
      .then(res => {
        setProductsList(res.data.result);
        setProdCount(res.data.result.length);
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

  const scrollGetMoreProducts = () => {
    setNewProdOnPage(prodOnPage + 4);
  };

  console.log(prodCount, prodOnPage);

  if (products.length !== 0 && props.searchResult.length === 0) {
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
          <Grid item xs={12} md={3}>
            <ProductItem key={i} product={product} />
          </Grid>
        ))}
        {prodOnPage === products.length ? (
          <div className={classes.progressContainer}>
            <CircularProgress
              variant="static"
              thickness={4}
              size={60}
              value={75}
              onClick={scrollGetMoreProducts}
              className={classes.progress}
            />
          </div>
        ) : null}
      </Grid>
    );
  } else if (props.searchResult.length !== 0) {
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
        {props.searchResult.map((product, i) => (
          <Grid item xs={12} md={3}>
            <ProductItem key={i} product={product} />
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
};

export default ProductList;
