import React from "react";
import "../css/pageHeadline.css";

const pageHeadline = props => {
  return <div className="page-heading">{props.value}</div>;
};

export default pageHeadline;
