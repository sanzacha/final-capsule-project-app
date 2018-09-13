import React, { Component } from "react";
import Chatkit from "@pusher/chatkit";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChatMessageSection from "./ChatMessageSection";
import ListUsersSection from "./ListUsersSection";
import MessageFormSection from "./MessageFormSection";

const styles = {
  chatMsgSection: {
    height: "515px",
    overflowY: "auto",
    padding: "12px"
  }
};

class ChattingSection extends Component {
  constructor(props) {
    super();

    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: []
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:3e937575-3d1a-4604-bc09-190f79f02b60",
      userId: this.props.username,
      tokenProvider: new Chatkit.TokenProvider({
        url: '/authenticate'
      })
    });

    // url: "http://localhost:3001/authenticate"

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: 14943454,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => console.error("error", error));
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Chat App
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24}>
          <ListUsersSection
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
          />
          <Grid item xs={12} sm={8}>
            <section style={styles.chatMsgSection}>
              <ChatMessageSection messages={this.state.messages} />
            </section>
            <MessageFormSection onSubmit={this.sendMessage} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ChattingSection;
