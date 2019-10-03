import React from "react";
import "./styles/pageTitle.scss";

const PageTitle = props => {
  return (
    <div className="page-title">
      <div className="page-title_title">{props.title}</div>
      <div className="page-title_description">{props.description}</div>
      <div className="page-title_line" />
    </div>
  );
};

export default PageTitle;
