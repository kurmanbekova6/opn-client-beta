import { Component } from "react";
import ReactDOM from "react-dom";

const portalRoot = document.getElementById("portal");

export default class Portal extends Component {
  constructor(props) {
    super(props);
    this.el;
  }

  el = document.createElement("div");

  componentDidMount = () => {
    portalRoot !== null ? portalRoot.appendChild(this.el) : console.log("null");
  };

  componentWillUnmount = () => {
    portalRoot !== null ? portalRoot.removeChild(this.el) : console.log("null");
  };

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}
