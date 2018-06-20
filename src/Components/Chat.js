import React, { Component } from "react";
import io from "socket.io-client";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      message: "",
      messages: []
    };
    this.socket = io("localhost:3002");

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      this.socket.emit("SEND_MESSAGE", {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({ message: "" });
    };
  }

  changeUsername(payload) {
    this.setState({
      username: payload
    });
  }
  changeMessage(payload) {
    this.setState({
      message: payload
    });
  }
  render() {
    let messages = this.state.messages.map((x, i) => {
      return (
        <div key={i}>
          <div>{x.author}</div>
          <div>{x.message}</div>
        </div>
      );
    });
    return (
      <div>
        <div className="topDiv">
          <div>Global Chat</div>
          <hr />
          <div className="messages">{messages}</div>
        </div>
        <div className="bottomDiv">
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={e => this.changeUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Message"
            value={this.state.message}
            onChange={e => this.changeMessage(e.target.value)}
          />
          <button
            onClick={() =>
              this.sendMessage({
                username: this.state.username,
                message: this.state.message
              })
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Chat;
