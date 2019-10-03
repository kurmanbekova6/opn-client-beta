import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import axios from "axios";
/* Custom ui */
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";
import Spinner from "../common/spinner/Spinner";
/* Components */
import MenuProfile from "../common/profileMenu/MenuProfile";
import FinancialForm from "./components/FinancialForm";
import HistoryTransactions from "./containers/HistoryTransactions";

class FinancialInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      clientId: "",
      imgUrl: "",
      loggedIn: true,
      isLoading: true,
      transactionHistory: [],
      error: null,
    };
  }

  componentDidMount = () => {
    this.getId();
    setTimeout(this.getProfileInfo, 500);
  };

  getId = () => {
    if (this.props.access_token.length < 0) {
      this.setState({ loggedIn: !this.state.loggedIn });
    } else if (!this.props.loginStatus) {
      this.setState({ loggedIn: !this.state.loggedIn });
    } else {
      axios
        .get("/client/id")
        .then(res => {
          if (res.status === 200) {
            this.setState({
              clientId: res.data.result.clientId,
              access_token: this.props.token,
              loggedIn: this.props.loginStatus,
            });
          }
        })
        .then(() => {
          this.getTransactionHistory();
        })
        .catch(error => {
          console.log(error);
          this.setState({
            loggedIn: !this.state.loggedIn,
          });
        });
    }
  };
  /* Refresh access token */
  refreshToken = () => {
    axios
      .post(`/user/refresh`, {
        clientId: this.state.clientId,
        refresh_token: this.props.refresh,
      })
      .then(res => {
        this.props.changeToken(res.data.result.token);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getProfileInfo = () => {
    if (this.state.access_token === "" || this.state.clientId === "") {
      this.setState({ loggedIn: !this.state.loggedIn });
    } else {
      axios
        .post("/company/info/all", {
          access_token: this.state.access_token,
          clientId: this.state.clientId,
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              imgUrl: res.data.result.profile.logo_url,
            });
          }
        })
        .catch(error => {
          switch (error.response.status) {
            case 401:
              this.refreshToken();
              break;
            case 400:
              this.refreshToken();
              break;
            default:
              console.log(error);
          }
        });
    }
  };

  getTransactionHistory = () => {
    axios
      .post("/transactions/1/all", {
        access_token: this.state.access_token,
        clientId: this.state.clientId,
        count: 250,
        offset: 0,
        status: "",
        type: "",
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            transactionHistory: res.data.result,
            isLoading: false,
          });
        }
      })
      .catch(error => {
        switch (error.response.status) {
          case 401:
            this.refreshToken();
            break;
          case 400:
            this.refreshToken();
            break;
          default:
            console.log(err);
        }
      });
  };
  renderError = () => {
    return <div className="financial-form__error">{this.state.error}</div>;
  };
  render() {
    const { loggedIn } = this.state;
    return (
      <Container className="company-profile">
        {!loggedIn ? <Redirect to="login" /> : <React.Fragment />}
        <RenderBreadcrumbs value="Profile" />
        <Row>
          <Col className="profileChart" xs="12" md="4">
            <MenuProfile header="Profile" />
          </Col>
          <Col className="fin-info profileChart" xs="12" md="4">
            <ColumnHeader value="FINANCIAL INFO" />
            <FinancialForm />
          </Col>
          <Col className="fin-info profileChart" xs="12" md="4">
            <ColumnHeader
              value="HISTORY TRANSACTIONS"
              // comments="(OPN Tokens)"
            />
            {this.state.isLoading ? (
              <Spinner />
            ) : this.state.error ? (
              this.renderError()
            ) : (
              <HistoryTransactions data={this.state.transactionHistory} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    loginStatus: state.loginStatus,
    token: state.token,
    refresh:
      state.loggedIn.data !== undefined
        ? state.loggedIn.data.result.refresh_token.token
        : "",
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeToken: token => {
      dispatch(changeToken(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinancialInfo);
