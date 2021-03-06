import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChatMessageSection from "./ChatMessageSection";
import ListUsersSection from "./ListUsersSection";
import MessageFormSection from "./MessageFormSection";
import LogoutComponent from "./LogoutComponent";
import CreateRoom from "./CreateRoom";
import RoomList from "./RoomList";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const styles = {
  chatMsgSection: {
    height: "515px",
    overflowY: "auto",
    padding: "12px"
  }
};

class ChattingSection extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentuser: PropTypes.object,
    currentRoom: PropTypes.object,
    messages: PropTypes.array,
    rooms: PropTypes.array,
  };

  constructor(props) {
    super();

    this.state = {
      currentUser: {},
      messages: [],
      rooms: [],
      mesgUpdate: true,
      newRoom: true,
      roomId: 14943454
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({
      type: "GET_CURRENT_USER_NAME",
      currentUserName: this.props.username
    });
  }

  sendMessage(text) {
    this.props.currentuser.sendMessage({
      text,
      roomId: this.props.roomId ? this.props.roomId : 14943454
    });

    this.props.dispatch({
      type: "GET_MESSAGES",
      roomId: this.props.roomId ? this.props.roomId : 14943454,
      currentUser: this.props.currentuser
    });

    this.setState({
      mesgUpdate: true
    });
  }

  render() {
    const currentuser = this.props.currentuser || {};
    const users = currentuser ? currentuser.users : [];
    const messages = this.props.messages || [];
    const rooms = this.props.rooms || [];

    if (users && users.length && this.state.mesgUpdate) {
      this.props.dispatch({
        type: "GET_MESSAGES",
        roomId: 14943454,
        currentUser: this.props.currentuser
      });

      this.setState({
        mesgUpdate: false
      });
    }

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
          <Grid item xs={12} sm={2}>
            <ListUsersSection currentUser={currentuser} users={users} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <section style={styles.chatMsgSection}>
              <ChatMessageSection messages={messages} />
            </section>
            <MessageFormSection onSubmit={this.sendMessage} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <LogoutComponent />
            <CreateRoom currentUser={this.props} />
            <RoomList
              rooms={rooms} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentuser: state.currentUserName,
  messages: state.messages,
  rooms: state.rooms,
});

export default connect(mapStateToProps)(ChattingSection);
