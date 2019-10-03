import React from "react";
import { selectItemNews } from "../../../../redux/actions/newsActions";

const SimilarNewsItem = props => {
  let src = props.imgs[0];
  let trimText = props.text[0].substr(0, 70);

  const handleClick = () => {
    props.selectItemNews(props.data);
    window.scrollTo(0, 0);
  };

  return (
    <div className="similar-item__container newsWrapper">
      <div className="similar-item__img">
        <img src={require(`../../../../assets/img/slider/${src}.png`)} />
      </div>
      <div className="similar-item__right">
        <div className="similar-item__title">{props.title}</div>
        <div className="similar-item__date">{props.date}</div>
        <div className="similar-item__text">{`${trimText}...`}</div>
        <div className="main-btn news-aside-item__button" onClick={handleClick}>
          MORE
        </div>
      </div>
    </div>
  );
};

export default SimilarNewsItem;
