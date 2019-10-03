import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { changeToken, loginStatus } from "../../redux/actions/userActions";
import { MaterialBasedLocationAutocomplete } from "../ui_components/materialBased/materialBasedLocationAutocomplete";

// import Sidebar from "./sidebar/Sidebar";
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import { saveProducts } from "../../redux/actions/productActions";

class Magic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
    };
  }

  componentDidMount() {
    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          this.setState({ clientId: res.data.result.clientId });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  changeLoginStatus = status => {
    this.props.loginStatus(status);
  };
  changeToken = token => {
    this.props.changeToken(token);
  };
  /* Refresh access token */
  refreshToken = () => {
    axios
      .post(`/user/refresh`, {
        clientId: this.state.clientId,
        refresh_token: this.props.refresh,
      })
      .then(res => {
        if (res.status === 200) {
          this.props.changeToken(res.data.result.token);
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 400) {
          this.props.loginStatus(false);
        }
      });
  };

  render() {
    return (
      <Fragment>
        {/*<RenderBreadcrumbs value="Magic" />*/}
        {/*<MaterialBasedLocationAutocomplete />*/}
        <RenderBreadcrumbs value="Magic" />
        <button
          className="form-button"
          type="submit"
          onClick={() => {
            this.changeLoginStatus(false);
          }}
        >
          loginStatus -> False
        </button>
        <button
          className="form-button"
          type="submit"
          onClick={() => {
            this.changeLoginStatus(true);
          }}
        >
          loginStatus -> True
        </button>
        <button
          className="form-button"
          type="submit"
          onClick={() => {
            this.changeToken("invalid");
          }}
        >
          changeToken -> "invalid"
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    productList: state.product.productList,
    loginStatus: state.loginStatus,
    token: state.token,
    refresh: state.refresh,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeToken: token => {
      dispatch(changeToken(token));
    },
    loginStatus: status => {
      dispatch(loginStatus(status));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Magic);
