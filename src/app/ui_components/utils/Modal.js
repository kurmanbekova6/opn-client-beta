import React, { Component } from "react";
import Portal from "./Portal";
import "../css/uicomponents.css";

export default class Modal extends Component {
  render() {
    const { children, toggle, on } = this.props;
    return (
      <Portal>
        {on && (
          <div className="modal__wrapper">
            <div className="modal__card">
              <button className="close-btn" onClick={toggle}>
                X
              </button>
              <div>{children}</div>
            </div>
            <div onClick={toggle} />
          </div>
        )}
      </Portal>
    );
  }
}
