import React from "react";
// Material Ui
import Grid from "@material-ui/core/Grid";
// Components
import CategoryItem from "./CategoryItem";

const categorysList = props => {
  return (
    <Grid container>
      {props.subCategories.length !== 0 ? (
        props.subCategories.map((category, i) => (
          <Grid item xs={4} key={i}>
            <CategoryItem category={category} />
          </Grid>
        ))
      ) : (
        <div
          style={{ fontSize: "20px", fontWeight: "500", textAlign: "center" }}
        >
          No products in this category
        </div>
      )}
    </Grid>
  );
};

export default categorysList;
