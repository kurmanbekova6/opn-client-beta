import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/styles";

import "./css/accountSettings.scss";

const AccountSettingsTabSelector = ({ selected, setSelectedTab }) => {
  const classes = useStyles();
  return (
    <div className="tab-selector__container">
      <ButtonGroup fullWidth>
        <Button
          disabled={selected === "company"}
          className={selected === "company" ? classes.selected : ""}
          onClick={() => {
            setSelectedTab("company");
          }}
        >
          company
        </Button>
        <Button
          disabled={selected === "personal"}
          className={selected === "personal" ? classes.selected : ""}
          onClick={() => {
            setSelectedTab("personal");
          }}
        >
          personal
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default AccountSettingsTabSelector;

const useStyles = makeStyles({
  selected: {
    backgroundColor: "rgba(186, 206, 246, 0.4)",
    "& .MuiButton-label": {
      color: "#333333",
    },
  },
});
