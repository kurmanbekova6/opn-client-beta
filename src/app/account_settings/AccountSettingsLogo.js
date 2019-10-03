import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import logo from "../../assets/img/icons/ms-icon-144x144.png";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraRounded from "@material-ui/icons/PhotoCameraRounded";

const AccountSettingsLogo = ({ logo_url = "", editLogo }) => {
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
      <Typography variant="overline" component="h2">
        Company logo
      </Typography>
      <Avatar
        alt="Remy Sharp"
        src={logo_url !== "" ? logo_url : logo}
        className={classes.avatar}
      />
      <input
        accept="image/x-png,image/gif,image/jpeg"
        className={classes.input}
        id="logo"
        type="file"
        onChange={editLogo}
        style={{ display: "none" }}
      />

      <IconButton
        className={classes.button}
        style={
          showEditButton ? { display: "inline-flex" } : { display: "none" }
        }
      >
        <label htmlFor="logo">
          <PhotoCameraRounded />
        </label>
      </IconButton>
    </div>
  );
};

export default AccountSettingsLogo;

const useStyles = makeStyles({
  avatar: {
    position: "absolute",
    top: 8,
    right: 16,
    width: 40,
    height: 40,
  },
  button: {
    position: "absolute",
    top: 8,
    right: 16,
    width: 40,
    height: 40,
    padding: 0,
    color: "white",
    backgroundColor: "rgba(33, 33, 33, 0.7)",
    "&:hover": {
      backgroundColor: "black",
    },
  },
});
