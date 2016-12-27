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


import capitalize from '../stringTools'

export default class RecordViewMediaElement extends Component {
  constructor() {
    super()
    this.state = {showExtendedDialog:false};
  }

  openExtendedView = () =>{

    //alert("JOODEERR")
    this.setState({showExtendedDialog: true})
  }

  render() {

    console.log(this.props.media)
    const actions = [
      <FlatButton
        label="Close [X]"
        primary={true}
        onTouchTap={() => this.setState({showExtendedDialog: false})}
      />,
      // <FlatButton
      //   label="Submit"
      //   primary={true}
      //   disabled={false}
      //   // onTouchTap={(e) => this.props.mediaAdder(this.state.dataToSend)}
      // />,
    ];

    return (

      <Card style={{padding:3, maxWidth:300, height:300,float:"left",marginLeft:5,marginTop:5}} onClick={this.openExtendedView}>

        <Dialog
              title={this.props.media.title || "dialog"}
              actions={actions}
              modal={true}
              open={this.state.showExtendedDialog}
            >
            <span>
              {
                this.props.mediaPreviewer(this.props.media,{maxHeight:250,maxWidth:"95%"})
              }
            </span>
            <br/><br/>
            <span>Transcript/Description</span>
            <div style={{width:"100%",minHeight:300,maxHeight:350,overflowY:"scroll",border: "1px dashed lightgrey",textAlign:"center"}}>
              {
                this.props.media.transcript.split("<br/>").map( (e,j) => {return <span key={j}><br/>{e}</span>}) || "transcript"
              }
            </div>

         </Dialog>

         {/* <IconButton style={{float:"right"}} onClick={() => this.props.mediaDeleter(this.props.media.type,this.props.index)}>
            <ClearIcon />
          </IconButton> */}
          <span style={{maxWidth:"100%"}}>
            {
              this.props.media.title
            }
          </span>
            <br/>
        <span>
          {
            this.props.mediaPreviewer(this.props.media,{maxHeight:250,maxWidth:"95%"})
          }
        </span>
      </Card>
    );
  }
}
