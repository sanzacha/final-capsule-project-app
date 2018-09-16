const { createStore } = require('redux');
const CapstoneProject = require('.');
const should = require('chai').should();

describe('Capstone Project testing', function() {

  it('should GET_USER_NAME', function() {

    const currState = {
        username: ''
    };

    const store = createStore(CapstoneProject, currState);

    const action = {
      type: 'GET_USER_NAME',
      username : 'ashin'
    };

    store.dispatch(action);

    store.getState().should.have.property('username');
    store.getState().should.have.property('username').and.equal('ashin');
  });

  it('should ne SET_USER_NAME', function() {

    const currState = {
        username: ''
    };

    const store = createStore(CapstoneProject, currState);

    const action = {
      type: 'SET_USER_NAME',
      username : 'ashin'
    };

    store.dispatch(action);

    store.getState().should.have.property('username');
    store.getState().should.have.property('username').and.equal('ashin');
  });
});
