import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import MenuItemWorkspace from "./MenuItemWorkspace";
import "./css/menu.scss";

class MenuWorkspace extends React.Component {
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
      <nav className="workspace-menu">
        {pages.map(value =>
          value.id === 1 ? (
            <p
              key={value.id}
              className={"workspace-menu_item workspace-menu_item__disabled"}
            >
              {value.text}
            </p>
          ) : (
            <MenuItemWorkspace
              key={value.id}
              id={value.id}
              text={value.text}
              href={value.href}
              className={`${
                value.active
                  ? "workspace-menu_item workspace-menu_item__active"
                  : "workspace-menu_item"
              }`}
            />
          )
        )}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    pages: state.workspaceMenu,
    access_token: state.token,
  };
};

export default connect(mapStateToProps)(MenuWorkspace);
