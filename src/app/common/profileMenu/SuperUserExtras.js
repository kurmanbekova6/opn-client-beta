import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { errorMessageParser } from "../../utils/errorMessageParser";

class SuperUserExtras extends Component {
  state = {
    email: "",
    message: "",
    errors: [],
  };
  handleInputChange = e => {
    this.setState({ email: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ message: "", errors: [] });
    const { clientId, access_token } = this.props;

    axios
      .delete("/dev/wipe/user/fully", {
        data: {
          clientId,
          access_token,
          email: this.state.email,
        },
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ message: res.data.result });
        } else {
          console.log(res);
        }
      })
      .catch(error => {
        this.setState({ errors: errorMessageParser(error) });
      });
  };
  render() {
    return (
      <form className="su-form" onSubmit={this.handleSubmit}>
        Super User Extras:
        <label className="su-label">
          Wipe user by email:
          <input
            type="text"
            value={this.state.email}
            placeholder="user@domain.com"
            onChange={this.handleInputChange}
            className="su-input"
            style={this.state.email ? { fontWeight: "600" } : null}
          />
        </label>
        <button type="submit" className="su-btn profile-menu-item">
          Wipe
        </button>
        {this.state.message ? <div>{this.state.message}</div> : null}
        {this.state.errors
          ? this.state.errors.map((item, i) => {
              return (
                <div key={i} style={{ color: "red" }}>
                  {item}
                </div>
              );
            })
          : null}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientId: state.clientId,
    access_token: state.token,
  };
};
export default connect(mapStateToProps)(SuperUserExtras);
