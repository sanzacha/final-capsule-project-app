import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = {
  roomListWrapper: {
      height: "385px",
      overflowY: "auto",
  },
  roomListStyle: {
      fontFamily: 'verdana',
      fontSize: '18px',
      marginTop: '35px'
  },
  roomListItemStyle: {
    fontFamily: 'verdana',
    fontSize: '16px',
  },
  navStyle: {
    padding: '0',
  },
  ListItemStyle: {
      paddingLeft: '0',
  }
};

class RoomList extends Component {
    render() {
        return (
            <div>
                <h1 style={styles.roomListStyle}>User Room List</h1>
                <div style={styles.roomListWrapper}>
                    {this.props.rooms.map((rooms, index) => (
                      <List key={index} component="nav" style={styles.navStyle}>
                          <ListItem style={styles.ListItemStyle}>
                              <ListItemText primary={rooms.name} />
                          </ListItem>
                      <Divider />
                      </List>
                    ))}
                </div>
            </div>
        )
    }
}

export default RoomList;
