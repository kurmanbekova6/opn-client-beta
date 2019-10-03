import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { reset } from "redux-form";

import InviteForm from "./InviteForm";
import "./invite.scss";

class Invite extends React.Component {
  constructor(props) {
    super(props);
  }
  onFormSubmit = values => {
    // this.props.handleSubmit(values);
    // axios
    //   .post(`/logistic/accept/:id`, {
    //     clientId: this.props.clientId,
    //     access_token: this.props.token,
    //   })
    //   .then(res => {
    //     if (res.status === 200) {
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  render() {
    const { submitting, handleSubmit } = this.props;

    return (
      <div className="invite">
        <div className="invite-left">
          <h1 className="invite_title">
            Laser Eye Surgery Risks Flap Dislocation After Lasik
          </h1>
          <p className="invite_info">
            Western Astrology originated way back, around 500 BC, with a concept
            called the Zodiac being developed. This comprised of an imaginary
            sphere surrounding the earth, which followed the path of the Sun
            through the constellations during the year.
          </p>
        </div>

        <div className="invite-right">
          <InviteForm
            onFormSubmit={this.onFormSubmit}
            handleSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    isLoggedIn: state.loginStatus,
    loggedIn: state.loggedIn,
  };
};
export default connect(mapStateToProps)(
  reduxForm({
    form: "InviteForm",
  })(Invite)
);
