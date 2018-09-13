import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginUserSection from './components/LoginUserSection';
import ChatDetailsSection from './components/ChatDetailsSection';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    screen: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
  }

  getUser(username) {
    this.props.dispatch({
      type: 'GET_USER_NAME',
      username,
    });
  }

  render() {
    const screen = this.props.screen || '';
    const username = this.props.username || '';

    if (screen === '') {
      return <LoginUserSection onSubmit={this.getUser} />;
    }
    if (screen === 'ChattingSection') {
      return <ChatDetailsSection username={username} />;
    }
  }
}

const mapStateToProps = (state) => ({
  screen: state.screen,
  username: state.username,
});

export default connect(mapStateToProps) (App)
