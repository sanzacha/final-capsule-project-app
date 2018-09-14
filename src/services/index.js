import axios from 'axios';
import Chatkit from '@pusher/chatkit';

export function getUserName(username) {
  return axios
    .post('/users', { username })
    .then(
      new Promise((resolve) => {
        resolve(username);
      }),
    )
    .catch(() => {
      return username;
    });
}

// .post('http://localhost:3001/users', { username })  -- Local

export function getCurrentUserNameService(username) {
  return new Chatkit.ChatManager({
    instanceLocator: 'v1:us1:3e937575-3d1a-4604-bc09-190f79f02b60',
    userId: username,
    tokenProvider: new Chatkit.TokenProvider({
      url: '/authenticate',
    }),
  })
    .connect()
    .then(
      currentUser => new Promise((resolve) => {
          if (currentUser.users.length > 0){
            resolve(currentUser)
          } else {
              currentUser.joinRoom({ roomId: 14943454 })
              .then(room => {
                  console.log(`Joined room with ID: ${room.id}`)
                  currentUser.messages = [{
                      text: room.name,
                      senderId: ''
                  }]
                  resolve(currentUser)
              })
              .catch(err => {
                  console.log(`Printing error here ${err}`)
              })
          }
      }),
    );
}

// url: 'http://localhost:3001/authenticate',   -- Local

export function getMessagesService(arg) {
  return arg.currentUser
    .fetchMessages({
      roomId: arg.roomId,
      direction: 'older',
      limit: 100,
    })
    .then(messages => new Promise((resolve) => {
      resolve(messages);
    }));
}
