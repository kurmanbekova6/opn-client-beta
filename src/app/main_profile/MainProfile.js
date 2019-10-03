import React from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectItemNews } from "../../redux/actions/newsActions";
/* Custom ui */
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import MenuProfile from "../common/profileMenu/MenuProfile";
import Chat from "../chat/Chat";
import ChatRoom from "../chat/ChatRoom/ChatRoom";
import ColumnChatHeader from "../chat/ColumnChatHeader";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";
/* Components */
import NewsAside from "../news/components/aside/NewsAside";

class MainProfile extends React.Component {
  state = {
    chatActiveTab: true,
    isChatRoom: false,
    chatId: "",
    companyId: "",
    activeTab: 1,
  };

  changeChatTab = tab => {
    this.setState({
      isChatRoom: false,
      activeTab: tab,
    });
  };

  toggleChat = id => {
    this.setState({
      isChatRoom: true,
      chatId: id,
    });
  };

  render() {
    const { isChatRoom, activeTab } = this.state;
    return (
      <Container className="company-profile">
        {!this.props.loginStatus ? (
          <Redirect to="/login" />
        ) : (
          <React.Fragment />
        )}
        <RenderBreadcrumbs value="Profile" />
        <Row>
          <Col className="profileChart" md="4">
            <MenuProfile header="Profile" />
          </Col>
          <Col className="profileChart" md="4">
            <ColumnChatHeader
              value="Chats"
              changeChatTab={this.changeChatTab}
              activeTab={activeTab}
            />

            <Row className="pm-col-content">
              <Col md="12">
                {isChatRoom ? (
                  <ChatRoom chatId={this.state.chatId} />
                ) : (
                  <Chat
                    toggleChat={this.toggleChat}
                    clientId={this.props.clientId}
                    access_token={this.props.access_token}
                  />
                )}
              </Col>
            </Row>
          </Col>
          <Col className="profileChart" xs="12" md="4">
            <ColumnHeader value="NEWSLETTER" />
            <NewsAside selectItemNews={this.props.selectItemNews} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientId: state.clientId,
    loginStatus: state.loginStatus,
    access_token: state.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectItemNews: payload => {
      dispatch(selectItemNews(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainProfile);
