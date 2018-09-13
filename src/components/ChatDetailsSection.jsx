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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    messages: PropTypes.array
  };

  constructor(props) {
    super();

    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      mesgUpdate: true,
      usersWhoAreTyping: []
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    this.props.currentuser.sendMessage({
      text,
      roomId: 14943454
    });

    this.props.dispatch({
      type: 'GET_MESSAGES',
      roomId:  14943454,
      currentUser: this.props.currentuser
      });

    this.setState({
      mesgUpdate : true
    })

  }

  componentDidMount() {

    //console.log('UserName:', this.props.username);

    this.props.dispatch({
      type: 'GET_CURRENT_USER_NAME',
      currentUserName: this.props.username,
    });
  }

  render() {
    const currentuser_ = this.props.currentuser || {};
    const users = currentuser_ ? currentuser_.users : [];
    const messages = this.props.messages || [];

    if(users && users.length && this.state.mesgUpdate ) {
        this.props.dispatch({
            type: 'GET_MESSAGES',
            roomId:  14943454,
            currentUser: this.props.currentuser
        });

      this.setState({
        mesgUpdate : false
      })
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
          <ListUsersSection
            currentUser={currentuser_}
            users={users}
          />
          <Grid item xs={12} sm={8}>
            <section style={styles.chatMsgSection}>
              <ChatMessageSection messages={messages} />
            </section>
            <MessageFormSection onSubmit={this.sendMessage} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentuser: state.currentUserName,
  messages: state.messages
})

export default connect(mapStateToProps) (ChattingSection);
