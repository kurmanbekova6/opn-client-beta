import React, { Component } from "react";

export default class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }

  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      input: event.target.value,
    });
  };

  sendMessage = () => {
    this.props.addMessage(this.state.input);
    this.setState({
      input: "",
    });
  };
  render() {
    return (
      <div className="chatroom-form">
        <textarea
          className="chatroom-form__input"
          placeholder="Message"
          value={this.state.input}
          rows={5}
          onChange={this.handleInputChange}
        />
        <button
          type="submit"
          className="chatroom-form__btn"
          onClick={this.sendMessage}
        >
          Send
        </button>
      </div>
    );
  }
}
