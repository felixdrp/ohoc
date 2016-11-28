import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import capitalize from '../stringTools'

import fetchData from '../../network/fetch-data';

export default class RecordView extends Component {

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

    if ( !this.state || !this.state.recordData ){
      return <div></div>
    }

    let recordData  = this.state.recordData.recordById[0];


    return (
      <Card style={{padding:50, paddingTop: 30}}>


        <span style ={{height:300}}>
          <span > <img style={{height:300,width:450,border:"1px solid black"}} src="http://localhost:3001/images/institution-default.jpg" />  </span>
          <span style={{height:300,width:600,position:"absolute",float:"left",left:700}}>

              <h1>{capitalize(recordData.data.recordName)}</h1>
              {capitalize(recordData.type)+"/"+capitalize(recordData.subtype)}

          </span>
        </span>



        <Card style={{padding:50, paddingTop: 10, marginTop: 20}}>
        {
          recordData.data.fields.map( (entry,i) => {

            return <div key={i}><h2>{capitalize(entry.name)}</h2>{entry.data}</div>

          })

        }
        </Card>

      </Card>
    );
  }
}
