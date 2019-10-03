import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { selectMenuItem } from "../../../redux/actions/menuActions";

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.selectMenuItem(this.props.id);
  };

  render() {
    const { href, className, text } = this.props;

    return (
      <Link
        replace={true}
        to={`${href}`}
        onClick={this.handleClick}
        className={className}
      >
        {text}
      </Link>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectMenuItem: (selected, id) => {
      dispatch(selectMenuItem(selected, id));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MenuItem);
