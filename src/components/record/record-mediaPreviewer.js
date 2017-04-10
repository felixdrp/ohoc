import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/border-color';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import RW from 'material-ui/svg-icons/av/fast-rewind';
import FW from 'material-ui/svg-icons/av/fast-forward';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import PreviewGenerator from './preview-generator'

import capitalize from '../stringTools'

export default class RecordMediaPreviewer extends Component {
  constructor() {
    super()

  }

  render() {

    // console.log(this.props.media)

    return (
      <Card style={{padding:3, width:220, height:190,float:"left",marginLeft:5,marginTop:5}}>
         <IconButton style={{margin:0,padding:0,width:30,float:"right"}} onClick={() => this.props.mediaUpdater(this.props.media.type,this.props.index,this.props.media)}>
           <EditIcon />
         </IconButton>
         <IconButton style={{float:"right"}} onClick={() => this.props.mediaDeleter(this.props.media.type,this.props.index)}>
            <ClearIcon />
          </IconButton>

          <span style={{maxWidth:"60%"}}>
            {
              this.props.media.title
            }
          </span>
            <br/>
        <span style={{width:200}}>
          <PreviewGenerator element={this.props.media} style={{height:100,maxWidth:100}} />
        </span>

        <IconButton onClick={() => this.props.mediaShifter(this.props.media.type,this.props.index,false)}>
           <RW />
         </IconButton>

        <IconButton onClick={() => this.props.mediaShifter(this.props.media.type,this.props.index,true)}>
            <FW />
        </IconButton>




      </Card>
    );
  }
}
