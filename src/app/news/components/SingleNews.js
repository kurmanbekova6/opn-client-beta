import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import Slider from "./utils/Slider";
import Social from "./utils/Social";
import Hashtags from "./utils/Hashtags";

export default class SingleNews extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="single-news__container">
        <Container>
          <Row>
            <Col xs="12" md="5">
              <Slider imgs={data.imgs} />
            </Col>
            <Col xs="12" md="7">
              <div className="single-news__title">{data.title}</div>
              <div className="single-news__date">{data.date}</div>
              <div className="single-news__text">
                {data.text.map(it => (
                  <p>{it}</p>
                ))}
              </div>
              <Hashtags />
              <Social />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
