import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off'

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

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps.data) != JSON.stringify(this.props.data)
  }

  addLine = () => {
    this.props.updateData( [...this.props.data, this.props.template] )
  }

  removeLine(row) {
    let spliced = [ ...this.props.data ]
    spliced.splice(row, 1)

    this.props.updateData( spliced )
  }

  updateData() {
    // Yield all the input data and send to parent component
    let newData = this.props.data.map( (row, i) => {
      // debugger
      return row.map( (field, j) => ({ ...field, data: this._input['_' + i + j].input.value }) )
    })
    this.props.updateData( newData )
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
              let value = field.data || ''
              return (
                <span key={j} style={{marginRight:15}}>
                  <span style={{marginRight:15,fontWeight:"bold",fontSize: '0.8em'}}>{capitalize(field.name)+":"}</span>
                  <TextField
                    ref={(ref) => { input['_'  + i + j] = ref; }}
                    name={'field_' + i + field.name }
                    hintText={field.name}
                    multiLine={false}
                    rows={1}
                    style={{fontSize: '0.8em'}}
                    value={value}
                    onChange={ (event, index, value) => this.updateData() }
                  />
                </span>
              )
            })
          }
          <span>
            <IconButton
              tooltip="Remove row"
              iconStyle={{color: 'red'}}
              onClick={ () => { this.removeLine(i) } }
            >
              <HighlightOff />
            </IconButton>
          </span>
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
