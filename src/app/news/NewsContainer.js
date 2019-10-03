import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { selectItemNews } from "../../redux/actions/newsActions";
/* Custom ui */
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";
/* Components */
import NewsAside from "./components/aside/NewsAside";
import SingleNews from "./components/SingleNews";
import SimilarNews from "./components/similar/SimilarNews";

class NewsContainer extends Component {
  render() {
    return (
      <div className="news-single">
        <RenderBreadcrumbs value="News" />
        <Row>
          <Col md={this.props.loginStatus ? "8" : "12"}>
            <ColumnHeader value="News" />
            <SingleNews data={this.props.news} />
          </Col>
          <Col xs="12" md={this.props.loginStatus ? "4" : "12"}>
            {this.props.loginStatus ? (
              <React.Fragment>
                <ColumnHeader value="Newsletter" />
                <NewsAside selectItemNews={this.props.selectItemNews} />
              </React.Fragment>
            ) : (
              <React.Fragment />
            )}
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" className="similar-news">
            {this.props.loginStatus ? (
              <React.Fragment>
                <ColumnHeader value="Similar News" />
                <SimilarNews selectItemNews={this.props.selectItemNews} />
              </React.Fragment>
            ) : (
              <React.Fragment />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news,
    loginStatus: state.loginStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectItemNews: payload => {
      dispatch(selectItemNews(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);
