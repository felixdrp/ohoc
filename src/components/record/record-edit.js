import React, { Component } from 'react';
import { connect } from 'react-redux'

import fetchData from '../../network/fetch-data';
import TextField from 'material-ui/TextField';


import capitalize from '../stringTools'

import RaisedButton from 'material-ui/RaisedButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';



class RecordEdit extends Component {
  async componentDidMount() {
    let fetch = new fetchData();
    // Load the templateList
    let recordData

    try {

      recordData = await fetch.getRecordData(this.props.params.recordId)

      this.setState({recordData})
      this.setState({ submitted: false})
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }

  async updateRecord() {
    let fetch = new fetchData();
    // Data to upload


    let dataToSend = {
              featuredImage : null,
              recordName :  this.state.dataToSend.name,
              media : [],
              fields : [],
              };

     for ( var k in Object.keys(this.state.dataToSend) ){

       var key = Object.keys(this.state.dataToSend)[k]

       dataToSend.fields.push({name: key, data : this.state.dataToSend[key], type : "text"});

     }


    try {
      var recordData = await fetch.setRecordData(this.props.params.recordId, dataToSend)
      this.setState({ submitted: true})
    } catch(error) {
      console.error('fetching record update data > ' + error)
    }
  }

  handleChange(event, index, value, name) {
    var currentData = this.state.dataToSend;

    if ( !currentData ){
      currentData = {}
    }

    currentData[name] = value

    this.setState({dataToSend : currentData})

  };

  render() {
    const style = {
      margin: 12,
    };

    if( this.state && this.state.submitted){
      return <div> <h1> New Record Submitted! </h1> </div>
    }

    if ( !this.state || !this.state.recordData ){
      return <div></div>
    }

    let currentRecord = this.state.recordData.recordById[0];

    return (
      <Card style={{padding:30}}>

        <h1> Adding new  {currentRecord.type+" / "+currentRecord.subtype} </h1>

        {
          currentRecord.structure.info.map( (item, i) => {
                  return <div key={i}> <span style={{marginRight:15}}>{capitalize(item.name)+":"}</span>
                    <TextField hintText={item.name} onChange={ (event, index, value)=>this.handleChange(event, value, index,  item.name)} />
                  </div>
                } )
        }

        <RaisedButton
          label="Submit"
          primary={true}
          style={style}
          onClick={() => this.updateRecord()}
        />

      </Card>
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
