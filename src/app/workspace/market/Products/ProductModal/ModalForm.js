import React from "react";
import { withRouter } from "react-router";
import { Field } from "redux-form";
// Material Ui
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
//  Constants
import countries from "../../../../../consts/countries";
import deliveryMethods from "../../../../../consts/deliveryMethods";
import units from "../../../../../consts/units";
// Custom UI
import { MaterialOutlinedInput } from "../../../../ui_components/materialBased/materialBasedInputs";
import { MaterialOutlinedSelect } from "../../../../ui_components/materialBased/materialBasedSelectInputs";
import { MaterialOutlinedSelectCategory } from "../../../../ui_components/materialBased/materialBasedSelectCategory";
import { MaterialCheckbox } from "../../../../ui_components/materialBased/materialBasedCheckbox";

import { normalizePrice } from "../../../../utils/normalizeFields";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "320px",
  },
  inputHolder: {
    //marginBottom: "24px",
    //maxHeight: "48px",
    display: "flex",
    alignItems: "center",
    //marginTop: "10px",
    justifyContent: "space-between",
    maxWidth: "320px",
    marginRight: "0px !important",
  },
  textareaHolder: {
    //marginBottom: "24px",
    maxHeight: "144px",
    maxWidth: "320px",
  },
  halfLeft: {
    width: 144,
    marginRight: 6,
  },
  halfRight: {
    width: 140,
    marginLeft: 6,
  },
  per: {
    color: "#8d8d8d",
    fontSize: "12px",
    letterSpacing: "0.5px",
    marginBottom: 11,
  },
  check: {
    color: "#8d8d8d",
    fontSize: "12px !important",
    letterSpacing: "0.5px !important",
    marginBottom: "0px !important",
  },
}));

const ModalFrom = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.inputHolder}>
        <Field
          name="category"
          label="Category"
          component={MaterialOutlinedSelectCategory}
          type="text"
          placeholder="Category"
          menuItems={props.categories}
        />
      </div>
      <div className={classes.inputHolder}>
        <Field
          name="productName"
          label="Product name"
          component={MaterialOutlinedInput}
          type="text"
        />
      </div>
      <div className={classes.inputHolder}>
        <Field
          name="location"
          label="Location"
          component={MaterialOutlinedSelect}
          type="text"
          placeholder="Location"
          menuItems={countries}
        />
      </div>
      <div className={classes.textareaHolder}>
        <Field
          name="parameters"
          label="Parameters"
          component={MaterialOutlinedInput}
          multiline
          rows="4"
          type="text"
          placeholder="Parameters"
        />
      </div>
      <div className={classes.inputHolder}>
        <Field
          name="deliveryVariants"
          label="Delivery variants"
          component={MaterialOutlinedSelect}
          type="text"
          placeholder="Delivery variants"
          menuItems={deliveryMethods}
        />
      </div>
      <div className={classes.inputHolder}>
        <Field
          name="deliveryTerms"
          label="Delivery terms (days)"
          component={MaterialOutlinedInput}
          type="text"
        />
      </div>
      <div className={classes.inputHolder}>
        <div className={classes.halfLeft}>
          <Field
            name="price"
            label="Price"
            component={MaterialOutlinedInput}
            type="text"
            adornment="€"
            normalize={normalizePrice}
          />
        </div>
        <div className={classes.per}>per</div>
        <div className={classes.halfRight}>
          <Field
            name="unit"
            label="Unit"
            component={MaterialOutlinedSelect}
            type="text"
            placeholder="Unit"
            menuItems={units}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(ModalFrom);
