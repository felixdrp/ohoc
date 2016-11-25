import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import capitalize from '../stringTools'

export default class RecordView extends Component {
  render() {
    const style = {
      margin: 12,
    };

    let recordData =
              {
                id : 1,
                type : "academia",
                subtype : "institutions",
                data: {"featuredImage": null, "recordName": "city university", "media": {"text": [], "audio": [], "video": [], "picture": []}, "fields": [{"data": "City University", "name": "name", "type": "text"}, {"data": "City University", "name": "title", "type": "text"},
                      {"data": "Some info about City University, Lorem ipsum dolor sit amet, ius at sensibus molestiae omittantur, eos vidisse nominati ut. Quot voluptatibus duo ei, sea in detracto pericula. Mel te oblique consulatu elaboraret, mea nibh placerat conceptam an. Iriure offendit aliquando et has, nemore corpora quo ea, ei mel alienum urbanitas. His ut nibh consequat. Ut eum labore impetus, per no accumsan urbanitas deterruisset, sed voluptatum deterruisset comprehensam ei.", "name": "work", "type": "text"}
                    ]},
              }
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
