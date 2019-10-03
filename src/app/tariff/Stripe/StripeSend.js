import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
/* Custom ui */
import RenderBreadcrumbs from "../../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../../ui_components/Titles/ColumnHeader";
import MenuProfile from "../../common/profileMenu/MenuProfile";
/* Data */
import { testClientId, prodClientId } from "./stripe.json";
import stripe from "../../../assets/img/stripe.png";

class StripeSend extends React.Component {
  state = {
    apiKey: "",
    redirectUri: "",
    clientId: "",
    access_token: "",
    companyId: "",
    imgUrl: "",
    loggedIn: true,
  };

  componentDidMount = () => {
    console.log(window.location.host);
    if (window.location.host === "localhost:3000") {
      this.setState({
        apiKey: testClientId,
        redirectUri: "https://localhost:3000/stripe-response",
      });
    } else if (window.location.host === "dev.opnplatform.com") {
      this.setState({
        apiKey: testClientId,
        redirectUri: "https://dev.opnplatform.com/stripe-response",
      });
    } else if (window.location.host === "opnplatform.com") {
      this.setState({
        apiKey: prodClientId,
        redirectUri: "",
      });
    }
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
              access_token: this.props.access_token.data.result.access_token
                .token,
              companyId: this.props.access_token.data.result.access_token._id,
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({
            loggedIn: !this.state.loggedIn,
          });
        });
    }
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
        .catch(error => console.log(error));
    }
  };

  render() {
    const { redirectUri, apiKey, access_token, companyId, imgUrl } = this.state;
    return (
      <div>
        <div className="stripe-connect">
          <Container className="company-profile">
            {!this.props.loginStatus ? (
              <Redirect to="/login" />
            ) : (
              <React.Fragment />
            )}
            <RenderBreadcrumbs value="Stripe" />
            <Row>
              <Col className="profileChart" xs="12" md="4">
                <MenuProfile header="Profile" />
              </Col>
              <Col className="profileChart" xs="12" md="8">
                <ColumnHeader value="Stripe financial page" />
                <Row>
                  <Col xs="12" md="5">
                    <img src={stripe} />
                  </Col>
                  <Col xs="12" md="7">
                    <div className="stripe-text">
                      <p>
                        OPN takes your data safety seriously and take all
                        measures to protect sensitive personal data. We do not
                        store any financial data of users such as the credit
                        card information on our website for security purposes.
                        All transactions you conduct with the help of our
                        service are processed by the Stripe service.
                      </p>
                      <div className="stripe-link">
                        <a
                          className="login-form-button"
                          href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${apiKey}&scope=read_write&redirect_uri=${redirectUri}`}
                        >
                          Go to stripe page
                        </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    loginStatus: state.loginStatus,
  };
};

export default connect(
  mapStateToProps,
  null
)(StripeSend);
