import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class FireStove extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          label="Fire Stove"
          onTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <MenuItem>Tables</MenuItem>
          <MenuItem>Methods</MenuItem>
          <MenuItem onTouchTap={this.handleToggle}>Close</MenuItem>
        </Drawer>
      </div>
    );
  }
}
