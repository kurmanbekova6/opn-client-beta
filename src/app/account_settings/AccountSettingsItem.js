import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";

const AccountSettingsItem = ({ name, label, value, editField }) => {
  const [showEditButton, setShowEditButton] = useState(false);
  const classes = useStyles();

  return (
    <div
      className="account-settings__item"
      onMouseEnter={() => {
        setShowEditButton(true);
      }}
      onMouseLeave={() => {
        setShowEditButton(false);
      }}
    >
      <Typography
        variant="overline"
        component="h2"
        className={classes.itemLabel}
      >
        {label}
      </Typography>
      <Typography variant="subtitle1" component="h2">
        {value.length > 52 ? value.slice(0, 50) + "..." : value}
      </Typography>
      <IconButton
        className={classes.button}
        onClick={() => {
          editField(name, label, value);
        }}
        style={
          showEditButton ? { display: "inline-flex" } : { display: "none" }
        }
      >
        <Edit />
      </IconButton>
    </div>
  );
};

export default AccountSettingsItem;

const useStyles = makeStyles(theme => ({
  button: {
    position: "absolute",
    top: 8,
    right: 16,
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: 4,
    "&:hover": {
      backgroundColor: "rgba(186, 206, 246, 0.3)",
    },
  },
  itemLabel: {
    width: 208,
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
}));
