import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import capitalize from '../stringTools'


export default class MultipleRowInput extends Component {
  static propTypes = {
    // vars
    template: React.PropTypes.array,
    data: React.PropTypes.array,
    // Actions
    updateData: React.PropTypes.func,
  };

  _input = {}

  addLine = () => {
    this.props.updateData( [...this.props.data, this.props.template] )
  }

  render() {
    const props = this.props
    let multiRows = []
    const input = this._input;

    if (props.data.length > 0) {
      multiRows = props.data.map( (row, i) => (
        <div key={i}>
          {
            row.map( (field, j) => {
              // debugger

              return (
                <span key={j} style={{marginRight:15}}>
                  <span style={{marginRight:15,fontWeight:"bold",fontSize: '0.8em'}}>{capitalize(field.name)+":"}</span>
                  <TextField
                    name={'field_' + i + field.name }
                    hintText={field.name}
                    multiLine={false}
                    rows={1}
                    // rowsMax={10}
                    style={{fontSize: '0.8em'}}
                    defaultValue={field.data || ''}
                    onChange={ (event, index, value) => this.updateData() }
                  />
                </span>
              )
            })
          }
        </div>
      ))
    }

    return (
      <div>
        {multiRows}

        <RaisedButton
          label="Add line"
          primary={true}
          style={{}}
          onClick={() => this.addLine()}
        />
      </div>
    )
  }
}
