import axios from 'axios';
import Chatkit from '@pusher/chatkit';

export function getUserName(username) {
  return axios
    .post('/users', { username })
    .then(
      result =>
        new Promise((resolve, reject) => {
          resolve(username);
        })
    )
    .catch(error => {
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
      currentUser =>
        new Promise(resolve => {
          if (currentUser.users.length > 0) {
            resolve(currentUser);
          } else {
            currentUser
              .joinRoom({ roomId: 14943454 })
              .then(room => {
                currentUser.messages = [
                  {
                    text: room.name,
                    senderId: ""
                  }
                ];
                resolve(currentUser);
              })
              .catch(err => {
                console.log(`Error joining room ${err}`);
              });
          }
        })
    )
    .catch(error => console.error('error', error));
}

// url: 'http://localhost:3001/authenticate',   -- Local

export function getMessagesService(arg) {
  return arg.currentUser
    .fetchMessages({
      roomId: arg.roomId,
      direction: 'older',
      limit: 100,
    })
    .then(
      messages =>
        new Promise(resolve => {
          resolve(messages)
        })
    );
}

export function getCreateRoomService(action) {
    return action.currentUser.currentuser.createRoom({
        name: action.roomName,
        private: false
    })
    .then(room => new Promise((resolve, reject) => {
        resolve(room)
        window.location.reload();
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    }))
}
