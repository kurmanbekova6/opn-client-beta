import React from "react";
import { connect } from "react-redux";
// Material UI
import Grid from "@material-ui/core/Grid";
// Components
import SidebarItem from "./SidebarItem";

import "./sidebar.scss";

const Sidebar = props => {
  const { workspaceMenu } = props;
  return (
    <Grid item xs={12} md={2} className="sidebar_container">
      {workspaceMenu.map(item => {
        if (item.active) {
          return item.sub.map(link => (
            <SidebarItem
              key={link.id}
              id={link.id}
              parent={item.id}
              href={link.href}
              active={link.active}
              text={link.text}
            />
          ));
        }
      })}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    workspaceMenu: state.workspaceMenu,
  };
};

export default connect(mapStateToProps)(Sidebar);
