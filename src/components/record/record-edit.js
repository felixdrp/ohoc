import React, { Component } from 'react';
import { connect } from 'react-redux'

import fetchData from '../../network/fetch-data';

import RaisedButton from 'material-ui/RaisedButton';

class RecordEdit extends Component {
  async componentDidMount() {
    let fetch = new fetchData();
    // Load the templateList
    let recordData

    try {
      recordData = await fetch.getRecordData(this.props.params.recordId)
      this.setState({recordData})
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }

  render() {
    const style = {
      margin: 12,
    };

    return (
      <div>
        <h1>
          Register View!!!
        </h1>
        <RaisedButton label="Primary" primary={true} style={style} />
        <RaisedButton label="Secondary" secondary={true} style={style} />
        <span>
          Adding packages...
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  templateList: state.templateList || null,
  // if route contains params
  params: ownProps.params,
  location: ownProps.location
})

const mapDispatchToProps = (dispatch) => ({
  editNewRecord(newRecordId) {
    dispatch(push('/controlRoom/record/edit/' + newRecordId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordEdit);
