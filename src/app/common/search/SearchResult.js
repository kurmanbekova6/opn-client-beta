import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Table from "./table/Table";
/* Custom ui */
import MenuProfile from "../profileMenu/MenuProfile";
import RenderBreadcrumbs from "../../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../../ui_components/Titles/ColumnHeader";

class SearchResult extends Component {
  render() {
    const { search } = this.props;
    return (
      <Container className="company-profile">
        <RenderBreadcrumbs value="Search" />
        <Row>
          <Col className="profileChart" xs="12" md="4">
            <MenuProfile header="Profile" />
          </Col>

          <Col className="profileChart" xs="12" md="8">
            <ColumnHeader value="Search results" />
            <div className="search-result">
              {search !== undefined && search.orders !== undefined ? (
                <Table orders={search.orders} />
              ) : (
                <div className="products-table-empty">
                  There are no search result
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
  };
};

export default connect(
  mapStateToProps,
  null
)(SearchResult);
