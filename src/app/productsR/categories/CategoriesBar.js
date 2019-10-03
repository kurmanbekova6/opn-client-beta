import React, { useEffect, useState } from "react";
import axios from "axios";
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
  chip: {
    margin: "10px auto",
    border: "1px solid #dedede",
    background: "transparent",
    padding: "0px 10px",
    "text-transform": "capitalize",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const CategoriesBar = props => {
  // Init styles const
  const classes = useStyles();
  // Categories state
  const [categoriesList, setCategoriesList] = useState([]);

  // Get list of all categories
  useEffect(() => {
    axios
      .post(`/category/list/all`, {
        clientId: props.clientId,
        access_token: props.token,
      })
      .then(res => {
        setCategoriesList(res.data.result);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Grid item xs={12} md={10} className={classes.root}>
      {categoriesList.map((categorie, i) => (
        <Chip
          key={i}
          size="medium"
          label={categorie.name}
          className={classes.chip}
          clickable
          color="default"
        />
      ))}
    </Grid>
  );
};

export default CategoriesBar;
