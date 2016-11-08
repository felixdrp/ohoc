import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'

export default class BrowseRegisters extends Component {
  render() {
    const style = {
      margin: 12,
    };

    return (
      <div>

        <h1>
          <Link to={`/`} style={{ textDecoration: 'none' }}>
            Kent Project
          </Link>
        </h1>

        <Link to={`/record/hola/mlk`} style={{ textDecoration: 'none' }}>
          <RaisedButton label="Add Record" primary={true} style={style} />
        </Link>
        {/* <Link to={`/`} style={{ textDecoration: 'none' }}>
          <RaisedButton label="Secondary" secondary={true} style={style} />
        </Link> */}
        <div>
          Adding packages...
        </div>
      </div>
    );
  }
}
