import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/border-color';
import ClearIcon from 'material-ui/svg-icons/content/clear';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// import getPreviewer from './previewGenerator'
import PreviewGenerator from './preview-generator'

import capitalize from '../stringTools'

export default class RecordViewMediaElement extends Component {
  constructor() {
    super()
    this.state = {showExtendedDialog:false};
  }

  openExtendedView = () =>{
    let allowedToShowDialog = ["video","picture"]

    if (allowedToShowDialog.includes(this.props.type) ){
      this.setState({showExtendedDialog: true})
    }
  }

  render() {

    console.log(this.props.media)
    const actions = [
      <FlatButton
        label="Close [X]"
        primary={true}
        onTouchTap={() => this.setState({showExtendedDialog: false})}
      />,
    ];


    return (

      <Card style={{padding:3, maxWidth:400, height:300,marginLeft:5,marginTop:5,display: "inline-block"}} onClick={this.openExtendedView}>


        <Dialog
              title={this.props.media.title || ""}
              actions={actions}
              modal={true}
              open={this.state.showExtendedDialog}
              style={{textAlign:"center"}}
            >
            <span>
              <PreviewGenerator element={this.props.media} style={{maxHeight:450,maxWidth:"95%"}} />
            </span>
            <br/><br/>
            <span>Description</span>
            <div style={{width:"100%",minHeight:200,maxHeight:250,overflowY:"scroll",border: "1px dashed lightgrey",textAlign:"center"}}>
              {
                this.props.media.transcript?
                  this.props.media.transcript.split("<br/>").map( (e,j) => <span key={j}> <br/> {e} </span> ):
                  ""
              }
            </div>

         </Dialog>

         {/* <IconButton style={{float:"right"}} onClick={() => this.props.mediaDeleter(this.props.media.type,this.props.index)}>
            <ClearIcon />
          </IconButton> */}
        <span style={{maxWidth:"100%",fontWeight:"bold"}}>
          {
            this.props.media.title
          }
        </span>
        <br/>
        <span>
          <PreviewGenerator element={this.props.media} style={{maxHeight:250,maxWidth:"95%"}} />
        </span>
        <br/>
        { (this.props.media.transcript && this.props.media.transcript.length > 0 && (this.props.type === "audio" || this.props.type === "video"))  ? <span style={{fontWeight:"bold"}}>Transcript</span> : ""}

        { (this.props.media.transcript && this.props.media.transcript.length > 0 && (this.props.type === "audio" || this.props.type === "video")) ?
              <div style = {{width:"100%", height:200, overflowY:"scroll",border: "1px dashed lightgrey",textAlign:"center"}}>
                {
                  this.props.media.transcript ? this.props.media.transcript.split("<br/>").map( (e,j) => <span key={j}> <br/> {e} </span> ): ""
                }
              </div> : <div></div>

        }
      </Card>
    );
  }
}
