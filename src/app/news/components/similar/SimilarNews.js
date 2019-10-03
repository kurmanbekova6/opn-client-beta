import React, { Component } from "react";
import { similarNewsData } from "../../data";
import SimilarNewsItem from "./SimilarNewsItem";

const SimilarNews = props => {
  return (
    <div className="similar-news__container">
      {similarNewsData.map((it, i) => (
        <SimilarNewsItem
          key={it.id}
          id={it.id}
          title={it.title}
          date={it.date}
          text={it.text}
          imgs={it.imgs}
          data={it}
          selectItemNews={props.selectItemNews}
        />
      ))}
    </div>
  );
};

export default SimilarNews;
