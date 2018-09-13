function ChatAppStore(currState, action) {
  switch (action.type) {
    case 'GET_USER_NAME':
      return Object.assign({}, {
        username: action.username,
      });

    case 'SET_USER_NAME':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: action.username,
      });

    case 'SET_CURRENT_USER_NAME':
      return Object.assign({}, {
        screen: currState.screen,
        username: currState.username,
        currentUserName: action.currentUserName,
      });

    case 'SET_MESSAGES':
      return Object.assign({}, {
        screen: currState.screen,
        username: currState.username,
        currentUserName: currState.currentUserName,
        messages: action.messages,
      });

    default:
      return currState;
  }
}

module.exports = ChatAppStore;
