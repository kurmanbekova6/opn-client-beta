import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { workspaceMenuSubItemSetActive } from "../../../redux/actions/workspaceMenuActions";

import "./sidebar.scss";

const SidebarItem = props => {
  const handleItemClick = (parent, child) => {
    props.setSubMenuActive(parent, child);
  };
  return (
    <Link
      id={props.id}
      to={props.href}
      className={
        props.active ? "sidebar_item sidebar_item__active" : "sidebar_item"
      }
      onClick={() => handleItemClick(props.parent, props.id)}
    >
      {props.active ? <div className="sidebar_item_dot" /> : null}
      {props.text}
    </Link>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setSubMenuActive: (parent, child) => {
      dispatch(workspaceMenuSubItemSetActive(parent, child));
    },
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SidebarItem);
