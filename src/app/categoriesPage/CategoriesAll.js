import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { setProducts } from "../../redux/actions/productActions";
// Material ui
import Grid from "@material-ui/core/Grid";
// Components
import Search from "../ui_components/search/Search";
// Custom Ui
import PageHeadline from "../ui_components/Titles/pageHeadline";
import SubHeadline from "../ui_components/Titles/subHeadline";
import "./css/categoriesAll.scss";

class CategoriesAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .post("/category/list/all", {
        access_token: this.props.token,
        clientId: this.props.clientId,
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.result);
          this.setState(
            {
              categories: res.data.result,
            },
            this.setCategoriesToArrays
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="categories-all">
        <Grid container justify="center">
          <SubHeadline value="All categories" />
          <div className="categories-all_container">
            {categories.length !== 0 ? (
              <React.Fragment>
                <div className="categories-all_item">
                  <div>
                    <div className="categories-all_item-name">
                      {categories[0] ? categories[0].name : null}
                    </div>

                    {categories[0] && categories[0].children.length !== 0
                      ? categories[0].children.map((child, i) => (
                          <React.Fragment key={i}>
                            <Link
                              to={`/category/${child._id}`}
                              onClick={() =>
                                this.props.setCurrentProduct(child)
                              }
                            >
                              <div className="categories-all_item-link">
                                {child.name}
                              </div>
                            </Link>

                            {child.children.length !== 0
                              ? child.children.map((item, j) => (
                                  <Link
                                    to={`/category/${item._id}`}
                                    onClick={() =>
                                      this.props.setCurrentProduct(item)
                                    }
                                    key={j}
                                  >
                                    <div className="categories-all_item-link">
                                      {item.name}
                                    </div>
                                  </Link>
                                ))
                              : null}
                          </React.Fragment>
                        ))
                      : null}
                  </div>
                  <div>
                    <div className="categories-all_item-name">
                      {categories[4].name ? categories[4].name : null}
                    </div>
                    {categories[4] && categories[4].children.length !== 0
                      ? categories[4].children.map((child, i) => (
                          <React.Fragment key={i}>
                            <Link
                              to={`/category/${child._id}`}
                              onClick={() =>
                                this.props.setCurrentProduct(child)
                              }
                            >
                              <div className="categories-all_item-link">
                                {child.name}
                              </div>
                            </Link>
                          </React.Fragment>
                        ))
                      : null}
                  </div>
                </div>
                <div className="categories-all_item">
                  <div>
                    <div className="categories-all_item-name">
                      {categories[1] ? categories[1].name : null}
                    </div>
                    {categories[1] && categories[1].children.length !== 0
                      ? categories[1].children.map((child, i) => (
                          <React.Fragment key={i}>
                            <Link
                              to={`/category/${child._id}`}
                              onClick={() =>
                                this.props.setCurrentProduct(child)
                              }
                            >
                              <div className="categories-all_item-link">
                                {child.name}
                              </div>
                            </Link>

                            {child.children.length !== 0
                              ? child.children.map((item, j) => (
                                  <Link
                                    to={`/category/${item._id}`}
                                    onClick={() =>
                                      this.props.setCurrentProduct(item)
                                    }
                                    key={j}
                                  >
                                    <div className="categories-all_item-link">
                                      {item.name}
                                    </div>
                                  </Link>
                                ))
                              : null}
                          </React.Fragment>
                        ))
                      : null}
                  </div>
                </div>
                <div className="categories-all_item">
                  <div>
                    <div className="categories-all_item-name">
                      {categories[2] ? categories[2].name : null}
                    </div>
                    {categories[2] && categories[2].children.length !== 0
                      ? categories[2].children.map((child, i) => (
                          <React.Fragment key={i}>
                            <Link
                              to={`/category/${child._id}`}
                              onClick={() =>
                                this.props.setCurrentProduct(child)
                              }
                            >
                              <div className="categories-all_item-link">
                                {child.name}
                              </div>
                            </Link>

                            {child.children.length !== 0
                              ? child.children.map((item, j) => (
                                  <Link
                                    to={`/category/${item._id}`}
                                    onClick={() =>
                                      this.props.setCurrentProduct(item)
                                    }
                                    key={j}
                                  >
                                    <div className="categories-all_item-link">
                                      {item.name}
                                    </div>
                                  </Link>
                                ))
                              : null}
                          </React.Fragment>
                        ))
                      : null}
                  </div>
                  <div>
                    <div className="categories-all_item-name">
                      {categories[3] ? categories[3].name : null}
                    </div>
                    {categories[3] && categories[3].children.length !== 0
                      ? categories[3].children.map((child, i) => (
                          <React.Fragment key={i}>
                            <Link
                              to={`/category/${child._id}`}
                              onClick={() =>
                                this.props.setCurrentProduct(child)
                              }
                            >
                              <div className="categories-all_item-link">
                                {child.name}
                              </div>
                            </Link>

                            {child.children.length !== 0
                              ? child.children.map((item, j) => (
                                  <Link
                                    to={`/category/${item._id}`}
                                    onClick={() =>
                                      this.props.setCurrentProduct(item)
                                    }
                                    key={j}
                                  >
                                    <div className="categories-all_item-link">
                                      {item.name}
                                    </div>
                                  </Link>
                                ))
                              : null}
                          </React.Fragment>
                        ))
                      : null}
                  </div>
                </div>
                <div className="categories-all_item">
                  <div>
                    <div className="categories-all_item-name">
                      {categories[5] ? categories[5].name : null}
                    </div>

                    {categories[5] && categories[5].children.length !== 0
                      ? categories[5].children.map((child, i) => (
                          <React.Fragment key={i}>
                            <Link
                              to={`/category/${child._id}`}
                              onClick={() =>
                                this.props.setCurrentProduct(child)
                              }
                            >
                              <div className="categories-all_item-link">
                                {child.name}
                              </div>
                            </Link>

                            {child.children.length !== 0
                              ? child.children.map((item, j) => (
                                  <Link
                                    to={`/category/${item._id}`}
                                    onClick={() =>
                                      this.props.setCurrentProduct(item)
                                    }
                                    key={j}
                                  >
                                    <div className="categories-all_item-link">
                                      {item.name}
                                    </div>
                                  </Link>
                                ))
                              : null}
                          </React.Fragment>
                        ))
                      : null}
                  </div>
                  <div>
                    <div className="categories-all_item-name">
                      {categories[6] ? categories[6].name : null}
                    </div>
                    {categories[6] && categories[6].children.length !== 0
                      ? categories[6].children.map((child, i) => (
                          <React.Fragment key={i}>
                            <Link
                              to={`/category/${child._id}`}
                              onClick={() =>
                                this.props.setCurrentProduct(child)
                              }
                            >
                              <div className="categories-all_item-link">
                                {child.name}
                              </div>
                            </Link>

                            {child.children.length !== 0
                              ? child.children.map((item, j) => (
                                  <Link
                                    to={`/category/${item._id}`}
                                    onClick={() =>
                                      this.props.setCurrentProduct(item)
                                    }
                                    key={j}
                                  >
                                    <div className="categories-all_item-link">
                                      {item.name}
                                    </div>
                                  </Link>
                                ))
                              : null}
                          </React.Fragment>
                        ))
                      : null}
                  </div>
                  <div>
                    <div className="categories-all_item-name">
                      {categories[7] ? categories[7].name : null}
                    </div>
                    {categories[7] && categories[7].children.length !== 0
                      ? categories[7].children.map((child, i) => (
                          <React.Fragment key={i}>
                            <Link
                              to={`/category/${child._id}`}
                              onClick={() =>
                                this.props.setCurrentProduct(child)
                              }
                            >
                              <div className="categories-all_item-link">
                                {child.name}
                              </div>
                            </Link>

                            {child.children.length !== 0
                              ? child.children.map((item, j) => (
                                  <Link
                                    to={`/category/${item._id}`}
                                    onClick={() =>
                                      this.props.setCurrentProduct(item)
                                    }
                                    key={j}
                                  >
                                    <div className="categories-all_item-link">
                                      {item.name}
                                    </div>
                                  </Link>
                                ))
                              : null}
                          </React.Fragment>
                        ))
                      : null}
                  </div>
                </div>
              </React.Fragment>
            ) : null}
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentProduct: result => {
      dispatch(setProducts(result));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesAll);
