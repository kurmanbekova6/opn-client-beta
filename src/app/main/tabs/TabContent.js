import React from "react";

import "./css/tab-content.scss";

function TabContent({ data }) {
  return (
    <div className="tab-item">
      <div className="tab-item_img">
        <img src={data.img} alt="" />
      </div>
      <h3 className="tab-item_title">{data.title}</h3>
      <p className="tab-item_desc">{data.desc}</p>
    </div>
  );
}

export default TabContent;
