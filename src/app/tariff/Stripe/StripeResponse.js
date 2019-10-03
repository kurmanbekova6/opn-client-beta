import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { MaterialPrimaryButton } from "../../ui_components/materialBased/materialBasedButtons";
class StripeResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      access_token: "",
      companyId: "",
      stripeResponse: "Please wait...",
      goToMain: false,
    };
  }

  componentDidMount = () => {
    this.getId();
    setTimeout(this.getStripeResponse, 500);
  };

  getId = () => {
    axios
      .get("/client/id")
      .then(res => {
        if (res) {
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
      });
  };

  getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  getStripeResponse = () => {
    axios
      .post("/stripe_connect", {
        clientId: this.state.clientId,
        access_token: this.state.access_token,
        code: this.getParameterByName("code"),
      })
      .then(res => {
        if (res.status === 200) {
          if (window.location.host === "opnplatform.com") {
            /* intercom event */
            window.Intercom("update", {
              app_id: "ulueqf5y",
              name: this.props.loggedIn.data.result.name, // Full name
              email: this.props.loggedIn.data.result.mail.id, // Email address
              "Button clicked": "Stripe connected",
            });
          }

          this.setState({
            stripeResponse: res.data.result,
            goToMain: true,
          });
        }
      })
      .catch(error => {
        console.log(error.response);
        if (error.response.data.error_message) {
          this.setState({
            stripeResponse: error.response.data.error_message,
          });
        }
      });
  };

  render() {
    const { stripeResponse, goToMain } = this.state;
    return (
      <div className="stripe-response">
        {stripeResponse !== "" ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: " 600",
              margin: " 60px auto 20px auto",
              color: "#333333",
            }}
          >
            {stripeResponse}
          </p>
        ) : (
          <React.Fragment />
        )}
        {goToMain ? (
          <Link to="/market">
            <MaterialPrimaryButton
              label="Return to workspace"
              type="button"
              style={{
                outline: "none",
                width: "auto",
                maxWidth: "320px",
                height: 40,
                margin: 0,
                padding: "0 1.7em",
                fontSize: 16,
                boxShadow: "none",
                borderRadius: 20,
                textTransform: "none",
                margin: "auto",
                display: "block",
              }}
            />
          </Link>
        ) : (
          <React.Fragment />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    loggedIn: state.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  null
)(StripeResponse);
