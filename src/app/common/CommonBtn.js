import React from "react";

const CommonBtn = ({ className, ...props }) => (
  <button id="CommonBtn" className={className} {...props} />
);

export default CommonBtn;
