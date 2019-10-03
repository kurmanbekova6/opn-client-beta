import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";

/* Custom ui */
import ColumnHeader from "../../ui_components/Titles/ColumnHeader";
import ProfileLogo from "../../ui_components/utils/ProfileLogo";
import ProfileMenu from "../../ui_components/utils/ProfileMenu";
import logo from "../../../assets/img/icons/ms-icon-144x144.png";
import UploadLogo from "./utils/uploadLogo";
import SuperUserExtras from "./SuperUserExtras";

class MenuProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      clientId: "",
      access_token: "",
      companyId: "",
      imgUrl: "",
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
    const { imgUrl } = this.state;
    const { links } = this.props;
    return (
      <div>
        <ColumnHeader value={this.props.header} />
        <Row className="pm-col-content">
          <Col xs="12" md="4">
            {this.props.editing ? (
              <UploadLogo imgUrl={imgUrl !== "" ? imgUrl : logo} />
            ) : (
              <ProfileLogo
                src={imgUrl !== "" ? imgUrl : logo}
                linkUrl=""
                linkText=""
                alt="Company Logo"
                customClass="bordered-logo"
              />
            )}
          </Col>
          <Col xs="12" md="8">
            {links.map((it, i) => (
              <ProfileMenu
                id={it.id}
                href={it.href}
                text={it.text}
                key={i}
                active={it.active}
              />
            ))}
            {this.props.access_token.data ? (
              this.props.access_token.data.result.is_superuser ? (
                <SuperUserExtras />
              ) : null
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.loggedIn,
    loginStatus: state.loginStatus,
    links: state.pmenu,
  };
};

export default connect(
  mapStateToProps,
  null
)(MenuProfile);
