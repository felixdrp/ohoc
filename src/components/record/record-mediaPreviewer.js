import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/border-color';
import ClearIcon from 'material-ui/svg-icons/content/clear';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


import capitalize from '../stringTools'

export default class RecordMediaPreviewer extends Component {
  constructor() {
    super()

  }




  render() {

    console.log(this.props.media)

    return (
      <Card style={{padding:3, width:220, height:190,float:"left",marginLeft:5,marginTop:5}}>
        {/* <IconButton style={{margin:0,padding:0,width:30,float:"right"}}>
           <EditIcon />
         </IconButton> */}
         <IconButton style={{float:"right"}} onClick={() => this.props.mediaDeleter(this.props.media.type,this.props.index)}>
            <ClearIcon />
          </IconButton>
          <span style={{maxWidth:"60%"}}>
            {
              this.props.media.title
            }
          </span>
            <br/>
        <span>
          {
            this.props.mediaPreviewer(this.props.media,{maxHeight:100,maxWidth:100})
          }
        </span>


      </Card>
    );
  }
}
