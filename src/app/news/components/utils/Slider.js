import React, { Component } from "react";

export default class Slider extends Component {
  state = {
    newArr: [],
    first: "",
  };

  selectImg = id => {
    let newArr = this.props.imgs.filter(it => {
      return id !== it;
    });
    this.setState({
      first: id,
      newArr,
    });
  };

  render() {
    const { imgs } = this.props;
    const { newArr, first } = this.state;
    if (newArr !== [] && first !== "") {
      return (
        <div className="news-slider__container">
          <div className="news-slider__first-item">
            <img src={require(`../../../../assets/img/slider/${first}.png`)} />
          </div>
          <div className="news-slider__container-other">
            {newArr.map((img, i) => (
              <div className="news-slider__other-item" key={i}>
                <img
                  src={require(`../../../../assets/img/slider/${img}.png`)}
                  onClick={() => this.selectImg(img)}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="news-slider__container">
          {imgs.map((img, i) => (
            <div className="news-slider__item" key={i}>
              <img
                id={img}
                src={require(`../../../../assets/img/slider/${img}.png`)}
                onClick={() => this.selectImg(img)}
              />
            </div>
          ))}
        </div>
      );
    }
  }
}
