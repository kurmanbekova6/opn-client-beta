import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import MenuItem from "./MenuItem";
import "./css/menu.scss";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: null,
      loggedIn: null,
    };
  }
  componentDidMount = () => {
    this.getId();
    setTimeout(this.getCategoryList, 500);
  };

  getId = () => {
    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200) {
          this.setState({
            clientId: res.data.result.clientId,
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loggedIn: !this.state.loggedIn,
        });
      });
  };

  render() {
    const { pages } = this.props;
    return (
      <nav className="menu">
        {pages.map(value => (
          <MenuItem
            key={value.id}
            id={value.id}
            text={value.text}
            href={value.href}
            className={`${
              value.active ? "menu_item menu_item__active" : "menu_item"
            }`}
          />
        ))}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    pages: state.menu,
    access_token: state.token,
  };
};

export default connect(mapStateToProps)(Menu);
