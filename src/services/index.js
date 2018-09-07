import axios from 'axios';

export function getUserName(username) {
    return axios.post('https://final-capsule-project-app.herokuapp.com/users',{ username }).then(result => new Promise((resolve, reject) => {
        resolve(username);
    })).catch(error => {return username})
}