import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import CreateCategory from "./CreateCategory/CreateCategory";
import AccordionSection from "./components/AccordionSection";
import { Link } from "react-router-dom";
import Spinner from "../common/spinner/Spinner";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      access_token: "",
      loginStatus: "",
      refresh: "",
      categories: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.getId();
  };

  getId = () => {
    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200) {
          this.setState(
            state => ({
              clientId: res.data.result.clientId,
              access_token: this.props.token,
              loginStatus: this.props.loginStatus,
              refresh: this.props.refresh,
              loggedIn: true,
            }),
            this.getCategoryList
          );
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loggedIn: !this.state.loggedIn,
        });
      });
  };

  getCategoryList = () => {
    axios
      .post(`/category/list/all`, {
        clientId: this.state.clientId,
        access_token: this.state.access_token,
      })
      .then(res => {
        this.setState(
          {
            categories: res.data.result,
            isLoading: false,
          }
          //this.props.getCatNum(res.data.result.length)
        );
      })
      .catch(error => {
        if (error.response && error.response.data) {
          if (error.response.status === 401 || error.response.status === 400) {
            this.setState({
              loggedIn: !this.state.loggedIn,
              isLoading: false,
            });
          } else {
            console.log(error);
          }
        } else {
          console.log(error);
        }
      });
  };

  priceIntervalByCategory = id => {
    axios
      .post(`/category/price/interval`, {
        clientId: this.state.clientId,
        access_token: this.state.access_token,
        id,
      })
      .then(res => {})
      .catch(error => {
        if (error.response && error.response.data) {
          if (error.response.status === 401 || error.response.status === 400) {
            this.setState({
              loggedIn: !this.state.loggedIn,
            });
          } else {
            console.log(error);
          }
        } else {
          console.log(error);
        }
      });
  };

  render() {
    const { categories, loggedIn, isLoading } = this.state;
    const { loginStatus } = this.props;
    if (isLoading) {
      return (
        <div style={{ height: "30%" }}>
          <Spinner />
        </div>
      );
    }
    if (!loggedIn || !loginStatus) {
      return (
        <div className="categories__not-login">
          <p>You must log in to access product categories</p>
          <Link to="login" className="cat-login">
            Login
          </Link>
        </div>
      );
    } else {
      return (
        <div className="categories__container">
          {categories.map((cat, i) => (
            <AccordionSection cat={cat} key={i} />
          ))}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    refresh: state.refresh,
    loginStatus: state.loginStatus,
    loggedIn: state.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  null
)(Categories);
