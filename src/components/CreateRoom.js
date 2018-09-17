import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = {
  createRoomButton: {
      marginTop: '15px'
  }
};

class CreateRoom extends Component {
    constructor(props) {
      super(props);

      this.tirggerCreateRoom = this.handleCreateRoom.bind(this);

      // console.log('constructor', this.props);
    }

    state = {
      open: false,
    };

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleCreateRoom = () => {
      const roomName = document.getElementById('roomname').value;

      this.setState({ open: false });
      this.props.currentUser.dispatch({
            type: 'GET_CREATE_ROOM',
            currentUser: this.props.currentUser,
            roomName
      });
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen} style={styles.createRoomButton}>Create Room</Button>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please enter your room name.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="roomname"
                      label="Room name"
                      type="text"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCreateRoom} color="primary">
                      Submit
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CreateRoom;
