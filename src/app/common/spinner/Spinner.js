import React from "react";
import spinner from "../../../assets/img/Spinner-1s-200px.svg";

const Spinner = props => {
  return (
    <div className="spinner-wrapper">
      <img
        src={spinner}
        alt="Spinner"
        style={props.size === "small" ? { width: "100px" } : { width: "200px" }}
      />
    </div>
  );
};

export default Spinner;
