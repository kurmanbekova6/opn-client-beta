import React, { Component } from "react";
import axios from "axios";

import "./email-confirmed.scss";

class EmailConfirmed extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const token = window.location.pathname.split("/").pop();

    axios
      .get(`/user/confirm_email/${token}`)
      .then(res => {
        if (res.status === 200) {
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <main className="email-confirmed">
        <h1>Thank You!</h1>
        <p>Email confirmed!</p>
      </main>
    );
  }
}

export default EmailConfirmed;
