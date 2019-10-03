import React from "react";
import { Link } from "react-router-dom";

const NewsAsideItem = props => {
  let trimText = props.text[0].substr(0, 300);
  return (
    <div id={props.id} className="news-aside-item__container newsWrapper">
      <div className="news-aside-item__head">
        <div className="news-aside-item__title">{props.title}</div>
        <div className="news-aside-item__date">{props.date}</div>
      </div>
      <div className="news-aside-item__text">{`${trimText}...`}</div>
      <Link
        to="/news"
        className="main-btn news-aside-item__button"
        onClick={() => props.selectItemNews(props.data)}
      >
        MORE
      </Link>
    </div>
  );
};

export default NewsAsideItem;
