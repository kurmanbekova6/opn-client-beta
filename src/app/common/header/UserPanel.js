import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { setProfileActive } from "../../../redux/actions/profileMenuActions";
import { selectCabinet } from "../../../redux/actions/menuActions";
import { loginStatus, loginUser } from "../../../redux/actions/userActions";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import logo from "../../../assets/img/icons/ms-icon-144x144.png";

const options = ["Settings", "Log out"];

const UserPanel = props => {
  const [imgUrl, setImgUrl] = useState("");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event) {
    if (event.target.childNodes[0]) {
      switch (event.target.childNodes[0].data) {
        case "Settings":
          handleSettings();
          break;
        case "Log out":
          handleLogout();
          break;
      }
    }
    setAnchorEl(null);
  }

  useEffect(() => {
    getProfileInfo();
  });

  const handleSettings = () => {
    props.activeProfile();
    props.selectCabinet();
    props.history.push("/account_settings");
  };
  const handleLogout = () => {
    props.changeLoginStatus(false);
    props.clearLogin({});

    props.history.push("/");
  };

  const getProfileInfo = () => {
    axios
      .post("/company/info/all", {
        access_token: props.access_token,
        clientId: props.clientId,
      })
      .then(res => {
        if (res.status === 200) {
          setImgUrl(res.data.result.profile.logo_url);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className={classes.userPanelContainer}>
      <Avatar
        alt="Remy Sharp"
        src={imgUrl !== "" ? imgUrl : logo}
        className={classes.avatar}
      />
      <Link
        className={classes.workspaceLink}
        // push
        to={{
          pathname: "/",
          state: { viewState: "/" },
        }}
      >
        <Typography variant="subtitle2" component="h2">
          WORKSPACE
        </Typography>
      </Link>
      <div>
        <IconButton
          aria-label="More"
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ outline: "none", margin: 8 }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="dropdown-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            className: classes.dropDownMenu,
          }}
        >
          {options.map(option => (
            <MenuItem
              key={option}
              onClick={handleClose}
              style={{
                color: "#333",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: 0.5,
                minHeight: 32,
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    companyName: null,
    access_token: state.token,
    clientId: state.clientId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    activeProfile: () => {
      dispatch(setProfileActive());
    },
    selectCabinet: () => {
      dispatch(selectCabinet());
    },
    changeLoginStatus: payload => {
      dispatch(loginStatus(payload));
    },
    clearLogin: payload => {
      dispatch(loginUser(payload));
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserPanel)
);

const useStyles = makeStyles(theme => ({
  userPanelContainer: {
    display: "flex",
    height: 48,
    width: 196,
    alignItems: "center",
  },
  avatar: {
    margin: 10,
    width: 32,
    height: 32,
  },
  workspaceLink: {
    height: 20,
    width: 96,
    color: "#333333",
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  },
  dropDownMenu: {
    borderRadius: 12,
    backgroundColor: "#f0eff1",
    width: 132,
  },
}));
