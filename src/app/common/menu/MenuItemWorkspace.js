import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { workspaceMenuItemSetActive } from "../../../redux/actions/workspaceMenuActions";

class MenuItemWorkspace extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = id => {
    console.log(id);
    this.props.selectMenuItem(id);
  };

  render() {
    const { href, className, text, id } = this.props;

    return (
      <Link
        replace={true}
        to={`${href}`}
        onClick={() => this.handleClick(id)}
        className={className}
      >
        {text}
      </Link>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectMenuItem: id => {
      dispatch(workspaceMenuItemSetActive(id));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MenuItemWorkspace);
