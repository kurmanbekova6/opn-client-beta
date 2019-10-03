import React, { Component } from "react";
import { newsletterData } from "../../data";
import { Scrollbars } from "react-custom-scrollbars";
import NewsAsideItem from "./NewsAsideItem";

export default class NewsAside extends Component {
  render() {
    return (
      <Scrollbars
        className="chat-list-scrollbar"
        renderView={({ style }) => (
          <div style={{ ...style, paddingRight: "10px" }} />
        )}
        renderThumbVertical={({ style }) => (
          <div
            style={{
              ...style,
              backgroundColor: "#548cc4",
              borderRadius: "1px",
            }}
          />
        )}
      >
        {newsletterData.map(item => (
          <NewsAsideItem
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.date}
            text={item.text}
            data={item}
            selectItemNews={this.props.selectItemNews}
          />
        ))}
      </Scrollbars>
    );
  }
}
