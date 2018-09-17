import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const styles = {
  logoutButton: {
      marginTop: '35px'
  }
};

class LogoutComponent extends Component {
    constructor(props) {
      super(props);
      this.tirggerLogOut = this.tirggerLogOut.bind(this);
    }

    tirggerLogOut(event) {
        event.preventDefault();

        localStorage.removeItem('username');
        localStorage.removeItem('screen');
        window.location.reload();
    }

    render() {
        return (
            <div>
                <Button variant="outlined" style={styles.logoutButton} onClick={ this.tirggerLogOut }>
                  LOGOUT
                </Button>
            </div>
        )
    }
}

export default LogoutComponent;
