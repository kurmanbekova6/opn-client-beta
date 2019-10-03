import React from "react";
import { Link } from "react-router-dom";
// Material UI
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { MaterialPrimaryButton } from "../../../ui_components/materialBased/materialBasedButtons";
import ShoppingImg from "../../../../assets/img/svg/Shopping.svg";
import "./upgrade-tariff.scss";

const upgradeTariff = props => {
  return (
    <Modal open={props.open} onClose={props.toggleModal}>
      <div className="upgrade-tariff">
        <div className="upgrade-tariff_close">
          <IconButton size="small">
            <CloseIcon onClick={props.toggleModal} />
          </IconButton>
        </div>
        <img src={ShoppingImg} alt="Shopping" />
        <p className="upgrade-tariff_title">{props.title}</p>
        <p className="upgrade-tariff_info">Upgrade your plan</p>
        <Link to="/my-account?tab=pricing">
          <MaterialPrimaryButton
            label="Upgrade now"
            type="button"
            style={{
              outline: "none",
              width: "100%",
              height: 48,
              margin: "0 0 1em 0",
              padding: 0,
              fontSize: 14,
              letterSpacing: 1,
              boxShadow: "none",
              borderRadius: 12,
              textTransform: "uppercase",
            }}
          />
        </Link>
      </div>
    </Modal>
  );
};

export default upgradeTariff;
