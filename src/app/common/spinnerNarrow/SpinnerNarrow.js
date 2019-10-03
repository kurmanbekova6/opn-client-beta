import React from "react";
import spinner from "../../../assets/img/spinnerNarrow.svg";

const SpinnerNarrow = props => {
  return (
    <div className="spinner-wrapper">
      <img
        src={spinner}
        alt="Spinner"
        style={props.size === "small" ? { width: "50px" } : { width: "100px" }}
      />
    </div>
  );
};

export default SpinnerNarrow;
